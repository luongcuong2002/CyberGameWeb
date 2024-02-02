import React from "react";
import styles from "./topup_request_pending.module.scss";
import QuestionMark from "../../../../assets/imgs/question_mark.png";
import ItemRow from "./ItemRow";

const TopupRequestPendingFrame = () => {

    const items = [
        {
            id: 1,
            iconUrl: "https://i.imgur.com/63ci3X9.png",
            amount: 50000,
            timestamp: new Date().getTime(),
        },
        {
            id: 1,
            iconUrl: "https://i.imgur.com/63ci3X9.png",
            amount: 100000,
            timestamp: new Date().getTime(),
        },
        {
            id: 1,
            iconUrl: "https://i.imgur.com/63ci3X9.png",
            amount: 10000,
            timestamp: new Date().getTime(),
        },
        {
            id: 1,
            iconUrl: "https://i.imgur.com/63ci3X9.png",
            amount: 100000,
            timestamp: new Date().getTime(),
        }
    ]

    return (
        <div id={styles.root}>
            <div className={styles.header}>
                <span className={styles.title}>
                    Chờ duyệt
                </span>
                <img
                    className={styles.question_mark}
                    src={QuestionMark}
                    alt="Question Mark"
                />
            </div>

            <ul className={styles.item_list}>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <ItemRow item={item} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TopupRequestPendingFrame;