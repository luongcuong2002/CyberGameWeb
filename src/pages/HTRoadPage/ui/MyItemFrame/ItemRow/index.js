import React from "react";
import styles from "./item_row.module.scss";
import TrapezoidShape from "../../../../../assets/imgs/trapezoid_shape.png";
import ItemBackground from "../../../../../assets/imgs/item_background.png";

const ItemRow = ({ item }) => {
    return (
        <div id={styles.root}>
            <div className={styles.layer1} />
            <div className={styles.layer2} />

            <div className={styles.itemImageContainer}>
                <img src={ItemBackground} className={styles.itemBackground} />
                <img src={item.iconUrl} className={styles.itemImage} />
            </div>

            <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDescription}>• {item.description}</span>
            </div>

            <span className={styles.itemQuantity}>x{item.quantity}</span>

            <div className = {styles.useButtonContainer}>
                <img src={TrapezoidShape} className={styles.trapezoidImage} />
                <div className={styles.useButtonLayer}>
                    <div className={styles.useButtonLayer1} />
                    <div className={styles.useButtonLayer2} />
                    <div className={styles.useButtonLayer3} />
                    {/* <span className={styles.useButton}>Sử dụng</span> */}
                </div>
            </div>
        </div>
    );
}

export default ItemRow;