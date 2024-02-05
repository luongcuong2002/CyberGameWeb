import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./wheel.module.scss";
import WheelNeedle from "../../../assets/imgs/wheel_needle.png";
import BackgroundLuckyWheelBottomLayer from "../../../assets/imgs/bg_lucky_wheel_1.png";
import BackgroundLuckyWheelRotatableLayer from "../../../assets/imgs/bg_lucky_wheel_2.png";
import Converter from "../../../utils/converter";
import CoinIcon from "../../../assets/imgs/img_one_coin.png";

const Wheel = forwardRef(
    (props, ref) => {
        
        const wheelContent = [
            100,
            200,
            500,
            1000,
            5000,
            10000,
            20000,
            50000,
        ]

        const minLoops = 4;
        const spinDuration = 3000;

        const [spinning, setSpinning] = useState(false);

        useImperativeHandle(ref, () => ({
            async spin () {
                if (spinning) {
                    console.log("Spinning already");
                    return;
                }

                setSpinning(true);

                const wheel = document.querySelector(`.${styles.wheel}`);

                wheel.style.transition = "none";

                setTimeout(() => {

                    const targetIndex = Math.floor(Math.random() * wheelContent.length);
                    console.log("Target index", targetIndex);

                    const finalDeg = targetIndex >= 0
                        ? Math.floor(360 * minLoops + (360 - targetIndex * 360 / wheelContent.length))
                        : 0;

                    wheel.style.transition = `all ${spinDuration / 1000}s ease-in-out`;
                    wheel.style.transform = `rotate(${finalDeg}deg)`;

                    setTimeout(() => {
                        wheel.style.transition = "none";
                        wheel.style.transform = `rotate(${finalDeg % 360}deg)`;
                        setSpinning(false);

                        alert(`You won ${Converter.formatCurrency(wheelContent[targetIndex])}`);

                    }, spinDuration);

                }, 500);
            }
        }));

        return (
            <div className={styles.container}>
                <img 
                    src={BackgroundLuckyWheelBottomLayer} 
                    className={styles.backgroundLayer1}
                    draggable={false}
                />
                <img
                    src={WheelNeedle}
                    className={styles.wheelNeedle}
                    draggable={false} 
                />
                <div
                    style={{
                        "--seg": wheelContent.length
                    }}
                    className={styles.wheel}
                >
                    <img src={BackgroundLuckyWheelRotatableLayer} draggable="false" />
                    {
                        wheelContent.map((amount, i) => (
                            <div
                                key={i}
                                className={styles.number}
                                style={{
                                    "--i": i,
                                    "--seg": wheelContent.length
                                }}
                            >
                                <span
                                    style={{
                                        "--seg": wheelContent.length
                                    }}
                                >
                                    {Converter.formatCurrency(amount)}
                                    <img src={CoinIcon} />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
)

export default Wheel;