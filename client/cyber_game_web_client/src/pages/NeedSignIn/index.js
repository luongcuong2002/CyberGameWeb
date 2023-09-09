import React from "react";
import styles from "./need_sign_in.module.scss";
import LargeWarningImage from "../../assets/imgs/large_warning.svg";

export default function NeedSignInPage() {
  return (
    <div className={styles.root}>
      <img src={LargeWarningImage} className={styles.warningImage} />
      <span className={styles.warningText}>
        Bạn cần đăng nhập để vào trang này.
      </span>
    </div>
  );
}
