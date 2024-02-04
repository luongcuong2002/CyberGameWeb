import React, { useState } from "react";
import styles from "./wheel.module.scss";

const LuckyWheelPopup = () => {

    const numberOfSegments = 8;
    const minLoops = 4;
    const spinDuration = 5000;

    const [spinning, setSpinning] = useState(false);

    const spin = async () => {
        if (spinning) {
            console.log("Spinning already");
            return;
        }

        setSpinning(true);

        const wheel = document.querySelector(`.${styles.wheel}`);

        wheel.style.transition = "none";

        setTimeout(() => {

            const targetIndex = Math.floor(Math.random() * numberOfSegments);
            console.log("Target index", targetIndex);

            const finalDeg = targetIndex >= 0
                ? Math.floor(360 * minLoops + (360 - targetIndex * 360 / numberOfSegments))
                : 0;

            wheel.style.transition = `all ${spinDuration / 1000}s ease-in-out`;
            wheel.style.transform = `rotate(${finalDeg}deg)`;

            setTimeout(() => {
                wheel.style.transition = "none";
                wheel.style.transform = `rotate(${finalDeg % 360}deg)`;
                setSpinning(false);
            }, spinDuration);

        }, 500);
    };

    return (
        <div className={styles.container}>
            <div 
                className={styles.spinButton}
                onClick={spin}
            >Quay</div>
            <div 
                style={{
                    "--seg": numberOfSegments
                }}
                className={styles.wheel}
            >
                {
                    Array(numberOfSegments).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className={styles.number}
                            style={{
                                "--i": i,
                                "--clr": `hsl(${(i * (360 / numberOfSegments))}, 100%, 50%)`,
                                "--seg": numberOfSegments
                            }}
                        >
                            <span
                                style={{
                                    "--seg": numberOfSegments
                                }}
                            >{i + 1}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default LuckyWheelPopup;