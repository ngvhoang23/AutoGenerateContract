import classNames from "classnames/bind";
import styles from "./SelectComModal.module.scss";
import { useEffect, useState } from "react";
import Company from "../Company/Company";
import axios from "axios";

const cx = classNames.bind(styles);

function SelectComModal({ className, onClose, onSelect }) {
  const [companies, setCompanies] = useState();
  const [selectedCom, setSelectedCom] = useState();

  const fetchCompanies = async () => {
    axios
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

  const handleSubmit = () => {
    onSelect(selectedCom);
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

  const renderCompanies = () => {
    return companies?.map((company, ind) => {
      return (
        <Company
          header_only
          active={selectedCom?.tax_code === company.tax_code}
          small
          key={company.tax_code}
          className={cx("company-item")}
          data={company}
          onClick={() => setSelectedCom(company)}
        />
      );
    });
  };

  return (
    <div className={cx("wrapper", className)} onClick={onClose}>
      <div
        className={cx("container")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={cx("header")}>Chon Cong Ty</div>
        <div className={cx("input-bar")}>
          <input
            className={cx("search-input")}
            placeholder="Tìm Công Ty..."
            spellCheck={false}
            onChange={(e) => handleSearchCom(e.target.value)}
          />
        </div>
        <div className={cx("body")}>{renderCompanies()}</div>
        <button
          className={cx("submit-btn")}
          onClick={() => {
            handleSubmit();
            onClose();
          }}
        >
          Chon cong ty
        </button>
      </div>
    </div>
  );
}

export default SelectComModal;
