import classNames from "classnames/bind";
import styles from "./HDNC.module.scss";
import Companies from "../../components/Companies/Companies";
import HDMBContractDetail from "../../components/HDMBContractDetail/HDMBContractDetail";
import { useContext, useEffect, useState } from "react";
import { CurrentPageContext } from "../../Context/CurrentPageContext";
import axios from "axios";
import HDNCContractDetail from "../../components/HDNCContractDetail/HDNCContractDetail";
import { getFirstLetter } from "../../definedFunctions";

const cx = classNames.bind(styles);

function HDNC() {
  const currentPageContext = useContext(CurrentPageContext);
  const currentPage = currentPageContext.currentPage;
  const setCurrentPage = currentPageContext.setCurrentPage;

  const [sellCom, setSellCom] = useState();
  const [buyCom, setBuyCom] = useState();
  const [contractData, setContractData] = useState({
    code: undefined,
    day: undefined,
    month: undefined,
    year: new Date().getFullYear()?.toString(),
    total_price_by_words: undefined,
    total_before_tax: undefined,
    tax_total: undefined,
    tax: "10%",
    total_after_tax: undefined,
    invoices: [{ id: 1 }],
    begin_date: undefined,
    end_date: undefined,
  });

  const [invoices, setInvoices] = useState();

  useEffect(() => {
    setCurrentPage("hdnc");
  }, []);

  useEffect(() => {
    setContractData((prev) => {
      return {
        ...prev,
        code: `01/TKNC-${getFirstLetter(sellCom?.short_name)}-${getFirstLetter(
          buyCom?.short_name,
        )}`,
      };
    });
  }, [sellCom, buyCom]);

  const handleSubmit = () => {
    contractData?.invoices?.forEach((invoice) => {
      invoice.code = invoice.code?.trim();
      invoice.date = invoice.date?.trim();
    });

    const messages = [];

    if (!sellCom) {
      messages.push("Cong ty ban/cho thue");
    }
    if (!buyCom) {
      messages.push("Cong ty mua/thue");
    }
    if (!contractData?.code) {
      messages.push("Ma HD");
    }
    if (!contractData?.tax) {
      messages.push("Thue");
    }

    if (!contractData?.total_before_tax) {
      messages.push("Tong tien truoc thue");
    }

    if (!contractData?.total_after_tax) {
      messages.push("Tong tien sau thue");
    }

    if (!contractData?.tax_total) {
      messages.push("Tong tien thue");
    }

    if (!contractData?.destination_dir) {
      alert("Chưa có đường dẫn lưu file, không thể tạo hợp đồng");
      return;
    }

    if (messages.length > 0) {
      if (
        window.confirm(`Cac truong ${messages.join(", ")} bi trong, Ban co muon tiep tuc khong`)
      ) {
        const contract_data = {
          ...contractData,
          code: contractData?.code?.trim(),
          day: contractData?.day?.trim(),
          month: contractData?.month?.trim(),
          year: contractData?.year?.trim(),
          total_price_by_words: contractData?.total_price_by_words?.trim(),
          total_before_tax: contractData?.total_before_tax?.trim(),
          tax_total: contractData?.tax_total?.trim(),
          tax: contractData?.tax?.trim(),
          total_after_tax: contractData?.total_after_tax?.trim(),
          excel_file_dir: contractData?.excel_file_dir?.trim(),
          destination_dir: contractData?.destination_dir?.trim(),
          begin_date: contractData?.begin_date?.trim(),
          end_date: contractData?.end_date?.trim(),
          task_name: contractData?.task_name?.trim(),
        };
        axios
          .post(`http://localhost:5000/generate-hdnc-contracts`, {
            sell_com: sellCom,
            buy_com: buyCom,
            contract_info: contract_data,
          })
          .then((result) => {
            console.log(result);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("Thing was not saved to the database.");
      }
    } else {
      const contract_data = {
        ...contractData,
        code: contractData?.code?.trim(),
        day: contractData?.day?.trim(),
        month: contractData?.month?.trim(),
        year: contractData?.year?.trim(),
        total_price_by_words: contractData?.total_price_by_words?.trim(),
        total_before_tax: contractData?.total_before_tax?.trim(),
        tax_total: contractData?.tax_total?.trim(),
        tax: contractData?.tax?.trim(),
        total_after_tax: contractData?.total_after_tax?.trim(),
        excel_file_dir: contractData?.excel_file_dir?.trim(),
        destination_dir: contractData?.destination_dir?.trim(),
        begin_date: contractData?.begin_date?.trim(),
        end_date: contractData?.end_date?.trim(),
        task_name: contractData?.task_name?.trim(),
      };
      axios
        .post(`http://localhost:5000/generate-hdnc-contracts`, {
          sell_com: sellCom,
          buy_com: buyCom,
          contract_info: contract_data,
        })
        .then((result) => {
          console.log(result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("companies-side")}>
          <Companies
            sellCom={sellCom}
            setSellCom={setSellCom}
            buyCom={buyCom}
            setBuyCom={setBuyCom}
          />
        </div>
        <div className={cx("contract-info")}>
          <HDNCContractDetail
            contractData={contractData}
            setContractData={setContractData}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default HDNC;
