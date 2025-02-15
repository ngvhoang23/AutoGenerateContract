import classNames from "classnames/bind";
import styles from "./Companies.module.scss";

const cx = classNames.bind(styles);

function FieldItem({ lable, content, small }) {
  return (
    <div className={cx("field-wrapper", { small: small })}>
      <h3 className={cx("field-lable")}>{lable}:</h3>
      <p className={cx("field-content")}>{content}</p>
    </div>
  );
}

export default FieldItem;
