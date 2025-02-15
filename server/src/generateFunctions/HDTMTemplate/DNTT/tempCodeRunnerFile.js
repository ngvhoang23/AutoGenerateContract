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
const { renderComAddress, renderComName, renderComNameOnly } = require("../definedFunctions.js");
const { renderProductRows } = require("../definedFunctions.js");
const { renderInvoices } = require("./definedFunctions.js");

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
};

let contract_info = {
  code: "01/HĐMB/TA-THL",
  day: undefined,
  month: undefined,
  year: 2024,
  total_price_by_words: "Một trăm mười triệu không trăm tám mươi mốt nghìn bốn trăm đồng",
  total_before_tax: "100,074,000",
  tax_total: "10,007,400",
  tax: "8%",
  total_after_tax: "110,081,400",
};

let invoices = [
  {
    code: "HD001",
    day: 12,
    month: 12,
    year: 2024,
  },

  {
    code: "HD001",
    day: 12,
    month: 12,
    year: 2024,
  },

  {
    code: "HD001",
    day: 12,
    month: 12,
    year: 2024,
  },
];

// =================================================================================

const generateDNTT = async (sell_com, buy_com, contract_info, invoices, file_name) => {
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
      before: 200,
      after: 220,
    },
    children: [
      new TextRun({
        text: "BẢN ĐỀ NGHỊ THANH TOÁN",
        bold: true,
        size: 24,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const para1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 1000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
      after: 200,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Kính gửi:", new Tab()],
        italics: true,
        size: 24,
      }),

      ...renderComNameOnly(buy_com?.name, 45, 4),
    ],
  });

  const para2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 400,
      },
    ],
    spacing: {
      line: 280,
      after: 120,
    },
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({
        children: [
          new Tab(),
          `- Căn cứ hợp đồng Số: ${contract_info?.code} ký ngày ${
            contract_info?.day || "......"
          } / ${contract_info?.month || "......"} / ${contract_info?.year || "......"} giữa ${
            sell_com?.lower_case_name
          } với ${buy_com?.lower_case_name} V/v: thuê khoán dịch vụ`,
        ],
        italics: true,
        size: 24,
      }),
    ],
  });

  const para5 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 100000,
      },
    ],
    spacing: {
      after: 200,
    },
    children: [
      new TextRun({
        children: [
          `Hôm nay, ngày ${contract_info?.day || "...."} Tháng ${
            contract_info?.month || "...."
          } năm ${contract_info?.year || "...."}, tại Văn phòng ${
            sell_com?.lower_case_name
          }, chúng tôi gồm có:`,
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
        ...renderComName(sell_com?.name, 40, 4, true),
        ...renderComAddress(sell_com?.address, 70, 3),

        new TextRun({
          children: [`Mã số thuế	: ${sell_com?.tax_code}`],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Số tài khoản	: ${
              buy_com?.account_num ||
              "....................................................................................................."
            }`,
          ],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Tại 		: ${
              sell_com?.bank_name ||
              "....................................................................................................."
            }`,
          ],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Đại diện	:Ông (Bà)  ${sell_com?.representative}               Chức vụ: ${sell_com?.representative_role}`,
          ],
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
        ...renderComName(buy_com?.name, 40, 4, false),
        ...renderComAddress(buy_com?.address, 70, 3),

        new TextRun({
          children: [`Mã số thuế	: ${buy_com?.tax_code}`],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Số tài khoản	: ${
              buy_com?.account_num ||
              "....................................................................................................."
            }`,
          ],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Tại 		: ${
              buy_com?.bank_name ||
              "....................................................................................................."
            }`,
          ],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Đại diện	:Ông (Bà)  ${buy_com?.representative}               Chức vụ: ${buy_com?.representative_role}`,
          ],
          size: 24,
          break: 1,
        }),
      ],
    });
  };

  const para6 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      before: 240,
    },
    children: [
      new TextRun({
        children: [new Tab(), `Đề nghị`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [` ${buy_com?.name} `],
        bold: true,
        italics: true,
        size: 24,
      }),

      new TextRun({
        children: [`thanh toán công nợ:`],
        bold: true,
        size: 24,
      }),
    ],
  });

  const para7 = new Paragraph({
    spacing: {
      before: 240,
    },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        children: [`Tổng thanh toán:`],
        italics: true,
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [` ${contract_info?.total_after_tax} `],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [`,đồng.`],
        italics: true,
        bold: true,
        size: 24,
      }),
    ],
  });

  const totalPriceByWords = new Paragraph({
    spacing: {
      before: 200,
      line: 280,
    },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        children: [`Bằng chữ: ${contract_info?.total_price_by_words}./.`],
        bold: true,
        italics: true,
        size: 24,
      }),
      new TextRun({
        children: [` (Đã bao gồm VAT ${contract_info?.tax})`],
        bold: true,
        italics: true,
        size: 24,
        break: 1,
      }),
    ],
  });

  const para8 = new Paragraph({
    spacing: {
      before: 200,
    },
    children: [
      new TextRun({
        children: [`Lý do thanh toán: Thanh toán tiền theo hóa đơn./.`],
        size: 24,
      }),
    ],
  });

  const para9 = new Paragraph({
    spacing: { before: 180 },
    children: [
      new TextRun({
        children: [`Chân thành cảm ơn.`],
        size: 24,
      }),
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
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
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
                children: [new TextRun({ children: [""], italics: true, size: 24 })],
              }),
            ],
          }),
          new TableCell({
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
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
                  new TextRun({
                    children: [`…………, ngày ....  tháng  .... năm ${contract_info?.year}`],
                    italics: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

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
                children: [new TextRun({ children: [""], italics: true, size: 24 })],
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
                children: [new TextRun({ children: ["GIÁM ĐỐC"], bold: true, size: 24 })],
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
          ...renderInvoices(invoices),
          para5,
          createSellComInfo(),
          createBuyComInfo(),
          para6,
          para7,
          totalPriceByWords,
          para8,
          para9,
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

module.exports = { generateDNTT };
