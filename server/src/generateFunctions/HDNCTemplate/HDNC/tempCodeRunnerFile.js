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
  TabStopPosition,
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
  task_names: "tháo dỡ đường ống cũ và lắp đặt đường ống mới lên vị trí hiện hữu nhà máy 1",
};

const generateHDMB = async (sell_com, buy_com, contract_info, file_name) => {
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
        text: "HỢP ĐỒNG THUÊ KHOÁN NHÂN CÔNG",
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        text: `(Số: ${contract_info?.code})`,
        break: 2,
        size: 24,
        bold: true,
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
          "- Căn cứ Luật Thương mại số 36/2005/QH 11 của Nước Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam được Quốc Hội thông qua ngày 14/06/2005 và có hiệu lực kể từ ngày 01/01/2006.",
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
        ...renderComName(sell_com?.name, 45, null, true),

        ...renderComAddress(sell_com?.address),

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
        ...renderComName(buy_com?.name, 45, null, false),
        ...renderComAddress(buy_com?.address),

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
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 10000,
      },
    ],
    spacing: {
      after: 140,
      before: 280,
      line: 380,
    },
    children: [
      new TextRun({
        children: [
          new Tab(),
          "Sau khi xem xét công việc, thực tế hiện trường xử lý công việc và năng lực của các bên tham gia, chúng tôi cùng thống nhất ký hợp đồng các nội dung sau:",
        ],
        size: 24,
      }),
    ],
  });

  const rule1 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
      after: 50,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 1:"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          ` Bên B đồng ý giao và bên A đồng ý nhận “Nhiệm vụ/ công việc cụ thể” theo chỉ định của bên B.`,
        ],
        size: 24,
      }),
    ],
  });

  const rule2 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), `Điều 2: Hình thức giao thầu, tiến độ và giá trị`],
        bold: true,
        size: 24,
      }),
      new TextRun({
        children: [
          new Tab(),
          `2.1 Bên A nhận khoán gọn toàn bộ các chi phí về nhân công (bao gồm chi phí trả lương, bảo hiểm xã hội, bảo hiểm y tế, tai nạn  … và các chi phí hợp pháp khác cho người lao động theo đúng quy định của pháp luật) để thực hiện thi công: `,
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [`“${contract_info?.task_names}“ `],
        size: 24,
        bold: true,
      }),

      new TextRun({
        children: [`theo yêu cầu của bên B.`],
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), `2.2 Tổng giá trị hợp đồng:`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [` ${contract_info?.total_after_tax} `],
        size: 24,
        bold: 1,
      }),

      new TextRun({
        children: [`đồng`],
        size: 24,
      }),

      new TextRun({
        children: [`Bằng chữ: ${contract_info.total_price_by_words} ./.`],
        size: 24,
        break: 1,
        bold: 1,
      }),

      new TextRun({
        children: [new Tab(), `(Giá trị trên đã bao gồm 8% thuế GTGT)`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), `2.3 Tiến độ thi công/ thực hiện công việc`],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          `- Thời gian dự kiến: từ ngày ${contract_info.begin_date || "..../..../...."} đến ${
            contract_info.end_date || "..../..../...."
          }`,
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule3 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 3: Điều kiện nghiệm thu và bàn giao công việc."],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Trình tự các bước nghiệm thu, quản lý chất lượng công việc tuân thủ theo các quy định của bên B đề ra cho bên A.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Việc nghiệm thu được tiến hành sau khi hoàn tất công việc."],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule4 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 4: Hình thức thanh toán"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), "4.1 Hình thức thanh toán: Thanh toán bằng chuyển khoản"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "4.2 Phương thức thanh toán:"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Thanh toán dứt 01 (một) lần sau khi bên A cung cấp đầy đủ hồ sơ chứng từ liên quan.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "4.3 Hồ sơ thanh toán"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "+ Hợp đồng thuê khoán."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "+ Biên bản nghiệm thu công việc."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "+ Hóa đơn giá trị gia tăng."],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule5 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 5: Bảo hiểm"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A phải mua bảo hiểm vật tư, thiết bị của mình, phục vụ thi công, bảo hiểm đối với người lao động, bảo hiểm trách nhiệm dân sự đối với người thứ ba.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A có trách nhiệm đào tạo an toàn lao động và tự chịu trách nhiệm an toàn lao động cho 100% người lao động của bên A tham gia xử lý công việc.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule6 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 6: Tranh chấp và giải quyết tranh chấp"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Trong trường hợp xảy ra tranh chấp hợp đồng trong khi thực hiện công việc, các bên phải có trách nhiệm thương lượng, giải quyết.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Trường hợp không đạt được thỏa thuận giữa các bên, việc giải quyết tranh chấp thông qua hòa giải, trọng tài hoặc tòa án giải quyết theo quy định của Pháp luật.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule7 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 7: Bất khả kháng"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "7.1. Sự kiện bất khả kháng là sự kiện xảy ra mang tính chất khách quan và nằm ngoài tầm kiểm soát của các bên như động đất , bão lụt, lốc, sóng thần, lở đất, hỏa hoạn, chiến tranh hoặc nguy cơ xảy ra chiến tranh….và các thảm họa khác chưa lường hết được , sự thay đổi chính sách hoặc ngăn cấm của cơ quan có thẩm quyền của Việt Nam",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Việc một bên không hoàn thành nghĩa vụ của mình do sự kiện bất khả kháng sẽ không phải là cơ sở để bên kia chấm dứt hợp đồng. Tuy nhiên bên bị ảnh hưởng bởi sự kiện bất khả kháng có nghĩa vụ phải:",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Tiến hành các biện pháp ngăn ngừa hợp lý và các biện pháp thay thế cần thiết để hạn chế tối đa ảnh hưởng do sự kiện bất khả kháng gây ra",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Thông báo ngay cho bên kia về sự bất khả kháng, thời gian trong vòng 07 ngày sau khi xảy ra sự kiện bất khả kháng",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "7.2.Trong trường hợp xảy ra sự kiện bất khả kháng, thời gian thực hiện hợp đồng sẽ được kéo dài bằng thời gian diễn ra sự kiện bất khả kháng mà bên bị ảnh hưởng không thể thực hiện các nghĩa vụ theo hợp đồng của mình",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule8 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 8: Tạm dừng hoặc hủy bỏ hợp đồng"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), "8.1. Tạm dừng thực hiện hợp đồng"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "Các trường hợp tạm dừng thực hiện hợp đồng"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Do lỗi bên giao thầu hoặc bên nhận thầu gây ra"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Các trường hợp bất khả kháng khác"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Các trường hợp khác do hai bên thỏa thuận"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Một bên có quyền quyết định tạm dừng hợp đồng do lỗi bên kia gây ra, nhưng phải báo cho bên kia biết trước 03 ngày và cùng bàn bạc giải quyết để tiếp tục thực hiện đúng hợp đồng xây dựng đã ký kết, trường hợp bên tạm dừng không thông báo mà tạm dừng gây ra thiệt hại thì phải bồi thường cho bên thiệt hại",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "Thời gian và mức đền bù thiệt hại do tạm dừng hợp đồng do hai bên thỏa thuận để khắc phục.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "8.2. Hủy bỏ hợp đồng"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Một bên có quyền hủy bỏ hợp đồng và không phải bồi thường thiệt hại khi bên kia vi phạm hợp đồng là điều kiện hủy bỏ mà các bên đã thỏa thuận hoặc pháp luật có quy định. Bên vi phạm hợp đồng phải bồi thường thiệt hại.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên hủy bỏ hợp đồng phải thông báo ngay cho bên kia biết về việc hủy bỏ.Nếu không thông báo mà gây thiệt hại cho bên kia, thì bên hủy bỏ hợp đồng phải bồi thường.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Khi hợp đồng bị hủy bỏ, thì hợp đồng không có hiệu lực từ thời điểm bị hủy bỏ và các bên phải hoàn trả cho nhau tài sản hoặc tiền mà bên vi phạm hợp đồng gây nên.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule9 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 9: Phạt khi vi phạm hợp đồng."],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A vi phạm về chất lượng phạt 100% giá trị thanh toán cho phần việc hay công tác bị vi phạm về chất lượng.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Trong quá trình thi công, bên A không bố trí được số lượng công nhân tương ứng để đảm bảo tiến độ thi công đề ra hoặc bên B phải gửi 3 lần thông báo yêu cầu về việc trên, Bên A bị coi là vi phạm hợp đồng và phạt 10% giá trị đã thanh toán theo hợp đồng. Trong trường hợp đó, trong vòng 03 ngày sau khi bên B yêu cầu dừng thi công, bên A phải bàn giao toàn bộ vật liệu do bên B cấp đồng thời tự có trách nhiệm bảo vệ trang thiết bị, dụng cụ lao động của bên A tại nơi làm việc. Qua thời gian trên nếu bên A không tiến hành bàn giao, bên B sẽ chủ động lấy lại vật tư đã cấp và bên A phải hoàn toàn chịu trách nhiệm nếu xảy ra hao hụt, mất mát.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A vi phạm về tiến độ thực hiện hợp đồng mà không do sự kiện bất khả kháng hoặc không do lỗi bên B gây ra, bên A sẽ chịu phạt 1% giá trị hợp đồng nhân với số ngày chậm tiến độ. Qua thời gian 10 ngày mà bên A vẫn chưa hoàn thiện, bên B có quyền đưa bên thứ 3 vào thi công, mọi chi phí phát sinh do bên A chịu trách nhiệm thanh toán và trừ trực tiếp vào hồ sơ Quyết toán.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A vi phạm do không hoàn thành đầy đủ số lượng sản phẩm hoặc chất lượng sản phẩm không đạt yêu cầu của hợp đồng thì bên B bằng kinh phí của mình (bao gồm vật tư, nhân công …) làm lại cho đủ và đúng chất lượng.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên B chậm thanh tóan không do lỗi của bên B thì sẽ phải chịu phạt theo điều khoản thanh toán ở trên.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule10 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 10: Trách nhiệm của các bên"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [new Tab(), "1. Trách nhiệm của bên A"],
        bold: true,
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A phải chịu trách nhiệm chuẩn bị số lượng nhân công và trình độ tay nghề để đảm bảo tiến độ công việc và chất lượng đạt đúng yêu cầu của bên B.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A tự cấp dụng cụ thi công và nhân công đảm bảo tiến độ thi công theo yêu cầu của Bên B",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Chịu trách nhiệm đảm bảo an toàn tuyệt đối cho máy móc thiết bị và cho người lao động.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Thực hiện đầy đủ các chế độ Nhà nước quy định đối với người lao động làm việc tại công trình.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên A tự chịu trách nhiệm trước cơ quan pháp luật nhà nước về các hành vi vi phạm pháp luật bởi bất kỳ công nhân nào của bên A.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Kỹ thuật bên B và bên A phối hợp với nhau để phục vụ công việc được tốt nhất có thể.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "2. Trách nhiệm của bên B"],
        size: 24,
        bold: true,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Cung cấp điện nước thi công, điện nước sinh hoạt tại nơi làm việc.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Cung cấp nhà kho chứa vật tư."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Quản lý thống nhất hiện trạng công trình sau khi bàn giao."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Tổ chức bảo vệ an ninh trật tự trong phạm vi công trình."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Bàn giao mặt bằng thi công cho bên A"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Bàn giao mọi hồ sơ, bản vẽ, tài liệu cần thiết cho bên A"],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [new Tab(), "- Kiểm tra,giám sát khối lượng, chất lượng công việc giao bên A."],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Bên B có quyền yêu cầu Bên A tăng số lượng nhân công nếu thấy Bên A không đảm bảo tiến độ theo yêu cầu.",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Có quyền yêu cầu Bên A dừng hoạt động và chuyển giao cho bên thứ ba nếu Bên A thi công không đúng yêu cầu hoặc không tăng tiến độ theo yêu cầu của Bên A.",
        ],
        size: 24,
        break: 1,
      }),
    ],
  });

  const rule11 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      line: 360,
    },
    children: [
      new TextRun({
        children: [new Tab(), "Điều 11: Điều khoản khác"],
        bold: true,
        size: 24,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Hai bên cam kết thực hiện đầy đủ, nghiêm túc những điều khoản đã thỏa thuận trong Hợp đồng",
        ],
        size: 24,
        break: 1,
      }),

      new TextRun({
        children: [
          new Tab(),
          "- Hợp đồng được lập thành 02 bản, mỗi bên giữ 01 bản có giá trị pháp lý như nhau. Hợp đồng có hiệu lực kể từ ngày ký.",
        ],
        size: 24,
        break: 1,
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

  const para6 = new Paragraph({
    tabStops: [
      {
        type: TabStopType.LEFT,
        position: convertInchesToTwip(0.3),
      },
    ],
    spacing: {
      after: 100,
      line: 280,
    },
    children: [
      new TextRun({
        children: [new Tab(), "* Lưu ý:"],
        size: 24,
        italics: true,
        bold: 1,
        break: 1,
      }),
      new TextRun({
        children: [
          new Tab(),
          "- Không được uống bia, rượu, chơi bài dưới mọi hình thức, không gây gổ đánh nhau trong công trường thi công.",
        ],
        size: 24,
        bold: 1,
        italics: true,
        break: 1,
      }),
      new TextRun({
        children: [
          new Tab(),
          "- Nếu sai phạm: lần thứ 1 nhắc nhở và phạt 01 triệu đồng. Lần thứ 2 vi phạm phạt 05 triệu đồng và không được tiếp tục thi công đồng thời ra khỏi công trường thi công.",
        ],
        size: 24,
        italics: true,
        bold: 1,
        break: 1,
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
          rule3,
          rule4,
          rule5,
          rule6,
          rule7,
          rule8,
          rule9,
          rule10,
          para6,
          rule11,
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
