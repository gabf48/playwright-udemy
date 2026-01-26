const ExcelJs = require("exceljs");

async function excelTest() {
  const Workbook = new ExcelJs.Workbook();
  await Workbook.xlsx.readFile(
    "F:\\playwright-udemy\\tests\\excelDemo\\exceldownload.xlsx"
  );
  const worksheet = Workbook.getWorksheet(1);
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      console.log(cell.value);
    });
  });
}

excelTest();
