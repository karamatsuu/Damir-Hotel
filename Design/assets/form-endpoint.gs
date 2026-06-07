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
    var to      = Session.getActiveUser().getEmail(); // sends to the account running this script
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
