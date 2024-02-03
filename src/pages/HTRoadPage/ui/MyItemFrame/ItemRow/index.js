import React, { useRef, useState, useEffect } from "react";
import styles from "./item_row.module.scss";
import TrapezoidShape from "../../../../../assets/imgs/trapezoid_shape.png";
import ItemBackground from "../../../../../assets/imgs/item_background.png";

const ItemRow = ({ item }) => {

    const textRef = useRef(null);
    const [isTextOverflowed, setIsTextOverflowed] = useState(false);

    useEffect(() => {
        checkTextOverflow();
    }, [textRef.current]);

    const checkTextOverflow = () => {
        if (textRef.current.scrollHeight > textRef.current.clientHeight) {
            setIsTextOverflowed(true);
        }
    }

    return (
        <div id={styles.root}>
            <div className={styles.layer1} />
            <div className={styles.layer2} />

            <div className={styles.itemImageContainer}>
                <img src={ItemBackground} className={styles.itemBackground} draggable={false} />
                <img src={item.iconUrl} className={styles.itemImage} draggable={false} />
            </div>

            <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <div 
                    ref={textRef}
                    className={styles.itemDescription}
                >
                    {
                        isTextOverflowed ?
                            (
                                <marquee scrollamount="3">
                                    {item.description}
                                </marquee>
                            )
                        : item.description
                    }
                </div>
            </div>

            <span className={styles.itemQuantity}>x{item.quantity}</span>

            <div className = {styles.useButtonContainer}>
                <img src={TrapezoidShape} className={styles.trapezoidImage} draggable={false} />
                <div className={styles.useButtonLayer}>
                    <div className={styles.useButtonLayer1} />
                    <div className={styles.useButtonLayer2} />
                    <div className={styles.useButtonLayer3} />
                    <span className={styles.useButton}>Sử dụng</span>
                </div>
            </div>
        </div>
    );
}

export default ItemRow;