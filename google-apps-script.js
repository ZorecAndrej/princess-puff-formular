/**
 * Princess Puff Customer Data Collector
 * Google Apps Script for handling form submissions
 *
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Save the project (name it "Princess Puff Form Handler")
 * 5. Click Deploy > New deployment
 * 6. Select "Web app" as the type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click Deploy and copy the Web App URL
 * 10. Paste that URL into the form-handler.js file (GOOGLE_SCRIPT_URL variable)
 */

// Helper function to capitalize first letter of each word (handles apostrophes)
function capitalizeWords(str) {
  if (!str) return str;
  return str
    .trim()
    .split(' ')
    .map(word => {
      // Handle words with apostrophes (e.g., O'Brien)
      if (word.includes("'")) {
        return word
          .split("'")
          .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join("'");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// Helper function to check if email already exists in sheet
function checkIfEmailExists(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false; // No data yet (only header)

  const emailColumn = 4; // Email is in column 4 (D)
  const emailRange = sheet.getRange(2, emailColumn, lastRow - 1, 1);
  const emails = emailRange.getValues();

  for (let i = 0; i < emails.length; i++) {
    if (emails[i][0].toString().toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// Main function to handle POST requests from the form
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Check if email already exists - BLOCK if it does
    const emailExists = checkIfEmailExists(sheet, data.email);
    if (emailExists) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Bu e-posta adresi zaten kayıtlı. Lütfen gelen kutunuzu kontrol edin!'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Check if this is the first entry (create headers)
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Birthday',
        'How They Heard',
        'Favorite Taste',
        'Marketing Consent'
      ];
      sheet.appendRow(headers);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#C9A961');
      headerRange.setFontColor('#000000');

      // Freeze header row
      sheet.setFrozenRows(1);

      // Auto-resize columns
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }

    // Prepare the row data (capitalize names, lowercase email for consistency)
    const rowData = [
      new Date(data.timestamp),
      capitalizeWords(data.firstName),
      capitalizeWords(data.lastName),
      data.email.toLowerCase(),  // Normalize email to lowercase
      "'" + data.phone,  // Force TEXT format with apostrophe prefix
      data.birthday,
      data.referral,
      data.favoriteTaste,
      data.consent ? 'Yes' : 'No'
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Get the row number of the newly added data
    const lastRow = sheet.getLastRow();

    // Format Phone column as TEXT to prevent #ERROR! with long numbers
    const phoneCell = sheet.getRange(lastRow, 5);  // Column 5 = Phone
    phoneCell.setNumberFormat('@');  // '@' = Plain text format

    // Add alternating row colors for better readability
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, rowData.length).setBackground('#FFF8F0');
    }

    // Send welcome email to customer (always, since duplicate emails are blocked)
    if (data.consent && data.email) {
      sendWelcomeEmail(data);
    }

    // Send notification to owner
    sendOwnerNotification(data);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error
    console.error('Error:', error);

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to send welcome email to customer
function sendWelcomeEmail(data) {
  try {
    // Capitalize first name for proper formatting
    const firstName = capitalizeWords(data.firstName);

    const subject = '👑 Princess Puff Topluluğuna Hoş Geldiniz';
    const body = `
Sevgili ${firstName},

Princess Puff topluluğuna hoş geldiniz! 🍪

Türkiye'deki açılışımızdan sonra, tüm üyelerimiz özel indirimler, etkinlik davetleri ve özel hediyeler alacak.

Saygılarımızla,
Princess Puff Ekibi

---
Princess Puff
Belgrade, Serbia
    `;

    // Send the email
    MailApp.sendEmail(data.email, subject, body);

  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

// Function to send notification to owner
function sendOwnerNotification(data) {
  try {
    const ownerEmail = 'orders@princesspuff.com';

    // Capitalize names for proper formatting
    const firstName = capitalizeWords(data.firstName);
    const lastName = capitalizeWords(data.lastName);

    const subject = `🆕 New Customer: ${firstName} ${lastName}`;
    const body = `
New customer has joined Princess Puff!

Customer Details:
- Name: ${firstName} ${lastName}
- Email: ${data.email}
- Phone: ${data.phone}
- Birthday: ${data.birthday}
- Heard from: ${data.referral}
- Favorite Taste: ${data.favoriteTaste}
- Signed up: ${new Date(data.timestamp).toLocaleString()}

✅ Welcome email sent to customer.

Check your Google Sheet for full details.
    `;

    MailApp.sendEmail(ownerEmail, subject, body);

  } catch (error) {
    console.error('Error sending owner notification:', error);
  }
}

// Optional: Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(
    'Princess Puff Form Handler is running! ✅'
  ).setMimeType(ContentService.MimeType.TEXT);
}

// Optional: Function to create a summary dashboard
function createDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let dashboardSheet = ss.getSheetByName('Dashboard');

  // Create dashboard sheet if it doesn't exist
  if (!dashboardSheet) {
    dashboardSheet = ss.insertSheet('Dashboard', 0);
  }

  const dataSheet = ss.getSheets()[1]; // Assuming data is in the second sheet
  const lastRow = dataSheet.getLastRow();

  if (lastRow < 2) {
    dashboardSheet.getRange('A1').setValue('No data available yet.');
    return;
  }

  // Clear existing content
  dashboardSheet.clear();

  // Title
  dashboardSheet.getRange('A1').setValue('📊 Princess Puff Customer Dashboard');
  dashboardSheet.getRange('A1').setFontSize(16).setFontWeight('bold');

  // Total customers
  dashboardSheet.getRange('A3').setValue('Total Customers:');
  dashboardSheet.getRange('B3').setFormula(`=${dataSheet.getName()}!A:A`).setValue(lastRow - 1);

  // Count by referral source
  dashboardSheet.getRange('A5').setValue('Customers by Source:');
  dashboardSheet.getRange('A6').setValue('Source');
  dashboardSheet.getRange('B6').setValue('Count');

  // Style the dashboard
  dashboardSheet.autoResizeColumns(1, 2);
}
