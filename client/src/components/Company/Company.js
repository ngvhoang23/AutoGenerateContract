import classNames from "classnames/bind";
import styles from "./Company.module.scss";
import { sell_com } from "../../data";
import { useState } from "react";
import FieldItem from "../Companies/FieldItem";

const cx = classNames.bind(styles);

function Company({ data, className, small, onClick, active, header_only }) {
  const {
    name,
    lower_case_name,
    address,
    tax_code,
    account_num,
    bank_name,
    representative,
    representative_role,
    sell_location,
  } = data;
  return (
    <div
      className={cx("company-container", className, { small: small, active: active })}
      onClick={onClick}
    >
      <div className={cx("header")}>{name}</div>
      <div className={cx("body")}>
        {!header_only && (
          <>
            <FieldItem small={small} lable="Ten cong ty" content={name} />
            <FieldItem small={small} lable="Ten bang chu thuong" content={lower_case_name} />
            <FieldItem small={small} lable="Dia chi" content={address} />
            <FieldItem small={small} lable="Dia chi xuat hang" content={sell_location} />
          </>
        )}
        <FieldItem small={small} lable="MST" content={tax_code} />
        {!header_only && (
          <>
            <FieldItem small={small} lable="STK" content={account_num} />
            <FieldItem small={small} lable="Tai" content={bank_name} />
            <FieldItem small={small} lable="Nguoi dai dien" content={representative} />
            <FieldItem small={small} lable="Chuc vu" content={representative_role} />
          </>
        )}
      </div>
    </div>
  );
}

export default Company;
