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

const renderInvoices = (invoices) => {
  return invoices?.map((invoice) => {
    return new Paragraph({
      spacing: {
        line: 280,
        after: 120,
      },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          children: [
            `- Căn cứ hóa đơn GTGT số: ${invoice?.code} ngày ${invoice?.day} tháng ${invoice?.month} năm ${invoice?.year}`,
          ],
          italics: true,
          size: 24,
        }),
      ],
    });
  });
};

module.exports = { renderInvoices };
