import classNames from "classnames/bind";
import styles from "./HDNCContractDetail.module.scss";
import { useState } from "react";
import DetailItem from "../DetailItem/DetailItem";
import InvoiceInput from "../InvoiceInput/InvoiceInput";

const cx = classNames.bind(styles);

function HDNCContractDetail({ contractData, setContractData, onSubmit }) {
  const handleAddInvoice = () => {
    setContractData((prev) => {
      console.log(prev);
      return {
        ...prev,
        invoices: [...prev?.invoices, { id: prev?.invoices[prev?.invoices.length - 1].id + 1 }],
      };
    });
  };

  const handleDeleteInvoice = (invoice_id) => {
    setContractData((prev) => {
      console.log(prev);
      return {
        ...prev,
        invoices: prev?.invoices?.filter((invoice) => invoice?.id !== invoice_id),
      };
    });
  };

  const getInvoiceCodeValue = (invoice_id) => {
    const invoice = contractData.invoices.filter((invoice) => invoice.id === invoice_id);
    if (invoice?.length > 0) {
      return invoice[0].code;
    } else {
      return undefined;
    }
  };

  const getInvoiceDateValue = (invoice_id) => {
    const invoice = contractData.invoices.filter((invoice) => invoice.id === invoice_id);
    if (invoice?.length > 0) {
      return invoice[0].date;
    } else {
      return undefined;
    }
  };

  const handleSetCodeValue = (invoice_id, value) => {
    setContractData((prev) => {
      return {
        ...prev,
        invoices: prev?.invoices?.map((invoice) => {
          if (invoice.id === invoice_id) {
            invoice.code = value;
          }
          return invoice;
        }),
      };
    });
  };

  const handleSetDateValue = (invoice_id, value) => {
    setContractData((prev) => {
      return {
        ...prev,
        invoices: prev?.invoices?.map((invoice) => {
          if (invoice.id === invoice_id) {
            invoice.date = value;
          }
          return invoice;
        }),
      };
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("add-invoices-btn")} onClick={handleAddInvoice}>
        Them HD
      </div>
      <div className={cx("container")}>
        <DetailItem
          className={cx("detail-item")}
          lable="Ma HD"
          value={contractData?.code}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, code: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Ngay"
          value={contractData?.day}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, day: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Thang"
          value={contractData?.month}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, month: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Nam"
          value={contractData?.year}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, year: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Du kien tu ngay"
          value={contractData?.begin_date}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, begin_date: value };
            })
          }
        />

        <DetailItem
          className={cx("detail-item")}
          lable="Den ngay"
          value={contractData?.end_date}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, end_date: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Thue"
          value={contractData?.tax}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, tax: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Tong tien thue"
          value={contractData?.tax_total}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, tax_total: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Tong tien truoc thue"
          value={contractData?.total_before_tax}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, total_before_tax: value };
            })
          }
        />
        <DetailItem
          className={cx("detail-item")}
          lable="Tong tien sau thue"
          value={contractData?.total_after_tax}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, total_after_tax: value };
            })
          }
        />
        {contractData?.invoices.map((invoice, index) => {
          return (
            <InvoiceInput
              key={invoice.id}
              lable={invoice.id}
              className={cx("full-width", "detail-item", "invoice-item")}
              onDelete={invoice?.id !== 1 ? () => handleDeleteInvoice(invoice.id) : undefined}
              setCodeValue={(value) => handleSetCodeValue(invoice.id, value)}
              setDateValue={(value) => handleSetDateValue(invoice.id, value)}
              code_value={getInvoiceCodeValue(invoice.id)}
              date_value={getInvoiceDateValue(invoice.id)}
            />
          );
        })}
        <DetailItem
          className={cx("full-width", "detail-item")}
          lable="Ten cong viec"
          value={contractData?.task_names}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, task_names: value };
            })
          }
        />
        <DetailItem
          className={cx("full-width", "detail-item")}
          lable="So tien bang chu"
          value={contractData?.total_price_by_words}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, total_price_by_words: value };
            })
          }
        />

        <DetailItem
          className={cx("full-width", "detail-item")}
          lable="Luu tai"
          value={contractData?.destination_dir}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, destination_dir: value };
            })
          }
        />
        <button className={cx("submit-btn")} onClick={() => onSubmit()}>
          Tao Hop Dong
        </button>
      </div>
    </div>
  );
}

export default HDNCContractDetail;
