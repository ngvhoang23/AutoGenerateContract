import classNames from "classnames/bind";
import styles from "./EditableFieldItem.module.scss";

const cx = classNames.bind(styles);

function EditableFieldItem({ lable, value, setValue, className }) {
  return (
    <div className={cx("wrapper", className)}>
      <h3 className={cx("lable")}>{lable}:</h3>
      <input
        className={cx("content")}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default EditableFieldItem;
