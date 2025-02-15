const {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
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
  TableLayoutType,
} = require("docx");

var fs = require("fs");
const { renderComAddress, renderComName, renderProductRows } = require("../definedFunctions.js");

const path = require("path");
const dash_imgs = path.resolve(__dirname, "imgs/dashline.png");

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
      name: "Vận chuyển vật tư cho CT: ",
      unit: "Mét",
      quantity: 119,
      price_per_unit: "420,000",
      total_price: "49,980,000",
    },

    {
      name: "Thuê nhân công cho CT: ",
      unit: "Mét",
      quantity: 253,
      price_per_unit: "198,000",
      total_price: "50,094,000",
    },

    {
      name: "Vận chuyển vật tư cho CT: ",
      unit: "Mét",
      quantity: 253,
      price_per_unit: "198,000",
      total_price: "50,094,000",
    },

    {
      name: "Vận chuyển vật tư cho CT: ",
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

const generateHDMB = async (sell_com, buy_com, product_info, contract_info, file_name) => {
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
        text: "----------o0o----------",
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
        text: "HỢP ĐỒNG THUÊ KHOÁN DỊCH VỤ",
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        text: `(Số: ${contract_info?.code})`,
        bold: true,
        break: 2,
        size: 24,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const para1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 100000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: [
          new Tab(),
          "- Căn cứ Bộ Luật Dân sự số 33/2005/QH 11 ngày 26/07/2005 của Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam được Quốc Hội thông qua ngày 14/06/2005 và có hiệu lực từ ngày 01/01/2006.",
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
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: [
          new Tab(),
          "- Căn cứ Bộ Luật Dân sự số 33/2005/QH 11 ngày 26/07/2005 của Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam được Quốc Hội thông qua ngày 14/06/2005 và có hiệu lực từ ngày 01/01/2006.",
        ],
        italics: true,
        size: 24,
      }),
    ],
  });

  const para3 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 100000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: [new Tab(), "- Căn cứ vào nhu cầu và khả năng của hai bên."],
        italics: true,
        size: 24,
      }),
    ],
  });

  const para4 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 100000,
      },
    ],
    spacing: {
      before: 200,
      after: 300,
      line: 300,
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
        size: 24,
      }),
    ],
  });

  const createSellComInfo = () => {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.LEFT,
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
          type: TabStopType.LEFT,
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

  const para5 = new Paragraph({
    spacing: {
      after: 160,
    },
    children: [
      new TextRun({
        children: [
          "Sau khi bàn bạc thảo luận , hai bên đồng ý ký kết hợp đồng cho thuê nhân công, máy móc và vận chuyển với nội dung sau:",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule1 = new Paragraph({
    spacing: {
      line: 320,
      after: 160,
    },
    children: [
      new TextRun({
        children: ["Điều 1: NỘI DUNG THUÊ KHOÁN"],
        bold: true,
        size: 24,
      }),
    ],
  });

  const subRule11 = new Paragraph({
    spacing: {
      line: 320,
      after: 50,
    },
    children: [
      new TextRun({
        children: [`2.3. Giá trên đã bao gồm thuế VAT ${contract_info?.tax}`],
        size: 24,
      }),
    ],
  });

  const totalPriceByWords = new Paragraph({
    spacing: {
      line: 300,
    },
    children: [
      new TextRun({
        children: [`Bằng chữ: ${contract_info?.total_price_by_words}./.`],
        bold: true,
        italics: true,
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 10000,
      },
    ],
    spacing: {
      line: 320,
      after: 160,
    },
    children: [
      new TextRun({
        children: [new Tab(), `Điều 2. PHƯƠNG THỨC THANH TOÁN`],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [
          `Thanh toán 100% giá trị hợp đồng sau khi kết thúc thời gian thuê, mướn  và vận chuyển . Bên A cung cấp đầy đủ các hóa đơn, chứng từ hợp lệ.`,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule3 = new Paragraph({
    spacing: {
      line: 320,
      after: 160,
    },
    children: [
      new TextRun({
        children: ["Điều 3. TRÁCH NHIỆM CÁC BÊN"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: ["4.1. TRÁCH NHIỆM CỦA BÊN A"],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: ["4.1.1."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Cung cấp cho bên B dịch vụ thuê máy và vận chuyển sử dụng tốt, được hai bên xác nhận và bàn giao tại công trình của bên B và hướng dẫn bên B cách sử dụng hiệu quả nhất.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.1.2."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Trong quá trình sử dụng máy móc có bất kỳ vấn đề gì phát sinh do lỗi của bên A, Bên A sẽ cử nhân viên kĩ thuật xuống sửa chữa trong vòng 12h, và trong trường hợp nếu phải sửa chữa trong thời gian lâu dài, bên A sẽ thay thế bằng loại máy khác có tính năng tương đương trong vòng 2 ngày kể từ thời điểm máy móc hỏng không sử dụng được, mọi chi phí phát sinh do bên A chịu.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.1.3."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [" Cung cấp hóa đơn GTGT cho bên B."],
        size: 24,
      }),

      new TextRun({
        children: ["4.2. TRÁCH NHIỆM CỦA BÊN B:"],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: ["4.2.1."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Có trách nhiệm tuân thủ những quy định của bên A về vận hành và sử dụng máy móc, sử dụng đúng mục đích, công năng của máy móc.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.2.2."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Bên B không tự ý di dời máy móc đến công trình, địa điểm khác hoặc cho thuê lại máy móc khi không có sự cho phép của bên A.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.2.3."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Có trách nhiệm bảo quản máy móc của bên A ( tính từ thời điểm bàn giao). Nếu bị mất hay do bên B bảo quản không tốt dẫn đến bị hư hỏng thì bên B phải bồi thường cho bên A theo đúng giá trị máy móc tại thời điểm thanh toán ( căn cứ vào giá trị còn lại của máy móc tại thời điểm thuê )",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.2.4."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Trong quá trình thực hiện hợp đồng nếu do nhu cầu thay đổi về thời gian thuê hoặc số lượng máy móc, phải thông báo bằng văn bản cho bên A chậm nhất trước 03 ngày và phải thanh toán toàn bộ tiền thuê máy móc trước đó.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["4.2.5."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [" Phải thanh toán đúng thời hạn cho bên A theo điều khoản 3."],
        size: 24,
      }),

      new TextRun({
        children: ["4.2.6."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Sau khi kết thúc hợp đồng bàn giao thiết bị cho bên A theo đúng nguyên trạng ban đầu ( Dựa trên biên bản bàn giao máy móc)",
        ],
        size: 24,
      }),
    ],
  });

  const rule4 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      line: 320,
      after: 160,
    },
    children: [
      new TextRun({
        children: ["Điều 5: ĐIỀU KHOẢN CHUNG"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: ["6.1."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Mọi sửa đổi bổ sung về cách thức cho thuê , nội dung hợp đồng phải thông qua sự thống nhất giữa hai bên và thể hiện bằng văn bản cụ thể.",
        ],
        size: 24,
      }),

      new TextRun({
        children: ["6.2."],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          " Bản hợp đồng này tuân thủ theo quy định của pháp luật hiện hành Việt Nam. Nếu có tranh chấp 2 bên cùng giải hòa, nếu không thành sẽ đưa ra  Tòa án TP HCM giải quyết, phán quyết của tòa án bắt buộc các bên phải thực hiện , bên thua chịu án phí.",
        ],
        size: 24,
      }),
    ],
  });

  const rule5 = new Paragraph({
    spacing: {
      line: 320,
      after: 160,
    },
    children: [
      new TextRun({
        children: [`ĐIỀU 7: HIỆU LỰC HỢP ĐỒNG`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [`7.1.`],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [` Hợp đồng này có hiệu lực kể từ ngày ký`],
        size: 24,
      }),

      new TextRun({
        children: [`7.2.`],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          ` Hợp đồng sẽ tự động được thanh lý sau khi bên B hoàn trả xe cuốc và thực hiện đầy đủ nghĩa vụ thanh toán của mình .`,
        ],
        size: 24,
      }),

      new TextRun({
        children: [`7.3.`],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          ` Hợp đồng này gồm 03 trang, được lập thành 04 bản , mỗi bên giữ 02 bản có giá trị như nhau, lấy tiếng Việt làm chuẩn và có hiệu lực ngay khi kí bởi hai bên.`,
        ],
        size: 24,
      }),
    ],
  });

  const table = new Table({
    width: {
      size: 10000,
      type: WidthType.DXA,
    },
    layout: TableLayoutType.FIXED,

    rows: [
      new TableRow({
        children: [
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 8,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["STT"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 46,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Nội Dung"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 8,
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
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
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
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 14,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Đơn giá"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.05),
              bottom: convertInchesToTwip(0.05),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 14,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Thành tiền"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      ...renderProductRows(product_info?.products),
      new TableRow({
        children: [
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 34,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 5,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Tổng cộng:"],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),

          new TableCell({
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 24,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [`${contract_info?.total_before_tax}`],
                    bold: true,
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 34,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 5,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [`Thuế VAT ${contract_info?.tax}:`],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),

          new TableCell({
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [`${contract_info?.tax_total}`],
                    bold: true,
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 34,
              type: WidthType.PERCENTAGE,
            },
            columnSpan: 5,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [`Tổng cộng tiền thanh toán`],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [`${contract_info?.total_after_tax}`],
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        ],
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
                  new TextRun({ children: ["ĐẠI DIỆN BÊN A"], bold: true, size: 24, break: 1 }),
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
                  new TextRun({ children: ["ĐẠI DIỆN BÊN B"], bold: true, size: 24, break: 1 }),
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
          para3,
          para4,
          createSellComInfo(),
          createBuyComInfo(),
          para5,
          rule1,
          table,
          totalPriceByWords,
          subRule11,
          rule2,
          rule3,
          rule4,
          rule5,
          signArea,
        ],
      },
    ],
  });
  return Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`${file_name}.docx`, buffer);
  });
};

module.exports = { generateHDMB };

// Finish
