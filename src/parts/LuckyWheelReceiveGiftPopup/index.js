import React from "react";
import styles from "./lucky_wheel_receive_gift.module.scss";
import Popup from "reactjs-popup";
import FloatingButton from "../../components/FloatingButton";
import Gift from "../../assets/imgs/present.gif";
import Converter from "../../utils/converter";

const LuckyWheelReceiveGiftPopup = ({ gift, setShowDialog }) => {

    const closeDialog = () => {
        setShowDialog(false);
    }

    return (
        <Popup
            modal
            open
            overlayStyle={{ background: "rgba(0,0,0,0.95)" }}
            onClose={closeDialog}
            closeOnDocumentClick={false}
        >
            <div className={styles.container}>
                <div className={styles.claimedContainer}>
                    <label className={styles.claimedText}>Nhận quà</label>
                    <img src={Gift} className={styles.gift} draggable={false} />
                    <label className={styles.giftName}>{gift.name}</label>
                    <label className={styles.giftQuantity}>x {Converter.formatCurrency(gift.quantity)}</label>
                    <div className={styles.closeButton}>
                        <FloatingButton
                            onClick={() => {
                                setShowDialog(false);
                            }}
                            text={"Đóng"}
                            startColor="#31D9FD"
                            endColor="#30A7F6"
                            colorLayer1="#2F67B4"
                            colorLayer2="#91FCFF"
                        />
                    </div>
                </div>
                {/* <img src={RingHighlight} className={styles.ringHighlight} draggable={false} />
                <img src={gift.iconUrl} className={styles.giftIcon} draggable={false} /> */}
            </div>
        </Popup>
    );
}

export default LuckyWheelReceiveGiftPopup;