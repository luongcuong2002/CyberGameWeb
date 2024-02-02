import React from "react";
import styles from "./item_row.module.scss";
import ItemBackground from "../../../../../assets/imgs/item_background_purple.png";
import Converter from "../../../../../utils/converter";
import TimeUtils from "../../../../../utils/time_utils";

const ItemRow = ({ item }) => {
    return (
        <div id={styles.root}>
            <div className={styles.layer1} />
            <div className={styles.layer2} />

            <div className={styles.itemImageContainer}>
                <img src={ItemBackground} className={styles.itemBackground} />
                <img src={item.iconUrl} className={styles.itemImage} />
            </div>

            <span className={styles.coinAmount}>{Converter.formatCurrency(item.amount)}</span>

            <div className={styles.timeContainer}>
                <span className={styles.time}>{TimeUtils.formatTimestampToString(item.timestamp, "HH:mm")}</span>
                <span className={styles.time}>{TimeUtils.formatTimestampToString(item.timestamp, "dd/MM/yyyy")}</span>
            </div>
        </div>
    );
}

export default ItemRow;