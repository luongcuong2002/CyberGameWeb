import React, { useState, useRef } from "react";
import styles from "./account_management.module.scss";
import PagingTable from "../../../components/PagingTable";
import MenuPopup from "../../../components/MenuPopup";
import { IoIosSearch, IoMdPersonAdd } from "react-icons/io";

const AccountManagement = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => {
    if (currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const data = {
    header: [
      {
        name: "ID",
        hidden: true,
      },
      {
        name: "Tên đăng nhập",
      },
      {
        name: "Tên công khai",
      },
      {
        name: "Số dư",
      },
      {
        name: "Tình trạng",
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
    ],
    totalPages: 15,
    currentPage: 2,
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(value)) {
      setSearchTerm(event.target.value.toUpperCase());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }

    if (isLoadingData) {
      return;
    }

    setIsLoadingData(true);
    setTimeout(() => {
      setIsLoadingData(false);
    }, 2000);
  };

  return (
    <div id={styles.root}>
      <h1>Quản lý tài khoản</h1>
      <div className={styles.divider} />
      <span className={styles.actions}>
        <form onSubmit={handleSubmit} className={styles.searchBar}>
          <input
            ref={inputRef}
            className={styles.searchInput}
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleChange}
            disabled={isLoadingData}
          />
          <div className={styles.searchIconBackground} onClick={handleSubmit}>
            <IoIosSearch size={20} />
          </div>
        </form>
        <div className={styles.addUserIconBackground}>
          <IoMdPersonAdd size={20} />
        </div>
      </span>
      <div id={styles.tableStyle}>
        <PagingTable
          data={data}
          isLoading={isLoadingData}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          renderPopup={(selectedItem, handleClosePopup) => {

            const menuButtons = [
              {
                icon: null,
                text: "Nạp tiền",
                onClick: () => {
                  handleClosePopup();
                },
              },
              {
                icon: null,
                text: "Đổi mật khẩu",
                onClick: () => {
                  handleClosePopup();
                },
              },
              {
                icon: null,
                text: "Xem thông tin",
                onClick: () => {
                  handleClosePopup();
                },
              },
              {
                icon: null,
                text: "Khóa tài khoản",
                onClick: () => {
                  handleClosePopup();
                },
              },
              {
                icon: null,
                text: "Xoá tài khoản",
                onClick: () => {
                  handleClosePopup();
                },
              },
              {
                icon: null,
                text: "Lịch sử giao dịch",
                onClick: () => {
                  handleClosePopup();
                },
              },
            ]

            return (
              <MenuPopup menuButtons={menuButtons} />
            );
          }}
        />
      </div>
    </div>
  );
};

export default AccountManagement;
