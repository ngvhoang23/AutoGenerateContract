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
      let invoice = {
        products: [],
      };
      const col = ["num_ordered", "name", "unit", "quantity", "price_per_unit", "total_price"];
      let col_index = 0;
      let product = {};
      let isEnd = false;
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        if (isEnd) {
          return;
        } else {
          if (isEndReading(worksheet, rowNumber)) {
            isEnd = true;
            return;
          }
          if (isEmptyRow(row)) {
            invoices.push(invoice);
            invoice = { products: [] };
          } else {
            row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
              if (isInvoiceCodeRow(worksheet, row, rowNumber)) {
                if (colNumber === 1) {
                  invoice.code = cell.value;
                }
                if (colNumber === 2) {
                  invoice.template = cell.value;
                }
                if (colNumber === 3) {
                  invoice.date = cell.value;
                }
                if (colNumber >= 4) {
                  return;
                }
              } else {
                console.log(`  Column ${colNumber}: ${cell.value}`);
                product[`${col[col_index]}`] = cell.value;
                col_index++;
                if (colNumber === 6) {
                  invoice.products.push(product);
                  console.log(product);
                  product = {};
                }
              }
            });
            col_index = 0;
          }
        }
      });
      invoices.push(invoice);

      return invoices;
    })
    .catch(function (error) {
      console.log("Error reading file:", error);
    });
};

const isEmptyRow = (row) => {
  let isEmpty = true;
  row.eachCell({ includeEmpty: true }, function (cell) {
    if (cell.value !== undefined && cell.value !== null && cell.value !== "") {
      isEmpty = false;
      return false;
    }
  });
  return isEmpty;
};

const isInvoiceCodeRow = (worksheet, row, rowNumber) => {
  let isInvoiceCode = false;
  row.eachCell({ includeEmpty: true }, function (cell) {
    if (worksheet.getCell(`A${rowNumber}`).value && !worksheet.getCell(`D${rowNumber}`).value) {
      isInvoiceCode = true;
    }
  });
  return isInvoiceCode;
};

const isEndReading = (worksheet, rowNumber) => {
  if (worksheet.getCell(`A${rowNumber}`).value === "end") {
    return true;
  } else {
    return false;
  }
};

module.exports = { handleReading };
