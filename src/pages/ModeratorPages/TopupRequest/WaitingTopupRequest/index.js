import React, { useState, useRef } from "react";
import styles from "./waiting_topup_request.module.scss";
import { IoIosSearch } from "react-icons/io";
import InputChecker from "../../../../utils/input_checker";
import Converter from "../../../../utils/converter";
import { ReactComponent as IconArrowLeft } from "../../../../assets/icons/ic_arrow_left.svg";
import { ReactComponent as IconArrowRight } from "../../../../assets/icons/ic_arrow_right.svg";
import RejectTopupRequestDialog from "../../../../parts/RejectTopupRequestDialog";

const WaitingTopupRequest = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showApproveDialog, setShowApproveDialog] = useState(false);

    const [selectedTopupRequest, setSelectedTopupRequest] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);

    const inputRef = useRef(null);
    const tableRef = useRef(null);

    const handleChange = (event) => {
        const value = event.target.value;
        if (InputChecker.isAlphanumeric(value)) {
            setSearchTerm(event.target.value.toUpperCase());
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleReject = (topupRequest, userName) => {
        setSelectedTopupRequest(topupRequest);
        setSelectedUserName(userName);
        setShowRejectDialog(true);
    }

    return <div id={styles.root}>
        <form onSubmit={handleSubmit} className={styles.searchBar}>
            <input
                ref={inputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleChange}
                disabled={false}
            />
            <div className={styles.searchIconBackground} onClick={handleSubmit}>
                <IoIosSearch size={20} />
            </div>
        </form>
        <div ref={tableRef} className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Ngày yêu cầu</th>
                        <th>Gốc</th>
                        <th>Khuyến mại</th>
                        <th>Tiền</th>
                        <th>Tổng</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sampleData.data.map((group) => {

                            const totalAmount = group.topupRequests.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue.finalAmount.originalValue;
                            }, 0);

                            return <>
                                {
                                    group.topupRequests.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                {
                                                    index == 0 && (
                                                        <td 
                                                            rowSpan={group.totalRequests} 
                                                            style={{borderLeft: "none"}}
                                                        >
                                                            {group.userName}
                                                        </td>
                                                    )
                                                }
                                                <td>{item.createdDate.formattedValue}</td>
                                                <td>{item.amount.formattedValue}</td>
                                                <td>{item.voucher.formattedValue}</td>
                                                <td>{item.finalAmount.formattedValue}</td>
                                                {
                                                    index == 0 && (
                                                        <td rowSpan={group.totalRequests} >{Converter.formatCurrency(totalAmount)}</td>
                                                    )
                                                }
                                                <td>
                                                    <button 
                                                        className={styles.rejectButtonStyle}
                                                        onClick={() => handleReject(item, group.userName)}
                                                    >
                                                        Từ chối
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className={styles.approveButtonStyle}>
                                                        Duyệt
                                                    </button>
                                                </td>
                                                {
                                                    index == 0 && (
                                                        <td rowSpan={group.totalRequests} >
                                                            <button className={styles.approveAllButtonStyle}>
                                                                Duyệt hết
                                                            </button>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        })
                    }
                </tbody>
            </table>
        </div>
        {
            sampleData && (
                <div className={styles.pagination}>
                    <IconArrowLeft
                        fill={sampleData.currentPage > 1 ? "#509BF5" : "#CDCDCD"}
                        style={sampleData.currentPage > 1 ? { cursor: "pointer" } : { cursor: "not-allowed" }}
                        className={styles.paginationButton}
                    />
                    <span>
                        {sampleData.currentPage} / {Math.max(sampleData.totalPages, 1)}
                    </span>
                    <IconArrowRight
                        fill={sampleData.currentPage < sampleData.totalPages ? "#509BF5" : "#CDCDCD"}
                        style={sampleData.currentPage < sampleData.totalPages ? { cursor: "pointer" } : { cursor: "not-allowed" }}
                        className={styles.paginationButton}
                    />
                </div>
            )
        }
        {
            showRejectDialog && selectedTopupRequest && selectedUserName && (
                <RejectTopupRequestDialog 
                    topupRequest={selectedTopupRequest} 
                    userName={selectedUserName}
                    setShowDialog={setShowRejectDialog} 
                    onSuccess={() => {}}
                />
            )
        }
    </div>;
};

export default WaitingTopupRequest;

const sampleData = {
    currentPage: 1,
    totalPages: 2,
    totalElements: 2,
    data: [
        {
            userName: "CUONG",
            totalRequests: 2,
            topupRequests: [
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "100.000",
                        originalValue: 100000,
                    },
                    finalAmount: {
                        formattedValue: "200.000",
                        originalValue: 200000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "x2",
                        originalValue: 1,
                    }
                },
                {
                    id: {
                        formattedValue: "2",
                        originalValue: 2,
                    },
                    amount: {
                        formattedValue: "100.000",
                        originalValue: 100000,
                    },
                    finalAmount: {
                        formattedValue: "150.000",
                        originalValue: 150000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:35",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "x2 , tối đa 50k",
                        originalValue: 2,
                    }
                },
            ]
        },
        {
            userName: "TEST",
            totalRequests: 1,
            topupRequests: [
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    finalAmount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "",
                        originalValue: -1,
                    }
                },
            ]
        },
        {
            userName: "TEST2",
            totalRequests: 4,
            topupRequests: [
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    finalAmount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "",
                        originalValue: -1,
                    }
                },
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    finalAmount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "",
                        originalValue: -1,
                    }
                },
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    finalAmount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "",
                        originalValue: -1,
                    }
                },
                {
                    id: {
                        formattedValue: "1",
                        originalValue: 1,
                    },
                    amount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    finalAmount: {
                        formattedValue: "60.000",
                        originalValue: 60000,
                    },
                    createdDate: {
                        formattedValue: "29-12-2023, 10:55",
                        originalValue: new Date().getTime(),
                    },
                    voucher: {
                        formattedValue: "",
                        originalValue: -1,
                    }
                },
            ]
        },
    ]
}