const fs = require("fs");
const {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
  convertInchesToTwip,
} = require("docx");
const { renderComAddress, renderComName } = require("../definedFunctions.js");
const { renderProductRows } = require("./definedFunctions.js");

// ================================================================================

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

// =================================================================================

const generateBBGN = async (sell_com, buy_com, file_name, invoice) => {
  const declareSection = new Table({
    width: {
      size: 95,
      type: WidthType.PERCENTAGE,
    },
    alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.TOP,
            width: {
              size: 42,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.1),
              left: 0,
              bottom: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.2),
            },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                  line: 280,
                },
                children: [new TextRun({ children: [`${sell_com?.name}`], bold: true, size: 24 })],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlign.TOP,
            width: {
              size: 58,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              top: convertInchesToTwip(0.1),
              left: 0,
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.2),
            },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                  line: 280,
                },
                children: [
                  new TextRun({
                    children: ["CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM"],
                    bold: true,
                    size: 24,
                  }),
                  new TextRun({ children: ["Độc lập - Tự do - Hạnh phúc"], size: 24, break: 1 }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 42,
              type: WidthType.PERCENTAGE,
            },
            margins: {
              left: 0,
              bottom: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.2),
            },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ children: ["----oOo----"], size: 24 })],
              }),
            ],
          }),
          new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 58,
              type: WidthType.PERCENTAGE,
            },
            verticalAlign: VerticalAlign.CENTER,
            margins: {
              left: 0,
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.2),
            },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ children: ["----oOo----"], size: 24 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const contractName = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      before: 300,
    },
    children: [
      new TextRun({
        text: "BIÊN BẢN GIAO NHẬN HÀNG HÓA",
        bold: true,
        size: 24,
        break: 1,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const para1 = new Paragraph({
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: ["-   Căn cứ thực tế số hàng hóa giao nhận."],
        italics: true,
        size: 24,
        break: 1,
      }),
    ],
  });

  const para2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 100000,
      },
    ],
    spacing: {
      before: 200,
      after: 300,
    },
    children: [
      new TextRun({
        children: [
          `TP HCM, ngày ${invoice?.day || "...."} tháng ${invoice?.month || "...."} năm ${
            invoice?.year || "...."
          }, hai bên gồm có:`,
        ],
        italics: true,
        size: 24,
      }),
    ],
  });

  const createSellComInfo = () => {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: 100000,
        },
      ],
      spacing: {
        before: 200,
        line: 320,
      },
      children: [
        ...renderComName(sell_com?.name, 40, 3, true),
        ...renderComAddress(sell_com?.address, 70, 2),

        new TextRun({
          children: [`Mã số thuế	: ${sell_com?.tax_code}`],
          size: 24,
          break: 1,
        }),
      ],
    });
  };

  const createBuyComInfo = () => {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: 100000,
        },
      ],
      spacing: {
        before: 200,
        line: 320,
      },
      children: [
        ...renderComName(buy_com?.name, 40, 3, false),
        ...renderComAddress(buy_com?.address, 70, 2),

        new TextRun({
          children: [`Mã số thuế	: ${buy_com?.tax_code}`],
          size: 24,
          break: 1,
        }),
      ],
    });
  };

  const para3 = new Paragraph({
    spacing: {},
    children: [
      new TextRun({ text: "Hai bên cùng thoả thuận ký vào", size: 24, break: 1 }),
      new TextRun({
        text: " BIÊN BẢN GIAO NHẬN HÀNG HÓA ",
        bold: true,
        size: 24,
      }),
      new TextRun({
        text: "với nội dung như sau:",
        size: 24,
      }),
    ],
  });

  const rule1 = new Paragraph({
    children: [
      new TextRun({
        children: ["ĐIỀU 1: Điều kiện vận chuyển:"],
        bold: true,
        size: 24,
        break: 1,
      }),
    ],
  });

  const subRule11 = new Paragraph({
    spacing: {
      before: 280,
      after: 280,
    },
    children: [
      new TextRun({
        children: ["Sau khi kiểm tra Bên B xác nhận: "],
        size: 24,
      }),
      new TextRun({
        children: ["Bên A đã giao đúng chất lượng và đủ số lượng hàng hóa như sau:"],
        bold: true,
        size: 24,
      }),
    ],
  });

  const rule2 = new Paragraph({
    children: [
      new TextRun({
        children: ["ĐIỀU 2: Điều khoản chung:"],
        bold: true,
        size: 24,
        break: 2,
      }),
    ],
  });

  const subRule21 = new Paragraph({
    spacing: {
      before: 280,
      line: 360,
    },
    children: [
      new TextRun({
        children: ["Biên bản được lập để làm cơ sở thanh toán cho hai bên."],
        size: 24,
      }),
    ],
    numbering: {
      reference: "my-bullet-points",
      level: 0,
    },
  });

  const subRule22 = new Paragraph({
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [
          "Biên bản lập thành 02 (hai) bản mỗi bên giữ 01(một) bản có giá trị pháp lý như nhau.",
        ],
        size: 24,
      }),
    ],
    numbering: {
      reference: "my-bullet-points",
      level: 0,
    },
  });

  const table = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },

    rows: [
      new TableRow({
        children: [
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["TT"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 42,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Tên hàng"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 15,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["ĐVT"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 15,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["S.lượng"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.1),
              right: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 28,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Ghi chú"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      ...renderProductRows(invoice?.products),
    ],
  });

  const signArea = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ children: ["ĐẠI DIỆN BÊN GIAO"], bold: true, size: 24, break: 1 }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.1),
            },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ children: ["ĐẠI DIỆN BÊN NHẬN"], bold: true, size: 24, break: 1 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  //
  //
  //
  //
  //

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(8.5),
              height: convertInchesToTwip(11),
            },
            margin: {
              top: convertInchesToTwip(0.3),
              right: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.75),
            },
          },
        },
        children: [
          declareSection,
          contractName,
          para1,
          para2,
          createSellComInfo(),
          createBuyComInfo(),
          para3,
          rule1,
          subRule11,
          table,
          rule2,
          subRule21,
          subRule22,
          signArea,
        ],
      },
    ],
    numbering: {
      config: [
        {
          reference: "my-bullet-points",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "-",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
                },
              },
            },
          ],
        },
      ],
    },
  });

  return Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`${file_name}.docx`, buffer);
  });
};

module.exports = { generateBBGN };
