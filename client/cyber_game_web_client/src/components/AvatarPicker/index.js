import React, { useRef } from "react";
import styles from "./avatar_picker.module.scss";
import ProfileIcon from "../../assets/icons/ic_profile_inactive.svg";
import { SlPencil } from "react-icons/sl";

export default function AvatarPicker({
  size,
  allowDeleteAvatar = false,
  style = {},
  onClickDeleteAvatar = () => {},
}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        //setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const coloredImgStyle = {
    filter: "grayscale(100%) brightness(50%)",
    width: size / 3,
    height: size / 3,
  };

  return (
    <div
      className={styles.background}
      style={{ ...style, width: size, height: size }}
    >
      <img src={ProfileIcon} style={coloredImgStyle} />
      <div className={styles.overlayView}>
        <button className={styles.textButton} onClick={handleButtonClick}>
          Chọn ảnh
        </button>
        <SlPencil size={size / 6} color="white" />
        {allowDeleteAvatar && (
          <button className={styles.textButton} onClick={onClickDeleteAvatar}>
            Xoá ảnh
          </button>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}
