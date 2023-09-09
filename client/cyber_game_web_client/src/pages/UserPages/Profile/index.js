import React, { useRef, useState } from "react";
import styles from "./profile.module.scss";
import AvatarPicker from "../../../components/AvatarPicker";
import ProfileDetailDialog from "./ingredient/ProfileDetailDialog";
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {
  const { auth } = useAuth();

  const [shouldShowProfileDetailDialog, setShouldShowProfileDetailDialog] =
    useState(false);

  const [base64Avatar, setBase64Avatar] = useState(null);
  const [imagePickingError, setImagePickingError] = useState(null);

  const fileInputRef = useRef(null);

  const onClickPickImage = () => {
    fileInputRef.current.click();
    if (!shouldShowProfileDetailDialog) {
      setShouldShowProfileDetailDialog(true);
    }
  };

  const onClickDeleteImage = () => {
    setBase64Avatar(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const image = new Image();

    const reader = new FileReader();
    reader.onload = function (readerEvent) {
      image.onload = function () {
        const width = image.width;
        const height = image.height;

        const minDimension = 300;
        const maxRatio = 4;

        if (width < minDimension || height < minDimension) {
          setImagePickingError(
            `Hình ảnh quá nhỏ. Yêu cầu kích thước tối thiểu ${minDimension}x${minDimension}.`
          );
          return;
        } else if (width >= height * maxRatio || height >= width * maxRatio) {
          setImagePickingError(
            `Hình ảnh quá dài. Một chiều không thể có kích thước gấp ${maxRatio} lần chiều còn lại.`
          );
          return;
        } else {
          setImagePickingError(null);
        }

        let newWidth, newHeight;

        if (width > height) {
          newHeight = minDimension;
          newWidth = Math.floor((width / height) * minDimension);
        } else {
          newWidth = minDimension;
          newHeight = Math.floor((height / width) * minDimension);
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        const resizedImage = canvas.toDataURL("image/jpeg");

        setBase64Avatar(resizedImage);
      };

      image.src = readerEvent.target.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id={styles.root}>
      <div className={styles.baseInfo}>
        <div className={styles.baseInfoOverlayBackground}>
          <div className={styles.baseInfoContentWarper}>
            <AvatarPicker
              size={192}
              onClickPickImage={onClickPickImage}
              image={auth?.avatar ?? null}
            />
            <div className={styles.nameWrapper}>
              {!auth?.hasVerified && (
                <button className={styles.hasNotVerified}>
                  Tài khoản chưa được xác thực
                </button>
              )}
              <span className={styles.name}>{auth?.name}</span>
            </div>
          </div>
        </div>
      </div>
      {shouldShowProfileDetailDialog && (
        <ProfileDetailDialog
          onClickDeleteImage={onClickDeleteImage}
          onClickPickImage={onClickPickImage}
          base64Avatar={base64Avatar}
          setBase64Avatar={setBase64Avatar}
          errorText={imagePickingError}
          setShouldShowProfileDetailDialog={setShouldShowProfileDetailDialog}
          setErrorText={setImagePickingError}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ProfilePage;
