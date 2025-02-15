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

const renderProductRows = (products) => {
  return products.map((product, index) => {
    return new TableRow({
      children: [
        new TableCell({
          margins: {
            top: convertInchesToTwip(0.08),
            bottom: convertInchesToTwip(0.08),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
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
            top: convertInchesToTwip(0.08),
            bottom: convertInchesToTwip(0.08),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
          },
          verticalAlign: VerticalAlign.CENTER,
          width: {
            size: 34,
            type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  children: [`${product.name}`],
                  size: 24,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          margins: {
            top: convertInchesToTwip(0.08),
            bottom: convertInchesToTwip(0.08),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
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
                  children: [`${product.unit}`],
                  size: 24,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          margins: {
            top: convertInchesToTwip(0.08),
            bottom: convertInchesToTwip(0.08),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
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
                  children: [`${product.quantity.toLocaleString()}`],
                  size: 24,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          margins: {
            top: convertInchesToTwip(0.08),
            bottom: convertInchesToTwip(0.08),
            left: convertInchesToTwip(0.08),
            right: convertInchesToTwip(0.08),
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
                  children: [``],
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
