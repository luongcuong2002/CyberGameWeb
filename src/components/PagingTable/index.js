import React, { useState, useEffect, useRef } from "react";
import styles from "./paging_table.module.scss";
import { ReactComponent as IconArrowLeft } from "../../assets/icons/ic_arrow_left.svg";
import { ReactComponent as IconArrowRight } from "../../assets/icons/ic_arrow_right.svg";
import Loader from "../Loader";

const PagingTable = ({ data, onNextPage, onPrevPage, currentPage, renderPopup, isLoading }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const popupRef = useRef(null);
    const tableRef = useRef(null);

    const handleContextMenu = (event, item) => {
        event.preventDefault();
        setSelectedItem(item);
        setPopupVisible(true);

        let position = {
            x: event.clientX,
            y: event.clientY,
        };

        setPopupPosition(position);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
        setSelectedItem(null);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            handleClosePopup();
        } else if (!popupVisible && tableRef.current && !tableRef.current.contains(event.target)) {
            setSelectedItem(null);
        }
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleDoubleClick = (item) => {
        setSelectedItem(item);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupVisible]);

    return (
        <>
            <div ref={tableRef} className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {data.header.map((item, index) => {
                                if (item.hidden) {
                                    return null;
                                }
                                return <th key={index}>{item.name}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((item, index) => {
                            const isSelected = selectedItem === item;
                            return (
                                <tr
                                    key={index}
                                    onContextMenu={(event) => handleContextMenu(event, item)}
                                    className={isSelected ? styles.selected : ""}
                                    onClick={() => handleSelectItem(item)}
                                    onDoubleClick={() => handleDoubleClick(item)}
                                >
                                    {Object.keys(item).map((key, i) => {
                                        if (data.header[i].hidden) {
                                            return null;
                                        }
                                        return <td key={i}>{item[key]}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {
                data.rows.length === 0 && (
                    <span className={styles.noData}>Không có dữ liệu</span>
                )
            }
            {popupVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: popupPosition.y,
                        left: popupPosition.x,
                    }}
                    ref={popupRef}
                >
                    {renderPopup(selectedItem, handleClosePopup)}
                </div>
            )}
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
            {
                isLoading && (
                    <div className={styles.loading}>
                        <Loader color="#535353" width="45px" />
                        <span className={styles.loadingText} >Đang lấy dữ liệu...</span>
                    </div>
                )
            }
        </>
    );
};

export default PagingTable;
