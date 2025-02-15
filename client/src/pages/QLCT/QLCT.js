import classNames from "classnames/bind";
import styles from "./QLCT.module.scss";
import Company from "../../components/Company/Company";
import { buy_com, sell_com } from "../../data";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddCompanyModal from "../../components/AddCompanyModal/AddCompanyModal";
import EditCompanyModal from "../../components/EditCompanyModal/EditCompanyModal";
import { CurrentPageContext } from "../../Context/CurrentPageContext";

const cx = classNames.bind(styles);

function QLCT() {
  const [isOpenAddComModal, setIsOpenAddComModal] = useState(false);
  const [isOpenEditComModal, setIsOpenEditComModal] = useState(false);
  const [companies, setCompanies] = useState();
  const [selectedCom, setSelectedCom] = useState();

  const currentPageContext = useContext(CurrentPageContext);
  const currentPage = currentPageContext.currentPage;
  const setCurrentPage = currentPageContext.setCurrentPage;

  useEffect(() => {
    setCurrentPage("qlct");
  }, []);

  const fetchCompanies = async () => {
    return axios
      .get(`http://localhost:5000/companies`)
      .then(function (response) {
        setCompanies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const renderCompanies = () => {
    return companies?.map((company, ind) => {
      return (
        <Company
          key={company.com_id}
          active={selectedCom?.com_id === company.com_id}
          small
          className={cx("company-item")}
          data={company}
          onClick={() => setSelectedCom(company)}
        />
      );
    });
  };

  const deleteCom = async (com_id) => {
    if (!com_id) {
      return;
    }

    const config = {
      data: {
        com_id: com_id,
      },
    };

    axios
      .delete(`http://localhost:5000/companies/${com_id}`, config)
      .then((result) => {
        return fetchCompanies();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCom = async (comInfo) => {
    if (!comInfo) {
      return;
    }
    const data = {
      name: comInfo?.name?.trim(),
      lower_case_name: comInfo?.lower_case_name?.trim(),
      short_name: comInfo?.short_name?.trim(),
      address: comInfo?.address?.trim(),
      sell_location: comInfo?.sell_location?.trim(),
      tax_code: comInfo?.tax_code?.trim(),
      account_num: comInfo?.account_num?.trim(),
      bank_name: comInfo?.bank_name?.trim(),
      representative: comInfo?.representative?.trim(),
      representative_role: comInfo?.representative_role?.trim(),
    };
    axios
      .post("http://localhost:5000/companies", data)
      .then((result) => {
        setIsOpenAddComModal(false);
        return fetchCompanies();
      })
      .then((result) => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEditCom = (comInfo) => {
    console.log(comInfo);
    if (!comInfo?.com_id) {
      return;
    }
    const data = {
      ...comInfo,
      name: comInfo?.name?.trim(),
      lower_case_name: comInfo?.lower_case_name?.trim(),
      short_name: comInfo?.short_name?.trim(),
      address: comInfo?.address?.trim(),
      sell_location: comInfo?.sell_location?.trim(),
      tax_code: comInfo?.tax_code?.trim(),
      account_num: comInfo?.account_num?.trim(),
      bank_name: comInfo?.bank_name?.trim(),
      representative: comInfo?.representative?.trim(),
      representative_role: comInfo?.representative_role?.trim(),
    };
    axios
      .put(`http://localhost:5000/companies/${comInfo?.com_id}`, data)
      .then((result) => {
        setIsOpenEditComModal(false);
        return fetchCompanies();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchCom = (value) => {
    const params = {
      search_value: value,
    };
    if (value.trim()) {
      axios
        .get(`http://localhost:5000/companies/searching/${value}`, { params })
        .then(function (response) {
          setCompanies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("actions")}>
        <div className={cx("input-bar")}>
          <input
            className={cx("search-input")}
            placeholder="Tìm Công Ty..."
            spellCheck={false}
            onChange={(e) => handleSearchCom(e.target.value)}
          />
        </div>
        <div className={cx("preview")}>
          {selectedCom && <Company className={cx("com-preview")} small data={selectedCom} />}
        </div>
        <div className={cx("manage-btns")}>
          <button className={cx("manage-com-btn")} onClick={() => setIsOpenAddComModal(true)}>
            Them Cong Ty
          </button>
          <button
            className={cx("manage-com-btn", "edit-btn")}
            onClick={() => setIsOpenEditComModal(true)}
          >
            Sua Cong Ty
          </button>
          <button
            className={cx("manage-com-btn", "remove-btn")}
            onClick={() => deleteCom(selectedCom.com_id)}
          >
            Xoa Cong Ty
          </button>
        </div>
      </div>
      <div className={cx("container")}>{renderCompanies()}</div>
      {isOpenAddComModal && (
        <AddCompanyModal
          className={cx("add-com-modal")}
          onClose={() => setIsOpenAddComModal(false)}
          onSubmit={handleAddCom}
        />
      )}
      {isOpenEditComModal && (
        <EditCompanyModal
          com_id={selectedCom.com_id}
          className={cx("add-com-modal")}
          onClose={() => setIsOpenEditComModal(false)}
          onSubmit={handleEditCom}
        />
      )}
    </div>
  );
}

export default QLCT;
