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
// 3. Deploy → New deployment → Web app
//      Execute as:       Me
//      Who has access:   Anyone
//    Click Deploy → copy the Web app URL.
//
// 4. Open Design/assets/hotel.js and set:
//      formEndpoint: 'PASTE_YOUR_WEB_APP_URL_HERE',
//
// 5. (Optional) visit the URL in a browser — you should see:
//    {"ok":true,"service":"Damir Hotel form endpoint"}
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // --- append row to sheet ---
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name     || '',
      data.email    || '',
      data.phone    || '',
      data.guests   || '',
      data.checkin  || '',
      data.checkout || '',
      data.room     || '',
      data.message  || '',
      data.source   || 'contact-form'
    ]);

    // --- email the hotel ---
    var to      = 'damirhotel@gmail.com';
    var subject = 'New inquiry — ' + (data.name || 'guest') +
                  (data.checkin  ? ', ' + data.checkin  : '') +
                  (data.checkout ? ' – ' + data.checkout : '');

    var body = [
      'New reservation inquiry via Damir Hotel website',
      '',
      'Name:       ' + (data.name     || '—'),
      'Email:      ' + (data.email    || '—'),
      'Phone:      ' + (data.phone    || '—'),
      'Guests:     ' + (data.guests   || '—'),
      'Check-in:   ' + (data.checkin  || '—'),
      'Check-out:  ' + (data.checkout || '—'),
      'Room:       ' + (data.room     || 'No preference'),
      '',
      'Message:',
      data.message || '—',
      '',
      '──────────────────────────────',
      'Reply to this email to respond directly to the guest.'
    ].join('\n');

    MailApp.sendEmail({
      to:      to,
      subject: subject,
      body:    body,
      replyTo: data.email || to
    });

    // --- confirmation email to the guest ---
    if (data.email) {
      var guestBody = [
        'Dear ' + (data.name || 'Guest') + ',',
        '',
        'Thank you for your inquiry. We have received your request and will',
        'get back to you within 24 hours to confirm availability.',
        '',
        'Here is a summary of your request:',
        '',
        'Check-in:   ' + (data.checkin  || '—'),
        'Check-out:  ' + (data.checkout || '—'),
        'Guests:     ' + (data.guests   || '—'),
        'Room:       ' + (data.room     || 'No preference'),
        '',
        data.message ? ('Your message:\n' + data.message + '\n') : '',
        'If you have any questions in the meantime, please reply to this',
        'email or call us directly.',
        '',
        'Warm regards,',
        'Damir Hotel'
      ].join('\n');

      MailApp.sendEmail({
        to:      data.email,
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
