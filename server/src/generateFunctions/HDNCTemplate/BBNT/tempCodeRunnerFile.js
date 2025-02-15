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
  total_before_tax: "100,074,000",
  tax_total: "10,007,400",
  tax: "8%",
  total_after_tax: "110,081,400",
  task_names: "tháo dỡ đường ống cũ và lắp đặt đường ống mới lên vị trí hiện hữu nhà máy 1",
};

// =================================================================================

const generateBBNT = async (sell_com, buy_com, contract_info, file_name) => {
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
    spacing: {
      before: 320,
    },
    children: [
      new TextRun({
        text: "BIÊN BẢN NGHIỆM THU",
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
        position: 400,
      },
    ],
    spacing: {
      line: 320,
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
          } với ${buy_com?.lower_case_name} V/v: thuê khoán nhân công`,
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
      line: 280,
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
        ...renderComName(sell_com?.name, 45, null, true),

        ...renderComAddress(sell_com?.address, 70),

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
        ...renderComName(buy_com?.name, 48, 4, false),
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

  const para3 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      line: 320,
      after: 380,
    },
    children: [
      new TextRun({
        children: [
          `Hai bên nhất trí lập biên bản nghiệm thu và bàn giao công việc theo hợp đồng số`,
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [` 1112/TKNCPB-DTC `],
        size: 24,
        bold: true,
      }),
      new TextRun({
        children: [
          `ngày ${contract_info?.day || "...."} tháng ${contract_info?.month || "...."} năm ${
            contract_info?.year || "...."
          } tại Văn phòng ${sell_com?.lower_case_name} với ${
            sell_com?.lower_case_name
          } V/v: thuê khoán nhân công như sau:`,
        ],
        size: 24,
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
      line: 320,
      after: 380,
    },
    children: [
      new TextRun({
        children: [`Điều 1: Nội dung:`],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [`- Bên A bàn giao cho bên B công việc:`],
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [` ${contract_info?.task_names} `],
        size: 24,
      }),
      new TextRun({
        children: [`sau khi đã hoàn thành xong.`],
        size: 24,
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
      line: 320,
      after: 380,
    },
    children: [
      new TextRun({
        children: [`Điều 2: Kết luận:`],
        italics: true,
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [`+   Bên B đã kiểm tra, thẩm định kỹ lưỡng chất lượng công việc.`],
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [
          `+   Kể từ khi bên B nhận bàn giao, Bên A hoàn toàn không chiu trách nhiệm về lỗi, chất lượng công việc:`,
        ],
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [` ${contract_info?.task_names} `],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [`đã bàn giao.`],
        size: 24,
      }),

      new TextRun({
        children: [
          `+   Bên B phải thanh toán hết cho bên A ngay sau khi biên bản nghiệm thu, thanh lý hợp đồng ký kết. `,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const para4 = new Paragraph({
    spacing: {
      line: 260,
      after: 260,
    },
    children: [
      new TextRun({
        children: [
          `(Biên bản nghiệm thu được lập thành 02 bản, mỗi bên giữ 01 bản, có giá trị pháp lý như nhau)`,
        ],
        size: 24,
        italics: true,
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
          para4,
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

module.exports = { generateBBNT };
