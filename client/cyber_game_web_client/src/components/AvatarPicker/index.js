import React, { useRef } from "react";
import styles from "./avatar_picker.module.scss";
import ProfileIcon from "../../assets/icons/ic_profile_inactive.svg";
import { SlPencil } from "react-icons/sl";

export default function AvatarPicker({
  size,
  allowDeleteAvatar = false,
  style = {},
  image = null,
  onClickPickImage,
  onClickDeleteAvatar = () => {},
  activeHover = true,
}) {
  const coloredImgStyle = {
    filter: "grayscale(100%) brightness(50%)",
    width: size / 3,
    height: size / 3,
  };

  const imageBackgroundStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div
      className={styles.background}
      style={{ ...style, width: size, height: size }}
    >
      <img
        src={image ?? ProfileIcon}
        style={image ? imageBackgroundStyle : coloredImgStyle}
      />
      {activeHover && (
        <div className={styles.overlayView}>
          <button className={styles.textButton} onClick={onClickPickImage}>
            Chọn ảnh
          </button>
          <SlPencil size={size / 6} color="white" />
          {allowDeleteAvatar && (
            <button className={styles.textButton} onClick={onClickDeleteAvatar}>
              Xoá ảnh
            </button>
          )}
        </div>
      )}
    </div>
  );
}
