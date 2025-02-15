const ExcelJS = require("exceljs");

const path = require("path");
const filePath = path.resolve(__dirname, "reading_excel.xlsx");

// Create a new Excel workbook
const workbook = new ExcelJS.Workbook();

// Load the workbook from a file

const handleReading = async () => {
  return workbook.xlsx
    .readFile(filePath)
    .then(function () {
      const invoices = [];
      const worksheet = workbook.getWorksheet(1);
      // let invoice = {
      //   products: [],
      // };
      // const col = ["num_ordered", "name", "unit", "quantity", "price_per_unit", "total_price"];
      // let col_index = 0;
      // let product = {};
      // let isEnd = false;
      // worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      //   if (isEnd) {
      //     return;
      //   } else {
      //     if (isEndReading(worksheet, rowNumber)) {
      //       isEnd = true;
      //       return;
      //     }
      //     if (isEmptyRow(row)) {
      //       invoices.push(invoice);
      //       invoice = { products: [] };
      //     } else {
      //       row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
      //         if (isInvoiceCodeRow(worksheet, row, rowNumber)) {
      //           if (colNumber === 1) {
      //             invoice.code = cell.value;
      //           }
      //           if (colNumber === 2) {
      //             invoice.template = cell.value;
      //           }
      //           if (colNumber === 3) {
      //             invoice.date = cell.value;
      //           }
      //           if (colNumber >= 4) {
      //             return;
      //           }
      //         } else {
      //           console.log(`  Column ${colNumber}: ${cell.value}`);
      //           product[`${col[col_index]}`] = cell.value;
      //           col_index++;
      //           if (colNumber === 6) {
      //             invoice.products.push(product);
      //             console.log(product);
      //             product = {};
      //           }
      //         }
      //       });
      //       col_index = 0;
      //     }
      //   }
      // });
      // invoices.push(invoice);

      let isRunning = true;
      let rowNum = 1;
      let invoice = {
        products: [],
      };
      const col_product = [
        "",
        "num_ordered",
        "name",
        "unit",
        "quantity",
        "price_per_unit",
        "total_price",
      ];
      const cols = ["", "A", "B", "C", "D", "E", "F"];
      let product = {};
      while (isRunning) {
        if (isEndReading(worksheet, rowNum)) {
          invoices.push(invoice);
          isRunning = false;
          break;
        }
        if (isEmptyRow(worksheet, rowNum)) {
          invoices.push(invoice);
          invoice = {
            products: [],
          };
          rowNum++;
          continue;
        }
        if (isTaxTotalRow(worksheet, rowNum)) {
          invoice.tax_total = worksheet.getCell(`F${rowNum}`)?.value;
          rowNum++;
          continue;
        }
        if (isTotalPriceRow(worksheet, rowNum)) {
          invoice.total_after_tax = worksheet.getCell(`F${rowNum}`)?.value;
          rowNum++;
          continue;
        }
        if (isInvoiceCodeRow(worksheet, rowNum)) {
          invoice.code = worksheet.getCell(`B${rowNum}`)?.value;
          invoice.template = worksheet.getCell(`C${rowNum}`)?.value;
          invoice.date = worksheet.getCell(`D${rowNum}`)?.value;
          rowNum++;
          continue;
        }
        for (let i = 1; i <= 6; i++) {
          cell = worksheet.getCell(`${cols[i]}${rowNum}`);
          product[`${col_product[i]}`] = cell.value;
          if (i === 6) {
            invoice.products.push(product);
            product = {};
          }
        }
        rowNum++;
      }
      console.log(invoices);
      return invoices;
    })
    .catch(function (error) {
      console.log("Error reading file:", error);
    });
};

const isEmptyRow = (worksheet, rowNum) => {
  if (worksheet.getCell(`A${rowNum}`).value == "continue") {
    return true;
  }
  return false;
};

const isInvoiceCodeRow = (worksheet, rowNum) => {
  if (worksheet.getCell(`A${rowNum}`).value == "invoice_info") {
    return true;
  }
  return false;
};

const isEndReading = (worksheet, rowNum) => {
  if (worksheet.getCell(`A${rowNum}`).value === "end") {
    return true;
  }
  return false;
};

const isTaxTotalRow = (worksheet, rowNum) => {
  if (worksheet.getCell(`E${rowNum}`)?.value === "tax" && worksheet.getCell(`F${rowNum}`)?.value) {
    return true;
  }
  return false;
};

const isTotalPriceRow = (worksheet, rowNum) => {
  if (
    worksheet.getCell(`E${rowNum}`)?.value === "after_tax" &&
    worksheet.getCell(`F${rowNum}`)?.value
  ) {
    return true;
  }
  return false;
};

handleReading();

module.exports = { handleReading };
