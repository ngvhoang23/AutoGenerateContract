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
} = require("docx");

var fs = require("fs");
const { renderComAddress, renderComName } = require("../definedFunctions.js");

const path = require("path");
const { renderProductRows } = require("./definedFunctions.js");
const dash_imgs = path.resolve(__dirname, "imgs/dashline.png");

// ================================================================================

// let sell_com = {
//   name: "CÔNG TY TNHH KINH DOANH TMDV TỔNG HỢP THÁI AN",
//   lower_case_name: "Công ty TNHH kinh doanh TMDV tổng hợp Thái An",
//   address: "2347/68/1 Phạm Thế Hiển, Phường 6, Quận 8, TP.Hồ Chí Minh",
//   tax_code: "0317973745",
//   account_num: undefined,
//   bank_name: undefined,
//   representative: "Phạm Văn Định",
//   representative_role: "Giám đốc",
// };

// let buy_com = {
//   name: "CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ KỸ THUẬT THUẬN HOÀNG LÂM",
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
//       name: "Phí thuê xe tháng 01 năm 2024",
//       unit: "Chiếc",
//       quantity: 2,
//       price_per_unit: "25,000,000",
//       total_price: "50,000,000",
//     },

//     {
//       name: "Phí thuê xe tháng 02 năm 2024",
//       unit: "Chiếc",
//       quantity: 2,
//       price_per_unit: "25,000,000",
//       total_price: "50,000,000",
//     },
//   ],
// };

// let contract_info = {
//   code: "01/HĐMB/LP-HT",
//   day: undefined,
//   month: undefined,
//   year: 2024,
//   total_price_by_words: "Một trăm lẻ tám triệu đồng chẵn",
//   total_before_tax: "100,000,000",
//   tax_total: "8,000,000",
//   tax: "8%",
//   total_after_tax: "108,000,000",
// };

const generateHDTX = async (sell_com, buy_com, product_info, contract_info, file_name) => {
  const declareSection = new Paragraph({
    spacing: {
      line: 360,
      after: 260,
    },
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
    spacing: {
      line: 360,
      after: 260,
    },
    children: [
      new TextRun({
        text: "HỢP ĐỒNG NGUYÊN TẮC",
        bold: true,
        size: 24,
      }),

      new TextRun({
        text: `Số: ${contract_info?.code}`,
        break: 1,
        size: 24,
      }),
    ],
    alignment: AlignmentType.CENTER,
  });

  const para1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: [
          "- Căn cứ Bộ Luật dân sự số 33/2005/QH 11 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;",
        ],
        italics: true,
        size: 24,
      }),
    ],
  });

  const para2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: [
          "- Căn cứ Luật Thương mại số 36/2005/QH11 đã được Quốc Hội nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam khóa XI, kỳ họp thứ 7 thông qua ngày 14/06/2005;",
        ],
        italics: true,
        size: 24,
      }),
    ],
  });

  const para3 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: 10000,
      },
    ],
    spacing: {
      before: 120,
      line: 280,
    },
    children: [
      new TextRun({
        children: ["- Căn cứ vào nhu cầu và khả năng cung ứng của các bên dưới đây."],
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
          type: TabStopType.LEFT,
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

  const para5 = new Paragraph({
    spacing: {
      after: 320,
    },
    children: [
      new TextRun({
        children: [
          "Sau khi bàn bạc, Hai bên thống nhất ký kết hợp đồng cho thuê xe với các điều khoản sau:",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule1 = new Paragraph({
    spacing: {
      line: 320,
      after: 220,
    },
    children: [
      new TextRun({
        children: ["ĐIỀU 1 : NỘI DUNG HỢP ĐỒNG"],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [
          `Bên B đồng ý thuê xe ô tô của bên A để di chuyển, kinh doanh vận chuyển hành hóa.`,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule2 = new Paragraph({
    spacing: {
      line: 320,
      after: 220,
    },
    children: [
      new TextRun({
        children: [`ĐIỀU 2 : ĐƠN GIÁ CHO THUÊ & PHƯƠNG THỨC THANH TOÁN`],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [`- Bên B đồng ý thuê của bên A xe ô tô với đơn giá như sau:`],
        size: 24,
        break: 1,
      }),
    ],
  });

  const subRule21 = new Paragraph({
    spacing: {
      line: 320,
      before: 320,
      after: 220,
    },
    children: [
      new TextRun({
        children: [
          `- Giá thuê xe chỉ bao gồm xe, phụ kiện xe , không bao gồm chi phí xăng dầu, phí cầu đường, phí bến bãi, tiền ăn ở cho tài xế Và các chi phí phát sinh khác trong quá trình sử dụng xe (nếu có).`,
        ],
        size: 24,
      }),
      new TextRun({
        children: [
          `- Bên B sẽ thanh toán cho Bên A bằng chuyển khoản sau khi kết thúc hợp đồng 1 năm và nhận hóa đơn GTGT của bên A giao.`,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule3 = new Paragraph({
    spacing: {
      line: 320,
      after: 220,
    },
    children: [
      new TextRun({
        children: ["ĐIỀU 3 : TRÁCH NHIỆM CỦA CÁC BÊN"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: ["3.1. Trách nhiệm của bên A:"],
        size: 24,
        break: 1,
        bold: true,
      }),

      new TextRun({
        children: [
          "- Giao xe và toàn bộ giấy tờ liên quan đến xe ngay sau khi Hợp đồng có hiệu lực. Giấy tờ liên quan đến xe gồm: Giấy đăng ký xe, giấy kiểm định, giấy bảo hiểm xe.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Có trách nhiệm nộp các khoản thuế theo qui định của pháp luật."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Xuất hóa đơn thuê xe: 1 tháng/1 lần vào ngày cuối tháng."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["3.2. Trách nhiệm, quyền hạn của bên B"],
        size: 24,
        break: 1,
        bold: true,
      }),

      new TextRun({
        children: ["- Thanh toán tiền thuê xe cho Bên A đúng hạn."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Sử dụng đúng mục đích khi thuê, khi cần sửa chữa theo yêu cầu sử dụng riêng sẽ bàn bạc cụ thể với bên A và phải được bên A chấp thuận.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Chịu toàn bộ chi phí xăng dầu, phí cầu đường, phí bến bãi khi sử dụng xe."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Chịu toàn bộ chi phí khác phát sinh trong khi sử dụng xe."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Không được mang hàng quốc cấm và các vật dụng dễ cháy nổ lên xe và hoàn toàn chụi trách nhiệm về vi phạm đó.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Không được chuyển nhượng hợp đồng cho thuê hoặc cho người khác thuê lại với bất kỳ lý do nào.",
        ],
        size: 24,
        break: 1,
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
      after: 220,
    },
    children: [
      new TextRun({
        children: ["ĐIỀU 4 : HIỆU LỰC HỢP ĐỒNG"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          `- Hợp đồng có giá trị kể từ ngày ${
            contract_info?.begin_date || "..../..../...."
          } đến hết ngày ${contract_info?.end_date || "..../..../...."}`,
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Nếu một trong hai Bên, bên nào muốn chấm dứt Hợp đồng trước thời hạn thì phải thông báo cho Bên kia trước ít nhất 01 tháng.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule5 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      line: 320,
      after: 220,
    },
    children: [
      new TextRun({
        children: ["ĐIỀU 5 : ĐIỀU KHOẢN CHUNG"],
        margin: {
          bottom: 10000,
        },
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          "- Trong quá trình thực hiện hợp đồng, nếu có đề nghị điều chỉnh thì phải thông báo cho nhau bằng văn bản để cùng bàn bạc giải quyết.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Hai bên cam kết thi hành đúng các điều khoản của hợp đồng, không bên nào tự  ý đơn phương sửa đổi, đình chỉ hoặc hủy bỏ hợp đồng. Mọi sự vi phạm phải được xử lý theo pháp luật.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Hợp đồng này có hiệu lực từ ngày ký và coi như được thanh lý sau khi hai bên thực hiện xong nghĩa vụ của mình và không còn bất kỳ khiếu nại nào.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const para6 = new Paragraph({
    spacing: {
      after: 100,
    },
    children: [
      new TextRun({
        children: [
          "Hợp đồng được lập thành 02 (hai) bản có giá trị pháp lý như nhau, Bên A giữ 01 bản.Bên B giữ 01 bản.",
        ],
        size: 24,
      }),
    ],
  });

  const table = new Table({
    width: {
      size: 9000,
      type: WidthType.DXA,
    },

    rows: [
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
              size: 10,
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 25,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["LOẠI XE"],
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
              size: 10,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["SỐ LƯỢNG XE"],
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
              size: 35,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [
                      `ĐƠN GIÁ THUÊ HÀNG THÁNG (VNĐ) ( CHƯA BAO GỒM ${contract_info?.tax} THUẾ GTGT)`,
                    ],
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
                    children: ["THÀNH TIỀN"],
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
            columnSpan: 4,
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
              size: 20,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
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
            columnSpan: 4,
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
            columnSpan: 4,
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
              top: 800,
              right: 1000,
              bottom: 800,
              left: 1700,
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
          rule2,
          table,
          subRule21,
          rule3,
          rule4,
          rule5,
          para6,
          signArea,
        ],
      },
    ],
  });
  return Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(`${file_name}.docx`, buffer);
  });
};

module.exports = { generateHDTX };

// Finish
