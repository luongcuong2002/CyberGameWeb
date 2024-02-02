import React from "react";
import styles from "./ht_road.module.scss";
import BackgroundImage from "../../assets/imgs/bg_home.jpg";
import AppBar from "./ui/AppBar";
import Road from "./ui/Road";
import MyItemFrame from "./ui/MyItemFrame";
import WithdrawMoneyFrame from "./ui/WithdrawMoneyFrame";
import TopupRequestPendingFrame from "./ui/TopupRequestPendingFrame";

const HTRoadPage = () => {
    return (
        <div id={styles.root}>
            <img 
                src={BackgroundImage} 
                alt="background" 
                className={styles.background_image}
            />

            <div id={styles.content}>
                <AppBar />
                <Road />

                <div className={styles.bottomLayouts}>
                    <MyItemFrame />
                    <WithdrawMoneyFrame />
                    <TopupRequestPendingFrame />
                </div>
            </div>
        </div>
    );
}

export default HTRoadPage;