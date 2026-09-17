function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Untrained Wishmaster Dashboard')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ID of the CSV file in Google Drive
var CSV_FILE_ID = '1FQX9rkxQJ1sr2-BimnNilvv8Wr1Xu4Jj';

function getDashboardData() {
  try {
    var file = DriveApp.getFileById(CSV_FILE_ID);
    var csvText = file.getBlob().getDataAsString('UTF-8');
    var rows = parseCSV(csvText);

    if (rows.length <= 1) return { headers: [], rows: [] };

    return { headers: rows[0], rows: rows.slice(1) };
  } catch (e) {
    throw new Error('getDashboardData failed: ' + e.message);
  }
}

// Handles quoted fields and commas inside quotes
function parseCSV(text) {
  var result = [];
  var lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  lines.forEach(function(line) {
    if (line.trim() === '') return;
    var row = [];
    var inQuote = false;
    var cell = '';

    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { cell += '"'; i++; }
        else { inQuote = !inQuote; }
      } else if (ch === ',' && !inQuote) {
        row.push(cell.trim());
        cell = '';
      } else {
        cell += ch;
      }
    }
    row.push(cell.trim());
    result.push(row);
  });

  return result;
}
