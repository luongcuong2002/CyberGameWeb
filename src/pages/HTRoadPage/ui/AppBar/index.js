import React from "react";
import styles from "./app_bar.module.scss";
import AvatarAndCoin from "./AvatarAndCoin";

const AppBar = () => {
    return (
        <div id={styles.root}>
            <div className={styles.title}/>
            <AvatarAndCoin />
        </div>
    );
}

export default AppBar;