import React from "react";
import styles from "./lucky_wheel_popup.module.scss";
import Popup from "reactjs-popup";

const LuckyWheelPopup = ({ setShowDialog }) => {

    const closeDialog = () => {
        setShowDialog(false);
    }

    return (
        <Popup
            modal
            open
            overlayStyle={{ background: "rgba(0,0,0,0.8)" }}
            onClose={closeDialog}
            closeOnDocumentClick={false}
        >
            <div className={styles.container}>
            </div>
        </Popup>
    );
}

export default LuckyWheelPopup;