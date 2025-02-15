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
        text: "HỢP ĐỒNG MUA BÁN",
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        text: "",
        bold: true,
        size: 24,
        break: 1,
      }),

      new ImageRun({
        type: "gif",
        data: fs.readFileSync(dash_imgs),
        transformation: {
          width: 180,
          height: 16,
        },
        break: 10,
      }),

      new TextRun({
        text: `Số: ${contract_info?.code}`,
        break: 1,
        size: 24,
      }),

      new TextRun({
        text: `V/v: ${contract_info?.regarding || "........"}`,
        italics: true,
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
          "- Căn cứ Bộ Luật dân sự số 33/2005/QH11 được Quốc hội Nước Cộng hòa XHCN Việt Nam thông qua tại kỳ họp thứ 7, có hiệu lực từ ngày 01/01/2006;",
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
          "- Căn cứ vào Luật Thương mại số 36/2005/QH11 được Quốc hội Nước Cộng hòa XHCN Việt Nam thông qua tại kỳ họp thứ 7, có hiệu lực từ ngày 01/01/2006;",
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
        children: [new Tab(), "- Căn cứ vào khả năng và nhu cầu của hai bên. "],
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

  const para5 = new Paragraph({
    spacing: {
      after: 100,
    },
    children: [
      new TextRun({
        children: ["Sau khi bàn bạc hai bên tiến hành thỏa thuận theo những điều khoản sau:"],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule1 = new Paragraph({
    spacing: {
      line: 320,
      after: 50,
    },
    children: [
      new TextRun({
        children: ["Điều 1:"],
        bold: true,
        underline: true,
        size: 24,
      }),
      new TextRun({
        children: [` Hàng hóa, hình thức giao nhận.`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [`1. Hàng hóa:`],
        italics: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`-  Bên A bán cho bên B số lượng hàng hóa sau:`],
        italics: true,
        size: 24,
        break: 1,
      }),
    ],
  });

  const totalPriceByWords = new Paragraph({
    spacing: {},
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

  const subRule12 = new Paragraph({
    spacing: {
      line: 320,
    },
    children: [
      new TextRun({
        children: [`2. Hình thức giao nhận: `],
        italics: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`- Giao nhận theo đơn đặt hàng của bên B.`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`3.Thời gian thực hiện: `],
        italics: true,
        size: 24,
        break: 1,
      }),
      new TextRun({
        children: [`Theo thông báo của Bên B.`],
        size: 24,
      }),
    ],
  });

  const rule2 = new Paragraph({
    spacing: {
      line: 320,
    },
    children: [
      new TextRun({
        children: [`Điều 2:`],
        underline: true,
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [` Giá cả, phương thức thanh toán.`],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [`* Giá cả: Theo đơn đặt hàng đã được duyệt`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`* Phương thức thanh toán: `],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          `-  Hai bên đối chiếu số lượng thực tế phát sinh theo đơn đặt hàng. Trên cơ sở đó Bên A lập bảng kê có xác nhận của 02 bên, đồng thời bên A sẽ phát hành hóa đơn tài chính cho Bên B .`,
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`* Chứng từ thanh toán:`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`- Hoá đơn tài chính `],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`* Thời gian thanh toán: `],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          `Trong vòng 10 ngày kể từ khi Bên B nhận đủ chứng từ hợp lệ; hoá đơn tài chính và các chứng từ khác liên quan có xác nhận của 02 bên.`,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule3 = new Paragraph({
    spacing: {
      line: 320,
    },
    children: [
      new TextRun({
        children: ["Điều 3:"],
        underline: true,
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [" Trách nhiệm mỗi bên."],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: ["1.  Trách nhiệm của bên A"],
        italics: true,
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Xác nhận đơn đặt hàng do bên B gửi qua trực tiếp hoặc mail, fax."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Gửi đối chiếu theo từng loại mặt hàng (số lượng, chủng loại)."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Chịu trách nhiệm trọn gói trong quá trình vận chuyển."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Bên A có trách nhiệm kiểm đếm hàng hóa tại kho đóng hàng, nhận chứng từ giao nhận của khách hàng và gửi lại cho bên B.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["2.  Trách nhiệm của bên B"],
        italics: true,
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Thông báo bằng email, fax hoặc điện thoại cho Bên A kế hoạch và thời gian thực hiện giao nhận hàng trước 12h để Bên A bố trí phương tiện. Nếu có thay đổi, Bên B phải thông báo kịp thời cho Bên A.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "- Cử người có trách nhiệm giao nhận nhận hàng và giải quyết các vướng mắc phát sinh trong quá trình vận chuyển.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: ["- Thanh toán đầy đủ và đúng hạn tiền hàng hóa như quy định."],
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
    },
    children: [
      new TextRun({
        children: ["Điều 4:"],
        bold: true,
        underline: true,
        size: 24,
      }),

      new TextRun({
        children: [" Điều khoản chung:"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          "4.1.Hai bên cam kết thực hiện đúng các điều khoản đã ký kết, cùng phối hợp thực hiện trên tinh thần hỗ trợ lẫn nhau. Trong quá trình thực hiện hợp đồng, nếu vì lý do khách quan hoặc một trong các bên thấy cần sửa đổi bổ sung một phần hoặc chấm dứt hợp đồng thì phải thông báo trước cho bên kia bằng văn bản trước 1 thángđể hai bên cùng bàn bạc giải quyết.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Mọi điều khoản, điều kiện không nhắc đến trong hợp đồng này, hai bên căn cứ theo quy định hiện hành của pháp luật Việt Nam để thực hiện.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "4.2. Trong quá trình thực hiện, khi có sự thay đổi chính sách Nhà nước về giá cả vật tư, các chính sách khác liên quan thì 2 bên sẽ thống nhất lại giá cả để đảm bảo giá hợp lý. Mọi sửa đổi, bổ sung được hai bên thống nhất bằng phụ lục hợp đồng. ",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "4.3 Hợp đồng này có hiệu lực từ ngày ……/…../…… cho đến hết ngày …../…../……., nếu hai bên hoàn tất mọi thủ tục và không có khiếu nại thì hợp đồng coi như tự động được thanh lý và hết hiệu lực kể từ thời điểm đó.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "4.4.Mọi tranh chấp phát sinh trong quá trình thực hiện hợp đồng này trước hết phải được giải quyết thông qua hình thức thương lượng giữa các bên trên cơ sở tôn trọng, bình đẳng và cùng có lợi.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Trường hợp thương lượng không đạt kết quả, một trong các bên được quyền đưa tranh chấp ra Toà án nhân dân có thẩm quyền tại địa phương để giải quyết. Phán quyết của Toà án là quyết định cuối cùng buộc hai bên chấp hành, bên thua kiện phải chịu trách nhiệm thanh toán toàn bộ án phí của vụ việc.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          "Hợp đồng được lập thành 02 bản, mỗi bên giữ 01 bản có giá trị pháp lý như nhau.",
        ],
        size: 24,
        break: 1,
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
              size: 8,
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
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
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.04),
              right: convertInchesToTwip(0.04),
            },
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 80,
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
              size: 8,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [""],
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
              size: 8,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [""],
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
              size: 8,
              type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: [""],
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
          table,
          totalPriceByWords,
          subRule12,
          rule2,
          rule3,
          rule4,
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
