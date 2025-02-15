import classNames from "classnames/bind";
import styles from "./HDTMContractDetail.module.scss";
import { useState } from "react";
import DetailItem from "../DetailItem/DetailItem";
import InvoiceInput from "../InvoiceInput/InvoiceInput";

const cx = classNames.bind(styles);

function HDTMContractDetail({ contractData, setContractData, onSubmit }) {
  return (
    <div className={cx("wrapper")}>
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
          lable="Duong dan file excel"
          value={contractData?.excel_file_dir}
          setValue={(value) =>
            setContractData((prev) => {
              return { ...prev, excel_file_dir: value };
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
      <div className={cx("result-container")}></div>
    </div>
  );
}

export default HDTMContractDetail;
