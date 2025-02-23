// This code should be deployed as a Google Apps Script Web App
const SUBMISSIONS_SHEET_ID = 'YOUR_SUBMISSIONS_SHEET_ID';
const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Verify reCAPTCHA
    const recaptchaVerified = verifyRecaptcha(data.recaptchaResponse);
    if (!recaptchaVerified) {
      throw new Error('reCAPTCHA verification failed');
    }
    
    // Open the submissions spreadsheet
    const sheet = SpreadsheetApp.openById(SUBMISSIONS_SHEET_ID).getActiveSheet();
    
    // Add the new row
    sheet.appendRow([
      new Date(), // Timestamp
      data.submitterName,
      data.submitterEmail,
      data.date,
      data.time,
      data.title,
      data.description,
      data.artist,
      data.genre,
      data.venue,
      data.city,
      data.cost,
      data.ticketLink,
      data.posterLink,
      'Pending' // Status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Concert submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

function verifyRecaptcha(response) {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const options = {
    method: 'post',
    payload: {
      secret: RECAPTCHA_SECRET_KEY,
      response: response
    }
  };
  
  const result = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(result.getContentText());
  return json.success;
}

function doGet() {
  return ContentService.createTextOutput('The script is running');
}
