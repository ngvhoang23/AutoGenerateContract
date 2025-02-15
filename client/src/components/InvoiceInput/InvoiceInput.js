import classNames from "classnames/bind";
import styles from "./InvoiceInput.module.scss";

const cx = classNames.bind(styles);

function InvoiceInput({
  lable,
  code_value,
  setCodeValue,
  date_value,
  setDateValue,
  className,
  onDelete,
}) {
  return (
    <div className={cx("wrapper", className)}>
      {onDelete && (
        <div className={cx("delete-btn")} onClick={onDelete}>
          X
        </div>
      )}
      <div className={cx("lable")}>{lable}</div>
      <div className={cx("code-wrapper")}>
        <span className={cx("input-lable")}>Ma HD</span>
        <input
          className={cx("input-detail")}
          value={code_value || ""}
          spellCheck={false}
          onChange={(e) => {
            setCodeValue(e.target.value);
          }}
        />
      </div>
      <div className={cx("date-wrapper")}>
        <span className={cx("input-lable")}>Ngay/Thang/Nam</span>
        <input
          className={cx("input-detail")}
          value={date_value || ""}
          spellCheck={false}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default InvoiceInput;
