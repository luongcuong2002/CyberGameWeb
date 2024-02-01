import React from "react";
import styles from "./my_item_frame.module.scss";
import QuestionMark from "../../../../assets/imgs/question_mark.png";

const MyItemFrame = () => {
    return (
        <div id={styles.root}>
            <img 
                className={styles.question_mark}
                src={QuestionMark} 
                alt="Question Mark"
            />
            <div className={styles.title}>
                Vật phẩm của tôi
            </div>
        </div>
    );
}

export default MyItemFrame;