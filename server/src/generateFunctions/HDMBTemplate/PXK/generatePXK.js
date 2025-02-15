// polyfills required by exceljs
// require("core-js/modules/es.promise");
// require("core-js/modules/es.string.includes");
// require("core-js/modules/es.object.assign");
// require("core-js/modules/es.object.keys");
// require("core-js/modules/es.symbol");
// require("core-js/modules/es.symbol.async-iterator");
// require("regenerator-runtime/runtime");

const ExcelJS = require("exceljs/dist/es5");

let sell_com = {
  name: "CÔNG TY TNHH KINH DOANH TMDV TỔNG HỢP THÁI AN",
  lower_case_name: "Công ty TNHH kinh doanh TMDV tổng hợp Thái An",
  address: "2347/68/1 Phạm Thế Hiển, Phường 6, Quận 8, TP.Hồ Chí Minh",
  tax_code: "0317973745",
  account_num: undefined,
  bank_name: undefined,
  representative: "Phạm Văn Định",
  representative_role: "Giám đốc",
};

let buy_com = {
  name: "CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ KỸ THUẬT THUẬN HOÀNG LÂM",
  lower_case_name: "Công ty TNHH thương mại và dịch vụ kỹ thuật Thuận Hoàng Lâm",
  address:
    "Số C6-17, Khu đô thị Thăng Long Home, Xã Phước An, Huyện Nhơn Trạch, Tỉnh Đồng Nai, Việt Nam",
  tax_code: "3603239241",
  account_num: undefined,
  bank_name: undefined,
  representative: "Phạm Đăng Hoàng",
  representative_role: "Giám đốc",
};

let product_info = {
  products: [
    {
      name: "Cáp ngầm LS 24kv CXV/DSTA/PVC 1x95mm2",
      unit: "Mét",
      quantity: 119,
      price_per_unit: "420,000",
      total_price: "49,980,000",
    },

    {
      name: "Cáp ngầm LS 24kv CXV/DSTA/PVC 1x50mm2",
      unit: "Mét",
      quantity: 253,
      price_per_unit: "198,000",
      total_price: "50,094,000",
    },
  ],
  total_before_tax: "100,074,000",
  tax_total: "10,007,400",
  tax: "8%",
  total_after_tax: "110,081,400",
};

let contract_info = {
  code: "01/HĐMB/TA-THL",
  day: undefined,
  month: undefined,
  year: 2024,
  total_price_by_words: "Một trăm mười triệu không trăm tám mươi mốt nghìn bốn trăm đồng",
};

const invoice = {
  day: "12",
  month: "12",
  year: "2024",
  code: "00001245",
  sell_location: `Quận 1, Thành phố Hồ Chí Minh`,
  template: "1C23TLE",
};

const generatePXK = (sell_com, buy_com, contract_info, file_name, invoice) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("New Sheet");

  const A3 = worksheet.getCell("A3");
  const A5 = worksheet.getCell("A5");
  const A6 = worksheet.getCell("A6");
  const E3 = worksheet.getCell("E3");
  const E4 = worksheet.getCell("E4");
  const B8 = worksheet.getCell("B8");
  const C9 = worksheet.getCell("C9");
  const A7 = worksheet.getCell("A7");
  const A11 = worksheet.getCell("A11");
  const A12 = worksheet.getCell("A12");
  const A13 = worksheet.getCell("A13");
  const A14 = worksheet.getCell("A14");
  const A15 = worksheet.getCell("A15");
  const A17 = worksheet.getCell("A17");
  const B17 = worksheet.getCell("B17");
  const C17 = worksheet.getCell("C17");
  const D17 = worksheet.getCell("D17");
  const E17 = worksheet.getCell("E17");
  const E18 = worksheet.getCell("E18");
  const F18 = worksheet.getCell("F18");
  const G17 = worksheet.getCell("G17");
  const H17 = worksheet.getCell("H17");
  const H8 = worksheet.getCell("H8");
  const H9 = worksheet.getCell("H9");

  const A19 = worksheet.getCell("A19");
  const B19 = worksheet.getCell("B19");
  const C19 = worksheet.getCell("C19");
  const D19 = worksheet.getCell("D19");
  const E19 = worksheet.getCell("E19");
  const F19 = worksheet.getCell("F19");
  const G19 = worksheet.getCell("G19");
  const H19 = worksheet.getCell("H19");

  const A = worksheet.getColumn("A");
  const B = worksheet.getColumn("B");
  const C = worksheet.getColumn("C");
  const D = worksheet.getColumn("D");
  const E = worksheet.getColumn("E");
  const F = worksheet.getColumn("F");
  const G = worksheet.getColumn("G");
  const H = worksheet.getColumn("H");

  worksheet.mergeCells("A3:C4");
  A3.value = `Đơn Vị: ${sell_com?.name}`;
  A3.font = { size: 11, bold: true };
  A3.alignment = { vertical: "middle", wrapText: true };

  worksheet.mergeCells("A5:B5");
  A5.value = `MST: ${sell_com?.tax_code}`;
  A5.font = { bold: true };

  worksheet.mergeCells("A6:B6");
  A6.value = "Bộ phận: Kế toán";
  A6.font = { bold: true };

  worksheet.mergeCells("E3:H3");
  E3.value = "Mẫu số: 01GTKT3/005";
  E3.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  E3.font = { bold: true };

  worksheet.mergeCells("E4:H5");
  E4.value = "( Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ Tài chính)";
  E4.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  E4.font = { size: 10 };

  worksheet.mergeCells("A7:H7");
  A7.value = "PHIẾU XUẤT KHO";
  A7.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  A7.font = { size: 18, bold: true };

  worksheet.mergeCells("B8:G8");
  B8.value = `Ngày ${invoice?.day || "………"} tháng ${invoice?.month || "………"} năm  ${
    invoice?.year || "………"
  }`;
  B8.alignment = { horizontal: "center", vertical: "middle", wrapText: true };

  worksheet.mergeCells("C9:D9");
  C9.value = `Số: ${invoice?.code}`;
  C9.alignment = { horizontal: "center", vertical: "middle", wrapText: true };

  H8.value = "Nợ:……………";
  H8.font = { size: 10 };
  H9.value = "Có:……………";
  H9.font = { size: 10 };

  worksheet.mergeCells("A11:H11");
  A11.value = `Họ và tên người nhận hàng: ${buy_com?.name}`;
  A11.alignment = { vertical: "middle", wrapText: true };
  A11.font = { size: 11 };

  worksheet.mergeCells("A12:H12");
  A12.value = `Địa chỉ( bộ phận): ${buy_com?.address}`;
  A12.alignment = { vertical: "middle", wrapText: true };
  A12.font = { size: 11 };

  worksheet.mergeCells("A13:H13");
  A13.value = "Lý do xuất kho: Xuất Bán";
  A13.alignment = { vertical: "middle", wrapText: true };
  A13.font = { size: 11 };

  worksheet.mergeCells("A14:H14");
  A14.value = `Xuất tại kho(ngăn lô) :  ${sell_com?.name}`;
  A14.alignment = { vertical: "middle", wrapText: true };
  A14.font = { size: 11 };

  worksheet.mergeCells("A15:H15");
  A15.value = `Địa điểm: ${sell_com?.sell_location}`;
  A15.alignment = { vertical: "middle", wrapText: true };
  A15.font = { size: 11 };

  worksheet.mergeCells("A17:A18");
  A17.value = "STT";
  A17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  A17.font = { size: 11, bold: true };
  A17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("B17:B18");
  B17.value = "Tên nhãn hiệu, quy cách,\n phẩm chất vật tư, dụng cụ";
  B17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  B17.font = { size: 11, bold: true };
  B17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("C17:C18");
  C17.value = "Mã số";
  C17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  C17.font = { size: 11, bold: true };
  C17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("D17:D18");
  D17.value = "ĐVT";
  D17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  D17.font = { size: 11, bold: true };
  D17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("E17:F17");
  E17.value = "Số lượng";
  E17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  E17.font = { size: 11, bold: true };
  E17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  E18.value = "Yêu cầu";
  E18.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  E18.font = { size: 11, bold: true };
  E18.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  F18.value = "Thực xuất";
  F18.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  F18.font = { size: 11, bold: true };
  F18.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("G17:G18");
  G17.value = "Đơn giá";
  G17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  G17.font = { size: 11, bold: true };
  G17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.mergeCells("H17:H18");
  H17.value = "Thành tiền";
  H17.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  H17.font = { size: 11, bold: true };
  H17.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  // row 2

  A19.value = "A";
  A19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  A19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  B19.value = "B";
  B19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  B19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  C19.value = "C";
  C19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  C19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  D19.value = "D";
  D19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  D19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  E19.value = 1;
  E19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  E19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  F19.value = 2;
  F19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  F19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  G19.value = 3;
  G19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  G19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  H19.value = 4;
  H19.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  H19.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  // render products

  const renderProducts = () => {
    const products = invoice?.products;

    let last_index = 20;

    products?.forEach((product, i) => {
      const A_index = worksheet.getCell(`A${20 + i}`);
      const B_index = worksheet.getCell(`B${20 + i}`);
      const C_index = worksheet.getCell(`C${20 + i}`);
      const D_index = worksheet.getCell(`D${20 + i}`);
      const E_index = worksheet.getCell(`E${20 + i}`);
      const F_index = worksheet.getCell(`F${20 + i}`);
      const G_index = worksheet.getCell(`G${20 + i}`);
      const H_index = worksheet.getCell(`H${20 + i}`);

      A_index.value = i + 1;
      A_index.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      A_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      B_index.value = `${product.name}`;
      B_index.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      B_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      D_index.value = `${product.unit}`;
      D_index.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      D_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      F_index.value = Number(product.quantity);
      F_index.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      F_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      F_index.numFmt = "#,##0";

      C_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      E_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      G_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      H_index.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      last_index++;
    });

    return last_index;
  };

  let last_index = renderProducts();

  worksheet.mergeCells(`B${last_index}:G${last_index}`);
  worksheet.getCell(`B${last_index}`).value = `Cộng tiền hàng: `;
  worksheet.getCell(`B${last_index}`).font = { bold: true };
  worksheet.getCell(`B${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`B${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`A${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`H${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  last_index++;

  worksheet.mergeCells(`B${last_index}:G${last_index}`);
  worksheet.getCell(`B${last_index}`).value = `Thuế ${contract_info?.tax} VAT:`;
  worksheet.getCell(`B${last_index}`).font = { bold: true };
  worksheet.getCell(`B${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`B${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`A${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`H${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  last_index++;

  worksheet.mergeCells(`B${last_index}:G${last_index}`);
  worksheet.getCell(`B${last_index}`).value = `Tổng thanh toán:`;
  worksheet.getCell(`B${last_index}`).font = { bold: true };
  worksheet.getCell(`B${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`B${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`A${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  worksheet.getCell(`H${last_index}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  last_index++;

  worksheet.mergeCells(`A${last_index}:H${last_index}`);
  worksheet.getCell(
    `A${last_index}`,
  ).value = `Tổng số tiền( bằng chữ):………………………………………………………………………………`;
  worksheet.getCell(`A${last_index}`).font = { bold: true };

  last_index++;

  worksheet.mergeCells(`A${last_index}:H${last_index}`);
  worksheet.getCell(
    `A${last_index}`,
  ).value = `Số chứng từ gốc kèm theo: HĐGTGT/${invoice?.template}/${invoice?.code} ngày ${invoice?.day} tháng ${invoice?.month} năm ${invoice?.year}`;
  worksheet.getCell(`A${last_index}`).font = { bold: true };

  last_index++;

  worksheet.mergeCells(`F${last_index}:H${last_index}`);
  worksheet.getCell(`F${last_index}`).value = `Ngày………tháng………năm ${invoice?.year}`;
  worksheet.getCell(`F${last_index}`).alignment = {
    horizontal: "right",
    vertical: "middle",
    wrapText: true,
  };
  last_index++;

  worksheet.getCell(`B${last_index}`).value = `Người nhận hàng                Thủ kho`;
  worksheet.getCell(`B${last_index}`).font = { bold: true };
  worksheet.getCell(`B${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };

  worksheet.mergeCells(`D${last_index}:F${last_index}`);
  worksheet.getCell(`D${last_index}`).value = `Kế toán trưởng`;
  worksheet.getCell(`D${last_index}`).font = { bold: true };
  worksheet.getCell(`D${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };

  worksheet.mergeCells(`G${last_index}:H${last_index}`);
  worksheet.getCell(`G${last_index}`).value = `Giám đốc`;
  worksheet.getCell(`G${last_index}`).font = { bold: true };
  worksheet.getCell(`G${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };

  last_index++;

  worksheet.getCell(`B${last_index}`).value = `(ký,họ tên)                          (ký,họ tên)`;
  worksheet.getCell(`B${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`B${last_index}`).font = { size: 11 };

  worksheet.mergeCells(`D${last_index}:F${last_index}`);
  worksheet.getCell(`D${last_index}`).value = `(ký,họ tên)`;
  worksheet.getCell(`D${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`D${last_index}`).font = { size: 11 };

  worksheet.mergeCells(`G${last_index}:H${last_index}`);
  worksheet.getCell(`G${last_index}`).value = `(ký,họ tên)`;
  worksheet.getCell(`G${last_index}`).alignment = {
    horizontal: "center",
    vertical: "middle",
    wrapText: true,
  };
  worksheet.getCell(`G${last_index}`).font = { size: 11 };

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.font = { ...cell.font, name: "Times New Roman", size: cell.font?.size || 12 };
    });
  });

  A.width = 4.4;
  B.width = 39.3;
  C.width = 9.3 + 0.7;
  D.width = 6.6 + 0.7;
  E.width = 7.2 + 0.7;
  F.width = 11.2 + 0.7;
  G.width = 10.3 + 0.7;
  H.width = 11.9 + 0.7;
  worksheet.getRow(11).height = 34.5 + 0.7;

  return workbook.xlsx.writeFile(`${file_name}.xlsx`);
};

module.exports = { generatePXK };
