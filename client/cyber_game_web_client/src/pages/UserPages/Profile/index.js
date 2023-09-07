import React from "react";
import styles from "./profile.module.scss";
import AvatarPicker from "../../../components/AvatarPicker";

const ProfilePage = () => {
  return (
    <div id={styles.root}>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfoOverlayBackground}>
          <div className={styles.baseInfoContentWarper}>
            <AvatarPicker size={192} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
