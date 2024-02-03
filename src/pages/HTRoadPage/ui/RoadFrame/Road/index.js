import React from "react";
import styles from "./road.module.scss";
import RoadBar from "./RoadBar";
import Scrollable from "../../../../../components/Scrollable";
import HourNumber from "./HourNumber";

const widthItem = 200;

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
                requireTimedHours: 6,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 7,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 8,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            }, {
                id: 5,
                requireTimedHours: 9,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 10,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 11,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            },
            {
                id: 5,
                requireTimedHours: 12,
                iconUrl: "https://i.imgur.com/gtxUdnG.png",
                type: "luckyWheel",
                quantity: 1,
                isClaimed: false
            }
        ],
        userTimedHours: 8.2
    }

    return (
        <Scrollable orientation="horizontal">
            <div id={styles.root}>
                <RoadBar gifts={data.gifts} userTimedHours={data.userTimedHours} widthItem={widthItem} />
                <HourNumber gifts={data.gifts} userTimedHours={data.userTimedHours} widthItem={widthItem} />
            </div>
        </Scrollable>
    );
}

export default Road;