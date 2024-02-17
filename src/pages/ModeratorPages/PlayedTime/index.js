import React, { useState, useRef } from "react";
import styles from "./played_time.module.scss";
import PagingTable from "../../../components/PagingTable";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import InputChecker from "../../../utils/input_checker";
import { fetchPlayedTimeTableData, selectPlayedTimeTableData, setDate, setSearchTerm } from "../../../slices/played_time_data.slice";
import DatePicker from "react-datepicker";
import { ReactComponent as IconArrowLeft } from "../../../assets/icons/ic_arrow_left.svg";
import { ReactComponent as IconArrowRight } from "../../../assets/icons/ic_arrow_right.svg";

const PlayedTime = () => {

    const dispatch = useDispatch();

    const playedTimeTableData = useSelector(selectPlayedTimeTableData);

    const inputRef = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;
        if (InputChecker.isAlphanumeric(value)) {
            dispatch(setSearchTerm(value.toUpperCase()));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputRef.current) {
            inputRef.current.blur();
        }

        // if (userTableData.isLoading) {
        //     return;
        // }

        // dispatch(fetchUserTableData({
        //     pageNo: 1,
        //     searchTerm,
        // }));
    };

    const cancelChanges = () => {

    }

    const updateChanges = () => {

    }

    return (
        <div id={styles.root}>
            <h1>Thời gian chơi</h1>
            <div className={styles.divider} />
            <span className={styles.actions}>
                <div className={styles.topLeftPanel}>
                    <div className={styles.dateWrapper}>
                        <IconArrowLeft
                            fill={"#509BF5"}
                            className={styles.arrowButton}
                            //onClick={onPrevPage}
                        />
                        <div className={styles.inputWrapper}>
                            <DatePicker
                                selected={new Date()}
                                startOpen={false}
                                dateFormat="dd-MM-yyyy"
                                autoFocus={false}
                                onChange={(date) => {
                                    dispatch(setDate(date.getTime()));
                                }}
                                //disabled={isSendingRequest}
                            />
                        </div>
                        <IconArrowRight
                            fill={"#509BF5"}
                            className={styles.arrowButton}
                            //onClick={onNextPage}
                        />
                    </div>
                    <form onSubmit={handleSubmit} className={styles.searchBar}>
                        <input
                            ref={inputRef}
                            className={styles.searchInput}
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={playedTimeTableData.searchTerm}
                            onChange={handleChange}
                            disabled={playedTimeTableData.isLoading}
                        />
                        <div className={styles.searchIconBackground} onClick={handleSubmit}>
                            <IoIosSearch size={20} />
                        </div>
                    </form>
                </div>
                <input
                    type="file"
                    onChange={(e) => {
                    }}
                    className={styles.uploadButton}
                />
            </span>
            <div id={styles.tableStyle}>
                <PagingTable
                    data={playedTimeTableData.data}
                    isLoading={playedTimeTableData.isLoading}
                    errorMessage={playedTimeTableData.errorMessage}
                    turnOnPagingMode={false}
                />
            </div>
            <div className={styles.bottomButtons}>
                <button 
                    className={styles.cancelButton}
                    onClick={cancelChanges}
                >
                    Hủy
                </button>
                <button 
                    className={styles.updateButton}
                    onClick={updateChanges}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
}

export default PlayedTime;