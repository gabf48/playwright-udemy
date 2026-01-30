const {test, expect} = require('@playwright/test');

const ExcelJs = require("exceljs");
const path = require('path');

async function writeExcelTest(searchText,replaceText, change,filePath) {
 

  const Workbook = new ExcelJs.Workbook();
  await Workbook.xlsx.readFile(
    filePath
  );
  const worksheet = Workbook.getWorksheet('Sheet1');
 const output = await readExcel(worksheet, searchText);

  const cell = worksheet.getCell(output.row, output.column+change.colChange);
  cell.value = "350";
  await Workbook.xlsx.writeFile(
    filePath
  );
}

async function readExcel(worksheet, searchText){
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
          if (cell.value === searchText) {
            output.row = rowNumber;
            output.column = colNumber;
          }
        });
      });
      return output;
}

// update Mango Price to 350.
// writeExcelTest("Mango",350,{rowChange:0, colChange:2}, "F:\\playwright-udemy\\tests\\excelDemo\\exceldownload.xlsx");


test('Upload download excel validation', async ({ page }) => {

  const textSearch = 'Mango';
  const updateValue = 350;
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  const downloadPromise = page.waitForEvent('download');
  await page.click('#downloadButton');
  const download = await downloadPromise;

  const filePath = path.resolve(
    process.env.USERPROFILE,
    'Downloads',
    'download.xlsx'
  );

  await download.saveAs(filePath);

  console.log('Saved to:', filePath);
    await page.getByRole('button',{name: 'Download'}).click();
    
    await writeExcelTest(textSearch, updateValue,{rowChange:0, colChange:2}, filePath);
    // await page.locator('input[type="file"]').click();
    await page.locator('input[type="file"]').setInputFiles(filePath);
    const textlocator = await page.getByText(textSearch);
    const desireRow = await page.getByRole('row').filter({
        has: page.locator(`text=${textSearch}`) // Correcting the locator format
    });
    await expect(desireRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());
    
})