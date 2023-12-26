import React from "react";
import styles from "./user_debt.module.scss";
import DatePicker from "react-datepicker";
import { IoMdRefresh, IoIosSearch } from "react-icons/io";

const UserDebt = () => {

    const dateFilterOptions = ["Ngày nợ" , "Ngày trả" , "Ngày nhập"]
    const debtStatus = ["Đã trả", "Chưa trả"]
    const searchByOptions = ["Người nợ", "Người nhập", "Người thanh toán"]

    return <div id={styles.root}>
        <h1>Nợ người dùng</h1>
        <div className={styles.divider} />
        <div className={styles.filterRow}>
            <select name="date">
                {
                    dateFilterOptions.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })
                }
            </select>
            <label>Từ</label>
            <div className={styles.inputWrapper}>
                <DatePicker
                    selected={new Date()}
                    startOpen={false}
                    dateFormat="dd-MM-yyyy, HH:mm"
                    showTimeSelect
                    autoFocus={false}
                />
            </div>
            <label>Đến</label>
            <div className={styles.inputWrapper}>
                <DatePicker
                    selected={new Date()}
                    startOpen={false}
                    dateFormat="dd-MM-yyyy, HH:mm"
                    showTimeSelect
                    autoFocus={false}
                />
            </div>
            <select name="status">
                {
                    debtStatus.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })
                }
            </select>
            <div className={styles.refreshIconBackground}>
                <IoMdRefresh size={20} />
            </div>
            <div style={{height: "100%", width: 1, backgroundColor: "gray"}} />
            <select name="status">
                {
                    searchByOptions.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })
                }
            </select>
            <input
                // ref={inputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Tìm kiếm..."
                value={""}
            />
            <div className={styles.searchIconBackground}>
                <IoIosSearch size={20} />
            </div>
        </div>
        <div className={styles.divider} />
    </div>
}

export default UserDebt;