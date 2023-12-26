import React, { useEffect, useState } from "react";
import styles from "./user_debt.module.scss";
import DatePicker from "react-datepicker";
import { IoMdRefresh, IoIosSearch } from "react-icons/io";
import moderatorDebtManagementService from "../../../services/moderator_debt_management_service";

const dateFilterOptions = [
    {
        text: "Ngày nợ",
        value: "owedDate"
    },
    {
        text: "Ngày trả",
        value: "payDate"
    },
    {
        text: "Ngày nhập",
        value: "importedDate"
    }
]
const debtStatus = [
    {
        text: "Chưa trả",
        value: "false",
    },
    {
        text: "Đã trả",
        value: "true",
    }
]
const searchByOptions = [
    {
        text: "Người nợ",
        value: "debtor"
    },
    {
        text: "Người nhập",
        value: "creator"
    },
    {
        text: "Người thanh toán",
        value: "confirmedByUser"
    }
]

const UserDebt = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [byDate, setByDate] = useState(dateFilterOptions[0].value);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isPaid, setIsPaid] = useState(debtStatus[0].value);
    const [searchBy, setSearchBy] = useState(searchByOptions[0].value);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        setStartDate(start);

        const end = new Date();
        end.setHours(23, 59, 59, 999);
        setEndDate(end);
    }, [])

    const handleSelectDateChange = (event) => {
        setByDate(event.target.value);
    };

    const handleSelectStatusChange = (event) => {
        setIsPaid(event.target.value === "true");
    }

    const handleSelectSearchByChange = (event) => {
        setSearchBy(event.target.value);
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const onClickRefresh = () => {
        if (!isPaid && byDate == "payDate") {
            alert("Không thể tìm kiếm theo ngày trả khi chưa trả nợ!");
            return;
        }

        if (!isPaid && searchBy === "confirmedByUser") {
            alert("Không thể tìm kiếm theo người thanh toán khi chưa trả nợ!")
            return;
        }

        const params = {
            byDate,
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
            isPaid,
        }

        fetchDebts(params);
    }

    const fetchDebts = (params) => {
        setIsLoading(true);
        moderatorDebtManagementService.getDebts(params)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return <div id={styles.root}>
        <h1>Nợ người dùng</h1>
        <div className={styles.divider} />
        <div className={styles.filterRow}>
            <select name="date" onChange={handleSelectDateChange}>
                {
                    dateFilterOptions
                        .map((option, index) => {
                            if (!isPaid && option.value === "payDate") {
                                if (byDate === "payDate") setByDate(dateFilterOptions[0].value);
                                return;
                            }
                            return <option key={index} value={option.value}>{option.text}</option>
                        })
                }
            </select>
            <label>Từ</label>
            <div className={styles.inputWrapper}>
                <DatePicker
                    selected={startDate}
                    startOpen={false}
                    dateFormat="dd-MM-yyyy, HH:mm"
                    showTimeSelect
                    autoFocus={false}
                    onChange={(date) => {
                        if (date.getTime() > endDate.getTime()) return;
                        setStartDate(date);
                    }}
                />
            </div>
            <label>Đến</label>
            <div className={styles.inputWrapper}>
                <DatePicker
                    selected={endDate}
                    startOpen={false}
                    dateFormat="dd-MM-yyyy, HH:mm"
                    showTimeSelect
                    autoFocus={false}
                    onChange={(date) => {
                        if (date.getTime() < startDate.getTime()) return;
                        setEndDate(date);
                    }}
                />
            </div>
            <select name="status" onChange={handleSelectStatusChange}>
                {
                    debtStatus.map((option, index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    })
                }
            </select>
            <div className={styles.refreshIconBackground} onClick={onClickRefresh}>
                <IoMdRefresh size={20} />
            </div>
            <div style={{ height: "100%", width: 1, backgroundColor: "gray" }} />
            <select name="searchBy" onChange={handleSelectSearchByChange}>
                {
                    searchByOptions.map((option, index) => {
                        if (!isPaid && option.value === "confirmedByUser") {
                            if (searchBy === "confirmedByUser") setSearchBy(searchByOptions[0].value);
                            return;
                        };
                        return <option key={index} value={option.value}>{option.text}</option>
                    })
                }
            </select>
            <input
                // ref={inputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Tìm kiếm..."
                value={""}
                onChange={handleSearchTermChange}
            />
            <div className={styles.searchIconBackground}>
                <IoIosSearch size={20} />
            </div>
            <div className={styles.divider} />
        </div>
    </div>
}

export default UserDebt;