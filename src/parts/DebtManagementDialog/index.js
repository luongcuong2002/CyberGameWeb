import React, { useState, useRef, useEffect } from "react";
import styles from "./debt_management_dialog.module.scss";
import Popup from "reactjs-popup";
import { IoCloseOutline } from "react-icons/io5";
import AlertError from "../../components/AlertError";
import { NumericFormat } from 'react-number-format';
import DatePicker from "react-datepicker";
import Converter from "../../utils/converter";
import moderatorAccountManagementService from "../../services/moderator_account_management.service";

const DebtManagementDialog = ({ setShowDialog, user }) => {

    const tableRef = useRef(null);
    const [selectedDebts, setSelectedDebts] = useState([]);
    const [warning, setWarning] = useState(null);
    const [debtData, setDebtData] = useState(null);

    const [isSendingRequest, setIsSendingRequest] = useState(false);

    const [amount, setAmount] = useState("");
    const [owedDate, setOwedDate] = useState(new Date());
    const [description, setDescription] = useState("");

    useEffect(() => {
        getDebts();
    }, []);

    const getDebts = () => {
        setIsSendingRequest(true);
        moderatorAccountManagementService.getDebts(user.userId)
            .then((data) => {
                setDebtData(data);
            })
            .catch((err) => {
                let errorMessage = err.response?.data?.message;
                if (!errorMessage) {
                    errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau."
                }
                alert(errorMessage);
                setShowDialog(false);
            })
            .finally(() => {
                setIsSendingRequest(false);
            });
    };

    const selectAll = () => {
        setSelectedDebts(debtData.rows.map((item) => item.debtId));
    }

    const unselectAll = () => {
        setSelectedDebts([]);
    }

    const getAllDebtsAmount = () => {
        let total = 0;
        debtData.rows.forEach((item) => {
            total += parseInt(item.amountOwed);
        })
        return total;
    }

    const getAllSelectedDebtsAmount = () => {
        let total = 0;
        debtData.rows.forEach((item) => {
            if (selectedDebts.indexOf(item.debtId) >= 0) {
                total += parseInt(item.amountOwed);
            }
        })
        return total;
    }

    const addDebt = () => {
        if (amount < 1000) {
            return setWarning("Số tiền không hợp lệ!");
        }
        setWarning("");
        setIsSendingRequest(true);

        moderatorAccountManagementService.createNewDebt({
            userId: user.userId,
            amountOwed: amount,
            owedDate: owedDate.getTime(),
            description: description.trim()
        })
            .then(() => {
                alert("Thêm nợ thành công!");
                setAmount("");
                setOwedDate(new Date());
                setDescription("");
                getDebts(); // refresh
            })
            .catch((err) => {
                let errorMessage = err.response?.data?.message;
                if (!errorMessage) {
                    errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau."
                }
                setWarning(errorMessage);
            })
            .finally(() => {
                setIsSendingRequest(false);
            })
    }

    const payDebts = () => {
        if (selectedDebts.length === 0) {
            setWarning("Vui lòng chọn nợ cần trả!");
            return;
        }
        
        setWarning("");
        setIsSendingRequest(true);
        moderatorAccountManagementService.confirmDebtPayment({
            userId: user.userId,
            debtIds: selectedDebts
        })
            .then(() => {
                alert("Xác nhận thanh toán thành công!");
                getDebts(); // refresh
            })
            .catch((err) => {
                let errorMessage = err.response?.data?.message;
                if (!errorMessage) {
                    errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau."
                }
                setWarning(errorMessage);
            })
            .finally(() => {
                setIsSendingRequest(false);
            });
    }

    const closeDialog = () => {
        setShowDialog(false);
    }

    return <Popup
        modal
        open
        overlayStyle={{ background: "#00000080" }}
        onClose={closeDialog}
        closeOnDocumentClick={false}
    >
        <div className={styles.container}>
            <h2>{`Quản lý nợ  (${user.userName})`}</h2>
            {
                warning &&
                <AlertError
                    text={warning}
                    style={{ marginBottom: 10 }}
                    textSize="0.875rem"
                    showIcon={false}
                />
            }
            <div className={styles.content}>
                <div className={styles.addingDebt}>
                    <label className={styles.titleText} >Thêm nợ</label>
                    <div className={styles.amountAndDateForm} >
                        <div className={styles.inputContainer} >
                            <label className={styles.inputLabel} >Số tiền</label>
                            <div className={styles.inputBackground}>
                                <NumericFormat
                                    value={amount}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    onValueChange={(values) => {
                                        setAmount(parseInt(values.value));
                                    }}
                                    decimalScale={0}
                                    allowNegative={false}
                                    isNumericString
                                    format="#.###,##"
                                    mask="_"
                                    placeholder="Nhập số tiền"
                                    disabled={isSendingRequest}
                                />
                            </div>
                        </div>
                        <div className={styles.inputContainer} >
                            <label className={styles.inputLabel} >Ngày nợ</label>
                            <div className={styles.inputBackground}>
                                <DatePicker
                                    selected={owedDate}
                                    startOpen={false}
                                    onChange={date => {
                                        setOwedDate(date)
                                    }}
                                    dateFormat="dd/MM/yyyy, HH:mm"
                                    autoFocus={false}
                                    timeIntervals={15}
                                    timeFormat="HH:mm"
                                    showTimeSelect
                                    disabled={isSendingRequest}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.inputContainer} style={{ marginTop: 15 }} >
                        <label className={styles.inputLabel} >Thông tin thêm</label>
                        <div className={styles.inputBackground}>
                            <input
                                className={styles.input}
                                type="text"
                                value={description}
                                placeholder="Nhập thông tin thêm (không bắt buộc)"
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={isSendingRequest}
                            />
                        </div>
                    </div>
                    <button
                        className={styles.buttonStyle}
                        disabled={isSendingRequest}
                        onClick={addDebt}
                    >
                        Thêm
                    </button>
                </div>
                <label className={styles.titleText} style={{marginTop: 30}}>Nợ hiện tại</label>

                {
                    debtData && debtData.rows?.length > 0 ? (
                        <>
                            <div className={styles.selectAllAndTotalDebts}>
                                <label className={styles.totalDebtsText}>Tổng: <b>{Converter.formatMoney(getAllDebtsAmount())}</b></label>
                                <button
                                    onClick={selectedDebts.length === debtData.rows.length ? unselectAll : selectAll}
                                >
                                    {selectedDebts.length === debtData.rows.length ? "Bỏ tất" : "Chọn tất"}
                                </button>
                            </div>
                            <div ref={tableRef} className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {debtData.header.map((item, index) => {
                                                if (item.hidden) {
                                                    return null;
                                                }
                                                return <th key={index}>{item.name}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {debtData.rows.map((item, index) => {
                                            const isSelected = selectedDebts.indexOf(item.debtId) >= 0;

                                            const onClickRow = () => {
                                                if (isSelected) {
                                                    setSelectedDebts(selectedDebts.filter((value) => value !== item.debtId));
                                                } else {
                                                    setSelectedDebts([...selectedDebts, item.debtId]);
                                                }
                                            }

                                            return (
                                                <tr
                                                    key={index}
                                                    className={isSelected ? styles.selected : ""}
                                                    onClick={onClickRow}
                                                >
                                                    <td key={-1}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            defaultChecked={false}
                                                        />
                                                    </td>
                                                    {Object.keys(item).map((key, i) => {
                                                        if (debtData.header[i].hidden) {
                                                            return null;
                                                        }
                                                        return <td key={i}>{key == "amountOwed" ? Converter.formatCurrency(item[key]) : item[key]}</td>;
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <label className={styles.selectedText}>Đã chọn: </label>
                                <label className={styles.payedDebtsAmountText}><b>{Converter.formatMoney(getAllSelectedDebtsAmount())}</b></label>
                            </div>
                            <button
                                className={styles.buttonStyle}
                                disabled={isSendingRequest}
                                onClick={payDebts}
                            >
                                Xác nhận đã thanh toán
                            </button>
                        </>
                    ) : (
                        <div className={styles.noDebtText}>Không có nợ</div>
                    )
                }
            </div>

            <div className={styles.closeButton} onClick={closeDialog}>
                <IoCloseOutline color="#000" size={30} />
            </div>
        </div>
    </Popup>
}

export default DebtManagementDialog;