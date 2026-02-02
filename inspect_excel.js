const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function read() {
    const workbook = new ExcelJS.Workbook();
    // Try to find the file by reading dir to handle encoding
    const files = fs.readdirSync(path.join(__dirname, 'data'));
    const targetFile = files.find(f => f.includes('xlsx'));

    if (!targetFile) {
        console.log('No xlsx file found');
        return;
    }

    console.log('Reading file:', targetFile);
    await workbook.xlsx.readFile(path.join(__dirname, 'data', targetFile));
    const sheet = workbook.getWorksheet(1);

    // Print first 2 rows (Header usually 1st)
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber <= 2) {
            console.log(`Row ${rowNumber}:`, JSON.stringify(row.values));
        }
    });

    console.log('RowCount:', sheet.rowCount);
}
read().catch(console.error);
