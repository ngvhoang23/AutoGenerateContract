import classNames from "classnames/bind";
import styles from "./DetailItem.module.scss";

const cx = classNames.bind(styles);

function DetailItem({ lable, value, setValue, className }) {
  return (
    <div className={cx("detail-wrapper", className)}>
      <div className={cx("lable")}>{lable}</div>
      <input
        className={cx("input-detail")}
        value={value}
        spellCheck={false}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default DetailItem;
