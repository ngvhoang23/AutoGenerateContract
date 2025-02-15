const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const http = require("http").Server(app);
require("dotenv").config({ path: "./config.env" });
const fs = require("fs");
const fsPromises = fs.promises;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./config/db/index");
const { handleReading } = require("./generateFunctions/ReadingExcel/ReadingExcel");
const { generateHDTX } = require("./generateFunctions/HDTXTemplate/HDTX/generateHDTX");
const { generateDNTT } = require("./generateFunctions/HDTXTemplate/DNTT/generateDNTT");
const { generateTLHD } = require("./generateFunctions/HDTXTemplate/TLHD/generateTLHD");
const { handleReadingHDTX } = require("./generateFunctions/HDTXTemplate/ReadingExcel/ReadingExcel");

const { handleReadingHDMB } = require("./generateFunctions/HDMBTemplate/ReadingExcel/ReadingExcel");
const {
  generateHDMB: generateHDMB_HDMB,
} = require("./generateFunctions/HDMBTemplate/HDMB/generateHDMB");
const {
  generatePXK: generatePXK_HDMB,
} = require("./generateFunctions/HDMBTemplate/PXK/generatePXK");
const {
  generateBBGN: generateBBGN_HDMB,
} = require("./generateFunctions/HDMBTemplate/BBGN/generateBBGN");
const {
  generateDNTT: generateDNTT_HDMB,
} = require("./generateFunctions/HDMBTemplate/DNTT/generateDNTT");
const {
  generateTLHD: generateTLHD_HDMB,
} = require("./generateFunctions/HDMBTemplate/TLHD/generateTLHD");

const {
  generateHDNC: generateHDNC_HDNC,
} = require("./generateFunctions/HDNCTemplate/HDNC/generateHDNC");
const {
  generateBBNT: generateBBNT_HDNC,
} = require("./generateFunctions/HDNCTemplate/BBNT/generateBBNT");
const {
  generateDNTT: generateDNTT_HDNC,
} = require("./generateFunctions/HDNCTemplate/DNTT/generateDNTT");
const {
  generateTLHD: generateTLHD_HDNC,
} = require("./generateFunctions/HDNCTemplate/TLHD/generateTLHD");

const { handleReadingHDTM } = require("./generateFunctions/HDTMTemplate/ReadingExcel/ReadingExcel");
const {
  generateHDTM: generateHDTM_HDTM,
} = require("./generateFunctions/HDTMTemplate/HDTM/generateHDTM");
const {
  generateDNTT: generateDNTT_HDTM,
} = require("./generateFunctions/HDTMTemplate/DNTT/generateDNTT");
const {
  generateTLHD: generateTLHD_HDTM,
} = require("./generateFunctions/HDTMTemplate/TLHD/generateTLHD");

app.get("/companies", function (req, res) {
  const sql = "SELECT * FROM companies";
  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/companies/searching/:value", function (req, res) {
  const { search_value } = req.query;

  const sql = `select * from companies where name like '%${search_value || "a"}%'`;
  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.get("/companies/:com_id", function (req, res) {
  const { com_id } = req.params;

  const sql = `SELECT * FROM companies where com_id=${com_id}`;
  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete(`/companies/:com_id`, function (req, res) {
  const { com_id } = req.body;

  const sql = `delete from companies where com_id=${com_id}`;
  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put(`/companies/:com_id`, function (req, res) {
  const {
    com_id,
    name,
    lower_case_name,
    address,
    tax_code,
    account_num,
    bank_name,
    representative,
    representative_role,
    sell_location,
    short_name,
  } = req.body;

  const sql = `update companies set
              name=${name ? `'${name}'` : null},
              lower_case_name=${lower_case_name ? `'${lower_case_name}'` : null},
              address=${address ? `'${address}'` : null},
              tax_code=${tax_code ? `'${tax_code}'` : null},
              account_num=${account_num ? `'${account_num}'` : null},
              bank_name=${bank_name ? `'${bank_name}'` : null},
              representative=${representative ? `'${representative}'` : null},
              representative_role=${representative_role ? `'${representative_role}'` : null},
              sell_location=${sell_location ? `'${sell_location}'` : null},
              short_name=${short_name ? `'${short_name}'` : null}
              where com_id=${com_id}`;

  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post(`/companies`, function (req, res) {
  const {
    com_id,
    name,
    lower_case_name,
    address,
    tax_code,
    account_num,
    bank_name,
    representative,
    representative_role,
    sell_location,
    short_name,
  } = req.body;

  const sql = `
  insert into companies(name, lower_case_name, address, tax_code, account_num, bank_name, representative, representative_role, sell_location, short_name) 
  values(
    ${name ? `'${name}'` : null},
    ${lower_case_name ? `'${lower_case_name}'` : null},
    ${address ? `'${address}'` : null},
    ${tax_code ? `'${tax_code}'` : null},
    ${account_num ? `'${account_num}'` : null},
    ${bank_name ? `'${bank_name}'` : null},
    ${representative ? `'${representative}'` : null},
    ${representative_role ? `'${representative_role}'` : null},
    ${sell_location ? `'${sell_location}'` : null},
    ${short_name ? `'${short_name}'` : null}
    )`;

  console.log(sql);

  const promise = () => {
    return new Promise((resolve, reject) => {
      db.query(sql, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

  promise()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post(`/generate-hdmb-contracts`, (req, res) => {
  const { sell_com, buy_com, contract_info } = req.body;

  let product_info = {
    products: [],
  };

  const folder_name = String.raw`${
    contract_info.destination_dir
  }\HĐMB ${sell_com.short_name?.toUpperCase()} - ${buy_com.short_name?.toUpperCase()}`;

  handleReadingHDMB(contract_info?.excel_file_dir)
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (invoices.length === 0) {
          reject({
            message: "There is no data",
            status: 400,
          });
        } else {
          resolve(invoices);
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(folder_name)) {
          fsPromises
            .mkdir(folder_name)
            .then((result) => {
              resolve(invoices);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject({
            message: "path cannot found",
            status: 400,
          });
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        invoices?.forEach((invoice) => {
          invoice.products.forEach((product) => {
            product_info.products.push(product);
          });
          const date = invoice.date.split("/");
          invoice.day = date[0];
          invoice.month = date[1];
          invoice.year = date[2];
        });

        resolve(
          Promise.all([
            generateHDMB_HDMB(
              sell_com,
              buy_com,
              product_info,
              contract_info,
              String.raw`${folder_name}\Hợp Đồng`,
            )
              .then((result) => {
                return {
                  name: "HĐ MUA BÁN",
                  status: 200,
                };
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject({
                  message: `Could not generate HĐ MUA BÁN`,
                  status: 400,
                });
              }),
            ...invoices.map((invoice) => {
              return generatePXK_HDMB(
                sell_com,
                buy_com,
                contract_info,
                String.raw`${folder_name}\Phiếu Xuất Kho ${invoice.code}`,
                invoice,
              )
                .then((result) => {
                  return {
                    name: `PHIẾU XUẤT KHO HĐ${invoice.code}`,
                    status: 200,
                  };
                })
                .catch((err) => {
                  return Promise.reject({
                    message: `Could not generate PHIẾU XUẤT KHO HĐ${invoice.code}`,
                    status: 400,
                  });
                });
            }),
            ...invoices.map((invoice) => {
              return generateBBGN_HDMB(
                sell_com,
                buy_com,
                String.raw`${folder_name}\Biên Bản Giao Nhận ${invoice.code}`,
                invoice,
              )
                .then((result) => {
                  return {
                    name: `BIÊN BẢN GIAO NHẬN HĐ${invoice.code}`,
                    status: 200,
                  };
                })
                .catch((err) => {
                  return Promise.reject({
                    message: `Could not generate BIÊN BẢN GIAO NHẬN HĐ${invoice.code}`,
                    status: 400,
                  });
                });
            }),
            generateDNTT_HDMB(
              sell_com,
              buy_com,
              contract_info,
              invoices,
              String.raw`${folder_name}\ĐỀ NGHỊ THANH TOÁN`,
            )
              .then((result) => {
                return {
                  name: `ĐỀ NGHỊ THANH TOÁN`,
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate ĐỀ NGHỊ THANH TOÁN`,
                  status: 400,
                });
              }),
            generateTLHD_HDMB(
              sell_com,
              buy_com,
              contract_info,
              String.raw`${folder_name}\THANH LÝ HỢP ĐỒNG`,
            )
              .then((result) => {
                return {
                  name: "THANH LÝ HỢP ĐỒNG",
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate THANH LÝ HỢP ĐỒNG`,
                  status: 400,
                });
              }),
          ]),
        );
      });
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post(`/generate-hdtx-contracts`, (req, res) => {
  const { sell_com, buy_com, contract_info } = req.body;

  let product_info = {
    products: [],
  };

  const folder_name = String.raw`${
    contract_info.destination_dir
  }\HĐTX ${sell_com.short_name?.toUpperCase()} - ${buy_com.short_name?.toUpperCase()}`;

  handleReadingHDTX(contract_info?.excel_file_dir)
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (invoices.length === 0) {
          reject({
            message: "There is no data",
            status: 400,
          });
        } else {
          resolve(invoices);
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (!fs.existsSync(folder_name)) {
          fsPromises
            .mkdir(folder_name)
            .then((result) => {
              resolve(invoices);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject({
            message: "path cannot found",
            status: 400,
          });
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        invoices?.forEach((invoice) => {
          invoice.products.forEach((product) => {
            product_info.products.push({
              ...product,
              price_per_unit: product.price_per_unit?.toLocaleString(),
              total_price: product.total_price?.toLocaleString(),
              quantity: product.quantity?.toLocaleString(),
            });
          });
          const date = invoice.date.split("/");
          invoice.day = date[0];
          invoice.month = date[1];
          invoice.year = date[2];
        });

        resolve(
          Promise.all([
            generateHDTX(
              sell_com,
              buy_com,
              product_info,
              contract_info,
              String.raw`${folder_name}\HĐ THUÊ XE`,
            )
              .then((result) => {
                return {
                  name: "HĐ THUÊ XE",
                  status: 200,
                };
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject({
                  message: `Could not generate HĐ THUÊ XE`,
                  status: 400,
                });
              }),
            ...invoices.map((invoice) => {
              return generateDNTT(
                sell_com,
                buy_com,
                contract_info,
                invoice,
                String.raw`${folder_name}\ĐỀ NGHỊ THANH TOÁN HĐ${invoice.code}`,
              )
                .then((result) => {
                  return {
                    name: `ĐỀ NGHỊ THANH TOÁN HĐ${invoice.code}`,
                    status: 200,
                  };
                })
                .catch((err) => {
                  return Promise.reject({
                    message: `Could not generate ĐỀ NGHỊ THANH TOÁN HĐ${invoice.code}`,
                    status: 400,
                  });
                });
            }),
            generateTLHD(
              sell_com,
              buy_com,
              product_info,
              contract_info,
              String.raw`${folder_name}\THANH LÝ HỢP ĐỒNG`,
            )
              .then((result) => {
                return {
                  name: "THANH LÝ HỢP ĐỒNG",
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate THANH LÝ HỢP ĐỒNG`,
                  status: 400,
                });
              }),
          ]),
        );
      });
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post(`/generate-hdnc-contracts`, (req, res) => {
  const { sell_com, buy_com, contract_info } = req.body;
  const { invoices } = contract_info;

  const createFile = () => {
    return new Promise((resolve, reject) => {
      if (
        !fs.existsSync(
          String.raw`${
            contract_info.destination_dir
          }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}`,
        )
      ) {
        fsPromises
          .mkdir(
            String.raw`${
              contract_info.destination_dir
            }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}`,
          )
          .then((result) => {
            resolve({ message: "Created Folder", status: 200 });
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject({
          message: "path cannot found",
          status: 400,
        });
      }
    });
  };

  createFile()
    .then((result) => {
      return new Promise((resolve, reject) => {
        invoices?.forEach((invoice) => {
          const date = invoice.date.split("/");
          invoice.day = date[0];
          invoice.month = date[1];
          invoice.year = date[2];
        });

        resolve(
          Promise.all([
            generateHDNC_HDNC(
              sell_com,
              buy_com,
              contract_info,
              String.raw`${
                contract_info.destination_dir
              }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\HỢP ĐỒNG`,
            )
              .then((result) => {
                return {
                  name: "HĐ MUA BÁN",
                  status: 200,
                };
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject({
                  message: `Could not generate HĐ MUA BÁN`,
                  status: 400,
                });
              }),
            generateBBNT_HDNC(
              sell_com,
              buy_com,
              contract_info,
              String.raw`${
                contract_info.destination_dir
              }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\BIÊN BẢN NGHIỆM THU`,
            )
              .then((result) => {
                return {
                  name: `BIÊN BẢN NGHIỆM THU`,
                  status: 200,
                };
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject({
                  message: `Could not generate BIÊN BẢN NGHIỆM THU`,
                  status: 400,
                });
              }),
            generateDNTT_HDNC(
              sell_com,
              buy_com,
              contract_info,
              invoices,
              String.raw`${
                contract_info.destination_dir
              }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\ĐỀ NGHỊ THANH TOÁN`,
            )
              .then((result) => {
                return {
                  name: `ĐỀ NGHỊ THANH TOÁN`,
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate ĐỀ NGHỊ THANH TOÁN`,
                  status: 400,
                });
              }),
            generateTLHD_HDNC(
              sell_com,
              buy_com,
              contract_info,
              String.raw`${
                contract_info.destination_dir
              }\HĐNC ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\THANH LÝ HỢP ĐỒNG`,
            )
              .then((result) => {
                return {
                  name: "THANH LÝ HỢP ĐỒNG",
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate THANH LÝ HỢP ĐỒNG`,
                  status: 400,
                });
              }),
          ]),
        );
      });
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post(`/generate-hdtm-contracts`, (req, res) => {
  const { sell_com, buy_com, contract_info } = req.body;
  let product_info = {
    products: [],
  };

  handleReadingHDTM(contract_info?.excel_file_dir)
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (invoices.length === 0) {
          reject({
            message: "There is no data",
            status: 400,
          });
        } else {
          resolve(invoices);
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        if (
          !fs.existsSync(
            String.raw`${
              contract_info.destination_dir
            }\HĐTM ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}`,
          )
        ) {
          fsPromises
            .mkdir(
              String.raw`${
                contract_info.destination_dir
              }\HĐTM ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}`,
            )
            .then((result) => {
              resolve(invoices);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject({
            message: "path cannot found",
            status: 400,
          });
        }
      });
    })
    .then((invoices) => {
      return new Promise((resolve, reject) => {
        invoices?.forEach((invoice) => {
          invoice.products.forEach((product) => {
            product_info.products.push(product);
          });
          const date = invoice.date.split("/");
          invoice.day = date[0];
          invoice.month = date[1];
          invoice.year = date[2];
        });

        resolve(
          Promise.all([
            generateHDTM_HDTM(
              sell_com,
              buy_com,
              product_info,
              contract_info,
              String.raw`${
                contract_info.destination_dir
              }\HĐTM ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\Hợp Đồng`,
            )
              .then((result) => {
                return {
                  name: "HĐ DỊCH VỤ",
                  status: 200,
                };
              })
              .catch((err) => {
                console.log(err);
                return Promise.reject({
                  message: `Could not generate HĐ DỊCH VỤ`,
                  status: 400,
                });
              }),
            generateDNTT_HDTM(
              sell_com,
              buy_com,
              contract_info,
              invoices,
              String.raw`${
                contract_info.destination_dir
              }\HĐTM ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\ĐỀ NGHỊ THANH TOÁN`,
            )
              .then((result) => {
                return {
                  name: `ĐỀ NGHỊ THANH TOÁN`,
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate ĐỀ NGHỊ THANH TOÁN`,
                  status: 400,
                });
              }),
            generateTLHD_HDTM(
              sell_com,
              buy_com,
              contract_info,
              String.raw`${
                contract_info.destination_dir
              }\HĐTM ${sell_com.short_name.toUpperCase()} - ${buy_com.short_name.toUpperCase()}\THANH LÝ HỢP ĐỒNG`,
            )
              .then((result) => {
                return {
                  name: "THANH LÝ HỢP ĐỒNG",
                  status: 200,
                };
              })
              .catch((err) => {
                return Promise.reject({
                  message: `Could not generate THANH LÝ HỢP ĐỒNG`,
                  status: 400,
                });
              }),
          ]),
        );
      });
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
