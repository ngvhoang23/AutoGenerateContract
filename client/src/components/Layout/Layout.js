import classNames from "classnames/bind";
import styles from "./Layout.module.scss";
import Companies from "../Companies/Companies";
import ContractDetail from "../HDMBContractDetail/HDMBContractDetail";
import { useContext, useEffect } from "react";
import { CurrentPageContext } from "../../Context/CurrentPageContext";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Layout({ children }) {
  const navigate = useNavigate();

  const page_code = useParams();

  const currentPageContext = useContext(CurrentPageContext);
  const currentPage = currentPageContext.currentPage;
  const setCurrentPage = currentPageContext.setCurrentPage;

  const renderHeader = () => {
    switch (currentPage) {
      case "hdmb":
        return "Hop Dong Mua Ban";
      case "hdtm":
        return "Hop Dong Dich Vu";
      case "hdnc":
        return "Hop Dong Nhan Cong";
      case "hdtx":
        return "Hop Dong Thue Xe";
      default:
        break;
    }
  };

  const openPage = (page_code) => {
    setCurrentPage(page_code);
    navigate(`/${page_code}`);
  };

  const openQLCT = () => {
    setCurrentPage("qlct");
    navigate(`/qlct`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("contract-name")}>{renderHeader()}</div>
        <div className={cx("actions")}>
          <button
            className={cx("action-btn", { active: currentPage === "hdmb" })}
            onClick={() => openPage("hdmb")}
          >
            Tao HDMB
          </button>
          <button
            className={cx("action-btn", { active: currentPage === "hdtm" })}
            onClick={() => openPage("hdtm")}
          >
            Tao HDDV
          </button>
          <button
            className={cx("action-btn", { active: currentPage === "hdnc" })}
            onClick={() => openPage("hdnc")}
          >
            Tao HDNC
          </button>

          <button
            className={cx("action-btn", { active: currentPage === "hdtx" })}
            onClick={() => openPage("hdtx")}
          >
            Tao HDTX
          </button>

          <button
            className={cx("action-btn", { active: currentPage === "qlct" })}
            onClick={() => openQLCT()}
          >
            Quan Ly Cong Ty
          </button>
        </div>
      </div>
      <div className={cx("container")}>{children}</div>
    </div>
  );
}

export default Layout;
