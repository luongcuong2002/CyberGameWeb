import React, { useState, useRef } from "react";
import styles from "./voucher_management.module.scss";
import PagingTable from "../../../components/PagingTable";
import MenuPopup from "../../../components/MenuPopup";
import { IoIosSearch, IoMdPersonAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import InputChecker from "../../../utils/input_checker";
import { fetchModeratorAccountTableData, selectModeratorAccountTableData } from "../../../slices/moderator_account_table_data.slice";
import CreateVoucherDialog from "../../../parts/CreateVoucherDialog";

const VoucherManagement = () => {

    const dispatch = useDispatch();

    const moderatorAccountTableData = useSelector(selectModeratorAccountTableData);

    const [searchTerm, setSearchTerm] = useState(moderatorAccountTableData.data?.searchTerm ?? "");
    const inputRef = useRef(null);

    const [showCreateVoucherDialog, setShowCreateVoucherDialog] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const onNextPage = () => {
        const currentPage = moderatorAccountTableData.data?.currentPage;
        const totalPages = moderatorAccountTableData.data?.totalPages;
        if (currentPage && totalPages && currentPage < totalPages) {
            dispatch(fetchModeratorAccountTableData(
                {
                    pageNo: currentPage + 1,
                    searchTerm,
                }
            ));
        }
    };

    const onPrevPage = () => {
        const currentPage = moderatorAccountTableData.data?.currentPage;
        if (currentPage && currentPage > 1) {
            dispatch(fetchModeratorAccountTableData(
                {
                    pageNo: currentPage - 1,
                    searchTerm,
                }
            ));
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (InputChecker.isAlphanumeric(value)) {
            setSearchTerm(event.target.value.toUpperCase());
        }
    };

    const handleSubmit = (event) => {
        
    };

    return (
        <div id={styles.root}>
            <h1>Quản lý voucher</h1>
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
                        disabled={moderatorAccountTableData.isLoading}
                    />
                    <div className={styles.searchIconBackground} onClick={handleSubmit}>
                        <IoIosSearch size={20} />
                    </div>
                </form>
                <div className={styles.addUserIconBackground} onClick={() => setShowCreateVoucherDialog(true)}>
                    <IoMdPersonAdd size={20} />
                </div>
            </span>
            <div id={styles.tableStyle}>
                <PagingTable
                    data={moderatorAccountTableData.data}
                    isLoading={moderatorAccountTableData.isLoading}
                    errorMessage={moderatorAccountTableData.errorMessage}
                    onNextPage={onNextPage}
                    onPrevPage={onPrevPage}
                    renderPopup={(selectedItem, handleClosePopup) => {
                        const menuButtons = [
                            {
                                icon: null,
                                text: "Sửa",
                                onClick: () => {
                                    // setShowChangePasswordDialog(true);
                                    // setSelectedUser(selectedItem);
                                    // handleClosePopup();
                                },
                            },
                        ]

                        return (
                            <MenuPopup menuButtons={menuButtons} />
                        );
                    }}
                />
            </div>
            {
                showCreateVoucherDialog &&
                <CreateVoucherDialog setShowDialog={setShowCreateVoucherDialog} />
            }
        </div>
    );
};

export default VoucherManagement;
