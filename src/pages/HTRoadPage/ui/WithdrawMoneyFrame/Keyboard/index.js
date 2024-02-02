import React from "react";
import styles from "./keyboard.module.scss";

const Keyboard = ({ onClick }) => {
    return <div id={styles.root}>
        <div className={styles.wrapper}>
            <div className={styles.keys}>
                <input type="button" value={"1"} onClick={() => { onClick("1") }} />
                <input type="button" value={"2"} onClick={() => { onClick("2") }} />
                <input type="button" value={"3"} onClick={() => { onClick("3") }} />
                <input type="button" value={"4"} onClick={() => { onClick("4") }} />
                <input type="button" value={"5"} onClick={() => { onClick("5") }} />
            </div>
            <div className={styles.keys}>
                <input type="button" value={"6"} onClick={() => { onClick("6") }} />
                <input type="button" value={"7"} onClick={() => { onClick("7") }} />
                <input type="button" value={"8"} onClick={() => { onClick("8") }} />
                <input type="button" value={"9"} onClick={() => { onClick("9") }} />
                <input type="button" value={"0"} onClick={() => { onClick("0") }} />
                <input type="button" value={"C"} onClick={() => { onClick("C") }} />
            </div>
        </div>
    </div>
}

export default Keyboard;