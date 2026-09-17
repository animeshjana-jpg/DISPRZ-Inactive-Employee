function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Untrained Wishmaster Dashboard')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getDashboardData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('latest_untrained') || ss.getActiveSheet();
    if (!sheet) throw new Error("Sheet 'latest_untrained' not found.");

    const data = sheet.getDataRange().getDisplayValues();
    if (data.length <= 1) return { headers: [], rows: [] };

    return { headers: data[0], rows: data.slice(1) };
  } catch (e) {
    throw new Error('getDashboardData failed: ' + e.message);
  }
}
