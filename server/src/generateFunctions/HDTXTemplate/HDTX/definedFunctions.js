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
            size: 10,
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
            size: 25,
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
            size: 10,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [`${product?.quantity}`],
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
                  children: [`${product?.price_per_unit}`],
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
                  children: [`${product?.total_price}`],
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

module.exports = { renderProductRows };
