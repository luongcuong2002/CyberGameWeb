import React from "react";
import styles from "./send_request_button.module.scss";

const SendRequestButton = ({ isSendingRequest, onClick }) => {
    return (
        <div id={styles.root}>
            <div className={styles.sendButtonLayer} onClick={onClick}>
                <div className={styles.sendButtonLayer1} />
                <div className={styles.sendButtonLayer2} />
                <div className={styles.sendButtonLayer3} />
                <span className={styles.sendButton}>Gửi yêu cầu</span>
            </div>
        </div>
    );
}

export default SendRequestButton;