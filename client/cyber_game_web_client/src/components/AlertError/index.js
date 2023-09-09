import React from "react";
import styles from "./alert_error.module.scss";
import { PiWarningCircleBold } from "react-icons/pi";

const AlertError = ({
  text,
  style = {},
  iconSize = 20,
  iconColor = "white",
}) => {
  return (
    <div className={styles.warningBox} style={style}>
      <PiWarningCircleBold size={iconSize} color={iconColor} />
      <p className={styles.warningText}>{text}</p>
    </div>
  );
};

export default AlertError;
