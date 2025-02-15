import classNames from "classnames/bind";
import styles from "./AddCompanyModal.module.scss";
import EditableFieldItem from "../EditableFieldItem/EditableFieldItem";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function AddCompanyModal({ onClose, className, onSubmit }) {
  const [comInfo, setComInfo] = useState({ id: 123 });

  return (
    <div className={cx("wrapper", className)} onClick={onClose}>
      <div className={cx("container")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("header")}>Them Cong Ty</div>
        <div className={cx("body")}>
          <EditableFieldItem
            className={cx("field-item")}
            lable="Ten cong ty"
            value={comInfo?.name || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, name: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Ten bang chu thuong"
            value={comInfo?.lower_case_name || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, lower_case_name: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Ten ngan gon"
            value={comInfo?.short_name || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, short_name: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Dia chi"
            value={comInfo?.address || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, address: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Dia chi xuat hang"
            value={comInfo?.sell_location || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, sell_location: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="MST"
            value={comInfo?.tax_code || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, tax_code: value, id: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="STK"
            value={comInfo?.account_num || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, account_num: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Tai"
            value={comInfo?.bank_name || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, bank_name: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Nguoi dai dien"
            value={comInfo?.representative || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, representative: value };
              })
            }
          />
          <EditableFieldItem
            className={cx("field-item")}
            lable="Chuc vu"
            value={comInfo?.representative_role || ""}
            setValue={(value) =>
              setComInfo((prev) => {
                return { ...prev, representative_role: value };
              })
            }
          />
        </div>
        <button className={cx("submit-btn")} onClick={() => onSubmit(comInfo)}>
          Them Cong Ty
        </button>
      </div>
    </div>
  );
}

export default AddCompanyModal;
