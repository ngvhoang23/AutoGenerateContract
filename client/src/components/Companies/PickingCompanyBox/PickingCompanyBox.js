import classNames from "classnames/bind";
import styles from "./PickingCompanyBox.module.scss";
import { useEffect, useRef, useState } from "react";
import SelectComModal from "../../SelectComModal/SelectComModal";

const cx = classNames.bind(styles);

function PickingCompanyBox({ className, onClick, com_type }) {
  useEffect(() => {}, []);

  const renderInputTitle = () => {
    if (com_type === "selling") {
      return "Chon cong ty ban";
    }
    if (com_type === "buying") {
      return "Chon cong ty mua";
    }
  };

  return (
    <div className={cx("wrapper", className)} onClick={onClick}>
      <h3 className={cx("title")}>{renderInputTitle()}</h3>
    </div>
  );
}

export default PickingCompanyBox;
