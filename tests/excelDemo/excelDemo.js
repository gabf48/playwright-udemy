const ExcelJs = require("exceljs");

async function excelTest() {
    let output = {row:-1,column:-1};

  const Workbook = new ExcelJs.Workbook();
  await Workbook.xlsx.readFile(
    "F:\\playwright-udemy\\tests\\excelDemo\\exceldownload.xlsx"
  );
  const worksheet = Workbook.getWorksheet(1);
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === "Banana") {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  const cell = worksheet.getCell(output.row, output.column);
  cell.value = "Republic";
  await Workbook.xlsx.writeFile(
    "F:\\playwright-udemy\\tests\\excelDemo\\exceldownload.xlsx"
  );
}

excelTest();
