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

// ================================================================================

// let sell_com = {
//   name: "CÔNG TY TNHH KINH DOANH TMDV TỔNG HỢP THÁI AN KINH DOANH TMDV TỔNG HỢP THÁI AN",
//   lower_case_name: "Công ty TNHH kinh doanh TMDV tổng hợp Thái An",
//   address: "2347/68/1 Phạm Thế Hiển, Phường 6, Quận 8, TP.Hồ Chí Minh",
//   tax_code: "0317973745",
//   account_num: undefined,
//   bank_name: undefined,
//   representative: "Phạm Văn Định",
//   representative_role: "Giám đốc",
// };

// let buy_com = {
//   name: "CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ KỸ THUẬT THUẬN HOÀNG LÂM KỸ THUẬT THUẬN HOÀNG LÂM",
//   lower_case_name: "Công ty TNHH thương mại và dịch vụ kỹ thuật Thuận Hoàng Lâm",
//   address:
//     "Số C6-17, Khu đô thị Thăng Long Home, Xã Phước An, Huyện Nhơn Trạch, Tỉnh Đồng Nai, Việt Nam",
//   tax_code: "3603239241",
//   account_num: undefined,
//   bank_name: undefined,
//   representative: "Phạm Đăng Hoàng",
//   representative_role: "Giám đốc",
// };

// let product_info = {
//   products: [
//     {
//       name: "Cáp ngầm LS 24kv CXV/DSTA/PVC 1x95mm2",
//       unit: "Mét",
//       quantity: 119,
//       price_per_unit: "420,000",
//       total_price: "49,980,000",
//     },

//     {
//       name: "Cáp ngầm LS 24kv CXV/DSTA/PVC 1x50mm2",
//       unit: "Mét",
//       quantity: 253,
//       price_per_unit: "198,000",
//       total_price: "50,094,000",
//     },
//   ],
// };

// let contract_info = {
//   code: "01/HĐMB/TA-THL",
//   day: undefined,
//   month: undefined,
//   year: 2024,
//   total_price_by_words: "Một trăm mười triệu không trăm tám mươi mốt nghìn bốn trăm đồng",
//   total_before_tax: "100,074,000",
//   tax_total: "10,007,400",
//   tax: "8%",
//   total_after_tax: "110,081,400",
// };

// =================================================================================

const generateTLHD = async (sell_com, buy_com, product_info, contract_info, file_name) => {
  const declareSection = new Paragraph({
    children: [
      new TextRun({
        text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        bold: true,
        size: 24,
      }),
      new TextRun({
        text: "Độc lập - Tự do - Hạnh phúc",
        bold: true,
        break: 1,
        size: 24,
      }),

      new TextRun({
        text: "----------------oOo--------------",
        bold: true,
        break: 1,
        size: 24,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const contractName = new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "BIÊN BẢN THANH LÝ HỢP ĐỒNG",
        bold: true,
        size: 24,
        break: 1,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const para1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 400,
      },
    ],
    spacing: {},
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({
        children: [
          new Tab(),
          `- Căn cứ hợp đồng Số: ${contract_info?.code} ký ngày ${
            contract_info?.day || "......"
          } / ${contract_info?.month || "......"} / ${contract_info?.year || "......"} giữa ${
            sell_com?.lower_case_name
          } với ${buy_com?.lower_case_name} V/v: thuê xe vận chuyển`,
        ],
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
      before: 240,
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
        ...renderComName(sell_com?.name, 40, 3, true),
        ...renderComAddress(sell_com?.address, 70, 2),

        new TextRun({
          children: [`Mã số thuế	: ${sell_com?.tax_code}`],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [
            `Số tài khoản	: ${
              sell_com?.account_num ||
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
          children: [`Đại diện	:Ông (Bà)`],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [`  ${sell_com?.representative}               `],
          size: 24,
          bold: true,
        }),

        new TextRun({
          children: [`Chức vụ: ${sell_com?.representative_role}`],
          size: 24,
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
          children: [`Đại diện	:Ông (Bà)`],
          size: 24,
          break: 1,
        }),

        new TextRun({
          children: [`  ${buy_com?.representative}               `],
          size: 24,
          bold: true,
        }),

        new TextRun({
          children: [`Chức vụ: ${buy_com?.representative_role}`],
          size: 24,
        }),
      ],
    });
  };

  const para3 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    alignment: AlignmentType.CENTER,
    spacing: {
      line: 220,
    },
    children: [
      new TextRun({
        children: [`Hai bên tiến hành thanh lý hợp đồng trên với các nội dung sau đây: `],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 400,
      },
    ],
    spacing: {
      line: 240,
    },
    children: [
      new TextRun({
        children: [`Điều 1: Phần thực hiện: `],
        italics: true,
        bold: true,
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [new Tab(), `Bên A cung cấp xe cho bên B theo đúng yêu cầu.`],
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [new Tab(), `Bên B đã thanh toán toàn bộ giá trị hợp đồng như đã thỏa thuận .`],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 1400,
      },
    ],
    spacing: {
      line: 240,
    },
    children: [
      new TextRun({
        children: [`Điều 2:  Phần tài  chính:  `],
        italics: true,
        bold: true,
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [new Tab(), `- Tổng giá trị hợp đồng        		: 	`],
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [`${contract_info?.total_after_tax} ,đồng`],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [new Tab(), `- Bên B đã thanh toán cho bên A	:           `],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`${contract_info?.total_after_tax} ,đồng`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), `- Số còn phải thanh toán là		:	`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`0,đồng`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), `( Giá trên đã bao gồm thuế GTGT ${contract_info?.tax})`],
        size: 24,
        break: 1,
      }),
    ],
  });

  const totalPriceByWords = new Paragraph({
    spacing: {
      before: 180,
      after: 180,
    },
    children: [
      new TextRun({
        children: [`Bằng chữ: ${contract_info?.total_price_by_words}./.`],
        bold: true,
        italics: true,
        size: 24,
      }),
    ],
  });

  const para6 = new Paragraph({
    spacing: {
      line: 260,
    },
    children: [
      new TextRun({
        children: [`Kể từ ngày ..... /..... /2024 hợp đồng số ${contract_info?.code}`],
        size: 24,
      }),

      new TextRun({
        children: [
          ` ký ngày ...... / ...... /${contract_info?.year} giữa ${sell_com?.lower_case_name} với ${buy_com?.lower_case_name} V/v: thuê xe vận chuyển `,
        ],
        italics: true,
        size: 24,
      }),

      new TextRun({
        children: [
          `đã được thanh lý xong, quyền và nghĩa vụ của 2 bên đã được thực hiện đầy đủ và hai bên sẽ không có vướng mắc hay tranh chấp gì .`,
        ],
        size: 24,
      }),
    ],
  });

  const para7 = new Paragraph({
    spacing: {
      before: 220,
    },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        children: [
          `Biên bản này được thành lập 02 bản, mỗi bên giữ 01 bản và có giá trị pháp lý như nhau `,
        ],
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
            margins: {
              top: convertInchesToTwip(0.14),
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
                children: [new TextRun({ children: ["ĐẠI DIỆN BÊN A"], bold: true, size: 24 })],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.14),
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
                children: [new TextRun({ children: ["ĐẠI DIỆN BÊN B"], bold: true, size: 24 })],
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
              top: convertInchesToTwip(0.4),
              right: convertInchesToTwip(0.6),
              bottom: convertInchesToTwip(0.3),
              left: convertInchesToTwip(0.7),
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
          rule2,
          totalPriceByWords,
          para6,
          para7,
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
    console.log(file_name);
    fs.writeFileSync(String.raw`${file_name}.docx`, buffer);
  });
};

module.exports = { generateTLHD };
