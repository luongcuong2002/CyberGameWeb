import React from "react";
import styles from "./account_management.module.scss";
import { ReactComponent as IconArrowLeft } from "../../../assets/icons/ic_arrow_left.svg";
import { ReactComponent as IconArrowRight } from "../../../assets/icons/ic_arrow_right.svg";

const AccountManagement = () => {

  const [currentPage, setCurrentPage] = React.useState(1);

  const onNextPage = () => {
    if (currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const data = {
    header: [
      {
        name: "Tên đăng nhập"
      },
      {
        name: "Tên công khai"
      },
      {
        name: "Số dư"
      },
      {
        name: "Tình trạng"
      },
    ],
    rows: [
      {
        userId: 1,
        userName: "John Doe",
        userPublicName: "John",
        amount: 12345,
        disabledSession: "Active",
      },
      {
        userId: 1,
        userName: "John Doe",
        userPublicName: "John",
        amount: 12345,
        disabledSession: "Active",
      },
      {
        userId: 1,
        userName: "John Doe",
        userPublicName: "John",
        amount: 12345,
        disabledSession: "Active",
      },
    ],
    totalPages: 15,
    currentPage: 2
  };

  return (
    <div id={styles.root}>
      <h1>Quản lý tài khoản</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {data.header.map((item, index) => {
                return <th key={index}>{item.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.userPublicName}</td>
                  <td>{item.amount}</td>
                  <td>{item.disabledSession}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <IconArrowLeft
          fill={currentPage > 1 ? "#509BF5" : "#CDCDCD"}
          className={styles.paginationButton}
          onClick={onPrevPage}
        />
        <span>
          {currentPage} / {data.totalPages}
        </span>
        <IconArrowRight
          fill={currentPage < data.totalPages ? "#509BF5" : "#CDCDCD"}
          className={styles.paginationButton}
          onClick={onNextPage}
        />
      </div>
    </div>
  );
}

export default AccountManagement;