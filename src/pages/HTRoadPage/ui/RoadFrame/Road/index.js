import React from "react";
import styles from "./road.module.scss";
import RoadBar from "./RoadBar";

const Road = () => {

    const data = {
        gifts: [
            {
                id: 1,
                requireTimedHours: 1,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "money",
                quantity: 100,
                isClaimed: false
            },
            {
                id: 2,
                requireTimedHours: 2,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 3,
                requireTimedHours: 3,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 4,
                requireTimedHours: 4,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            }, {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 5,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            }
        ],
        userTimedHours: 5.2
    }

    return (
        <div id={styles.root}>
            <RoadBar gifts={data.gifts} userTimedHours={data.userTimedHours} />
        </div>
    );
}

export default Road;