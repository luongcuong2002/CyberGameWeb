import React, { useState } from "react";
import styles from "./withdraw_money_frame.module.scss";
import QuestionMark from "../../../../assets/imgs/question_mark.png";
import { NumericFormat } from 'react-number-format';
import Keyboard from "./Keyboard";

const WithdrawMoneyFrame = () => {

    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Number.isInteger(amount)) {
            alert("Số tiền không hợp lệ!");
            return;
        }

        setIsSendingRequest(true);
        setTimeout(() => {
            setIsSendingRequest(false);
        }, 1000)
    };

    const handleKeyboardClick = (value) => {
        if (value === "C") {
            if (!amount) {
                return;
            }
            let newAmount = amount.toString().slice(0, -1);
            if (newAmount === "") {
                setAmount("");
                return;
            }
            setAmount(parseInt(newAmount));
            return;
        }
        let newAmount = amount.toString() + value;
        setAmount(parseInt(newAmount));
    }

    return (
        <div id={styles.root}>
            <div className={styles.header}>
                <span className={styles.title}>
                    Rút tiền
                </span>
                <img
                    className={styles.question_mark}
                    src={QuestionMark}
                    alt="Question Mark"
                />
            </div>

            <div className={styles.inputWrapper}>
                <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    onValueChange={(values) => {
                        setAmount(parseInt(values.value));
                    }}
                    decimalScale={0}
                    allowNegative={true}
                    isNumericString
                    format="#.###,##"
                    mask="_"
                    placeholder="Nhập số tiền cần rút"
                    onSubmit={handleSubmit}
                    value={amount}
                    disabled={true}
                />
            </div>

            <Keyboard onClick={handleKeyboardClick} />
        </div>
    );
}

export default WithdrawMoneyFrame;