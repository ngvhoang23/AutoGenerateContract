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

const getCutName = (words, from, to) => {
  const result = words
    ?.filter((word, index) => {
      return index <= to && index >= from;
    })
    ?.join(" ");
  return result;
};

const getWordIndexByCharIndex = (my_string, char_index) => {
  const words = my_string?.split(" ");

  let init = -1;
  let word_index = null;
  words?.forEach((word, index) => {
    init += word?.length + 1;
    if (init >= char_index) {
      if (!word_index) {
        word_index = index;
      }
      return;
    }
  });
  return word_index;
};

const renderComName = (com_name, max_letter, num_of_tab, is_selling) => {
  const components = [];

  components.push(
    new TextRun({
      text: `BÊN ${is_selling ? "A" : "B"}`,
      bold: true,
      underline: true,
      size: 24,
    }),
  );

  const words = com_name?.split(" ");

  const renderTabs = () => {
    const tabs = [];
    for (let i = 1; i <= num_of_tab; i++) {
      tabs.push(new Tab());
    }
    return tabs;
  };

  if (com_name?.length >= max_letter) {
    const breakIndex = getWordIndexByCharIndex(com_name, max_letter);
    components.push(
      new TextRun({
        text: ` (BÊN ${is_selling ? "CHO THUÊ" : "THUÊ"}):  ${getCutName(
          words,
          0,
          breakIndex - 1,
        )} `,
        bold: true,
        size: 24,
      }),
    );
    components.push(
      new TextRun({
        children: [...renderTabs(), `${getCutName(words, breakIndex, words.length - 1)}`],
        bold: true,
        size: 24,
      }),
    );
  } else {
    components.push(
      new TextRun({
        text: ` (BÊN ${is_selling ? "CHO THUÊ" : "THUÊ"}): ${com_name}`,
        bold: true,
        size: 24,
      }),
    );
  }

  return components;
};

const renderComNameOnly = (com_name, max_letter, num_of_tab) => {
  const components = [];

  const words = com_name?.split(" ");

  const renderTabs = () => {
    const tabs = [];
    for (let i = 1; i <= num_of_tab; i++) {
      tabs.push(new Tab());
    }
    return tabs;
  };

  if (com_name?.length >= max_letter) {
    const breakIndex = getWordIndexByCharIndex(com_name, max_letter);
    components.push(
      new TextRun({
        text: `${getCutName(words, 0, breakIndex - 1)} `,
        bold: true,
        size: 24,
      }),
    );
    components.push(
      new TextRun({
        children: [...renderTabs(), `${getCutName(words, breakIndex, words.length - 1)}`],
        bold: true,
        break: 1,
        size: 24,
      }),
    );
  } else {
    components.push(
      new TextRun({
        text: `${com_name}`,
        bold: true,
        size: 24,
      }),
    );
  }

  return components;
};

const renderComAddress = (com_address, max_letter, num_of_tab) => {
  const components = [];

  components.push(
    new TextRun({
      children: [`Địa chỉ         	: `],
      size: 24,
      break: 1,
    }),
  );

  const words = com_address?.split(" ");
  const breakIndex = getWordIndexByCharIndex(com_address, max_letter);

  const renderTabs = () => {
    const tabs = [];
    for (let i = 1; i <= num_of_tab; i++) {
      tabs.push(new Tab());
    }
    return tabs;
  };

  if (com_address?.length >= max_letter) {
    components.push(
      new TextRun({
        children: [`${getCutName(words, 0, breakIndex - 1)}`],
        size: 24,
      }),
    );
    components.push(
      new TextRun({
        children: [...renderTabs(), `${getCutName(words, breakIndex, words.length - 1)}`],
        size: 24,
      }),
    );
  } else {
    components.push(
      new TextRun({
        children: [`${com_address}`],
        size: 24,
      }),
    );
  }

  return components;
};

const renderProductRows = (products) => {
  return products?.map((product, index) => {
    return new TableRow({
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
                  children: [`${index + 1}`],
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
            size: 46,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: [`${product?.name}`],
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
                  children: [`${product?.unit}`],
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
                  children: [`${product?.quantity.toLocaleString()}`],
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
            size: 14,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [`${product?.price_per_unit.toLocaleString()}`],
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
            size: 14,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [`${product?.total_price.toLocaleString()}`],
                  size: 24,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  });
};

module.exports = { renderComName, renderComNameOnly, renderComAddress, renderProductRows };
