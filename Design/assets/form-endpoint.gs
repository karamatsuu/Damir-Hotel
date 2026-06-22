// DAMIR HOTEL — Google Apps Script form endpoint
// ============================================================
// SETUP (one-time, ~5 minutes):
//
// 1. Open https://sheets.google.com, create a new spreadsheet.
//    Rename it "Guest Inquiries".
//    In row 1 add these headers (one per cell, A through J):
//      Timestamp | Name | Email | Phone | Guests |
//      Check-in  | Check-out | Room | Message | Source
//
// 2. In the spreadsheet: Extensions → Apps Script
//    Delete all default code and paste this entire file.
//
// 3. Project Settings → Script Properties → Add script properties:
//      SPREADSHEET_ID  → (the ID from your spreadsheet URL — the long string between /d/ and /edit)
//      HMAC_SECRET     → (same value as wrangler secret put GAS_HMAC_SECRET)
//
// 4. Deploy → New deployment → Web app
//      Execute as:       Me
//      Who has access:   Anyone
//    Click Deploy → copy the Web app URL.
//
// 5. Open Design/assets/hotel.js and set:
//      formEndpoint: 'PASTE_YOUR_WEB_APP_URL_HERE',
//
// 6. (Optional) visit the URL in a browser — you should see:
//    {"ok":true,"service":"Damir Hotel form endpoint"}
// ============================================================

var MAX_BODY_BYTES  = 8 * 1024;   // 8 KB — well above any real form submission
var MAX_FIELD_CHARS = 2000;        // per-field ceiling for message / free-text

// Verify the HMAC-SHA256 signature added by the Cloudflare Worker.
// Store the shared secret in Apps Script → Project Settings → Script Properties:
//   key: HMAC_SECRET   value: <same value as wrangler secret put GAS_HMAC_SECRET>
// If the property is absent the check is skipped (safe during initial setup).
function verifyHmac_(body, sigHex) {
  var secret = PropertiesService.getScriptProperties().getProperty('HMAC_SECRET');
  if (!secret) return true;
  var expected = Utilities.computeHmacSha256Signature(body, secret)
    .map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
  return sigHex === expected;
}

function doPost(e) {
  try {
    var raw = e.postData.contents || '';
    if (!verifyHmac_(raw, e.parameter.sig || '')) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'forbidden' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (raw.length > MAX_BODY_BYTES) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'payload too large' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(raw);

    // Honeypot: real browsers leave this field blank; bots often fill it.
    if (data.website) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'rejected' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Required-field validation.
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || typeof data.name !== 'string' || !String(data.name).trim()) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'name required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (!data.email || !emailRe.test(String(data.email).trim())) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'valid email required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Clamp every field so oversized strings cannot abuse email/sheet APIs.
    function cap(v) { return typeof v === 'string' ? v.slice(0, MAX_FIELD_CHARS) : ''; }

    // Prefix values that start with = + - @ so Sheets never interprets them as formulas.
    function sanitize(v) {
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    }

    // --- collect fields ---
    var name     = sanitize(cap(data.name));
    var email    = sanitize(cap(data.email).slice(0, 254));   // RFC 5321 max
    var phone    = sanitize(cap(data.phone).slice(0, 30));
    var guests   = sanitize(cap(data.guests).slice(0, 10));
    var checkin  = sanitize(cap(data.checkin).slice(0, 10));
    var checkout = sanitize(cap(data.checkout).slice(0, 10));
    var room     = sanitize(cap(data.room).slice(0, 100));
    var message  = sanitize(cap(data.message));
    var source   = sanitize(cap(data.source).slice(0, 50) || 'contact-form');

    // --- append row to sheet (optional — skipped if SPREADSHEET_ID is not set) ---
    var sheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (sheetId) {
      try {
        var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
        sheet.appendRow([
          new Date(),
          name, email, phone, guests,
          checkin, checkout, room, message, source
        ]);
      } catch (sheetErr) {
        // Log but don't fail — email delivery is more important than the sheet row
        Logger.log('Sheet append failed: ' + sheetErr.message);
      }
    }

    // --- email the hotel ---
    var to      = 'abatbaevkaramat777@gmail.com';
    var subject = 'New inquiry — ' + (name || 'guest') +
                  (checkin  ? ', ' + checkin  : '') +
                  (checkout ? ' – ' + checkout : '');

    var body = [
      'New reservation inquiry via Damir Hotel website',
      '',
      'Name:       ' + (name    || '—'),
      'Email:      ' + (email   || '—'),
      'Phone:      ' + (phone   || '—'),
      'Guests:     ' + (guests  || '—'),
      'Check-in:   ' + (checkin  || '—'),
      'Check-out:  ' + (checkout || '—'),
      'Room:       ' + (room    || 'No preference'),
      '',
      'Message:',
      message || '—',
      '',
      '──────────────────────────────',
      'Reply to this email to respond directly to the guest.'
    ].join('\n');

    MailApp.sendEmail({
      to:      to,
      subject: subject,
      body:    body,
      replyTo: email || to
    });

    // --- confirmation email to the guest ---
    if (email) {
      var guestBody = [
        'Dear ' + (name || 'Guest') + ',',
        '',
        'Thank you for your inquiry. We have received your request and will',
        'get back to you within 24 hours to confirm availability.',
        '',
        'Here is a summary of your request:',
        '',
        'Check-in:   ' + (checkin  || '—'),
        'Check-out:  ' + (checkout || '—'),
        'Guests:     ' + (guests   || '—'),
        'Room:       ' + (room     || 'No preference'),
        '',
        message ? ('Your message:\n' + message + '\n') : '',
        'If you have any questions in the meantime, please reply to this',
        'email or call us directly.',
        '',
        'Warm regards,',
        'Damir Hotel'
      ].join('\n');

      MailApp.sendEmail({
        to:      email,
        subject: 'We received your inquiry — Damir Hotel',
        body:    guestBody,
        replyTo: to
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — GET request confirms the endpoint is live
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Damir Hotel form endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}
