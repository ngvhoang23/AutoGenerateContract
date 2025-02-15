import classNames from "classnames/bind";
import styles from "./Companies.module.scss";
import Company from "../Company/Company";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buy_com, sell_com } from "../../data";
import axios from "axios";
import PickingCompanyBox from "./PickingCompanyBox/PickingCompanyBox";
import SelectComModal from "../SelectComModal/SelectComModal";

const cx = classNames.bind(styles);

function Companies({ sellCom, setSellCom, buyCom, setBuyCom }) {
  const [isOpenSelectModal, setIsOpenSelectModal] = useState(false);

  const onSelect = (com) => {
    if (isOpenSelectModal === "selling") {
      setSellCom(com);
    } else if (isOpenSelectModal === "buying") {
      setBuyCom(com);
    }
  };

  const onRemoveSellCom = () => {
    setSellCom();
  };

  const onRemoveBuyCom = () => {
    setBuyCom();
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("sell-com")}>
            {sellCom && (
              <div className={cx("clear-btn")} onClick={onRemoveSellCom}>
                X
              </div>
            )}
            {sellCom ? (
              <Company data={sellCom} />
            ) : (
              <PickingCompanyBox
                com_type="selling"
                onClick={() => setIsOpenSelectModal("selling")}
              />
            )}
          </div>
          <div className={cx("buy-com")}>
            {buyCom && (
              <div className={cx("clear-btn")} onClick={onRemoveBuyCom}>
                X
              </div>
            )}
            {buyCom ? (
              <Company data={buyCom} />
            ) : (
              <PickingCompanyBox com_type="buying" onClick={() => setIsOpenSelectModal("buying")} />
            )}
          </div>
        </div>
      </div>
      {isOpenSelectModal && (
        <SelectComModal
          className={cx("select-com-modal")}
          onClose={() => setIsOpenSelectModal(false)}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

export default Companies;
