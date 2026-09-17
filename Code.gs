function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Untrained Wishmaster Dashboard')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Replace with your Google Sheet ID (from the sheet URL: /spreadsheets/d/<SHEET_ID>/edit)
var SPREADSHEET_ID = '1FQX9rkxQJ1sr2-BimnNilvv8Wr1Xu4Jj';

function getDashboardData() {
  try {
    var ss = SPREADSHEET_ID && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE'
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error('Spreadsheet not found. Set SPREADSHEET_ID in Code.gs.');
    const sheet = ss.getSheetByName('latest_untrained') || ss.getActiveSheet();
    if (!sheet) throw new Error("Sheet 'latest_untrained' not found.");

    const data = sheet.getDataRange().getDisplayValues();
    if (data.length <= 1) return { headers: [], rows: [] };

    return { headers: data[0], rows: data.slice(1) };
  } catch (e) {
    throw new Error('getDashboardData failed: ' + e.message);
  }
}
