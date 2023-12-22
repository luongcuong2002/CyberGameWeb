import React, { useState } from "react";
import styles from "./user_info.module.scss";
import Popup from "reactjs-popup";
import CircleLoader from "../../components/CircleLoader";
import AlertError from "../../components/AlertError";
import { IoCloseOutline } from "react-icons/io5";
import InputChecker from "../../utils/input_checker";
import clsx from "clsx";
import Converter from "../../utils/converter";

const UserInfoDialog = ({ setShowDialog, user }) => {

    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [warning, setWarning] = useState("");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [citizenIdentityCardImage, setCitizenIdentityCardImage] = useState(null);

    const handleNameChange = (event) => {
        const value = event.target.value;
        if (InputChecker.isAlphanumeric(value)) {
            setName(event.target.value.toUpperCase());
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const image = new Image();

        const reader = new FileReader();
        reader.onload = function (readerEvent) {
            image.onload = function () {
                const width = image.width;
                const height = image.height;

                const minDimension = 400;
                const maxRatio = 4;

                if (width < minDimension || height < minDimension) {
                    setWarning(
                        `Hình ảnh quá nhỏ. Yêu cầu kích thước tối thiểu ${minDimension}x${minDimension}.`
                    );
                    return setCitizenIdentityCardImage(null);
                } else if (width >= height * maxRatio || height >= width * maxRatio) {
                    setWarning(
                        `Hình ảnh quá dài. Một chiều không thể có kích thước gấp ${maxRatio} lần chiều còn lại.`
                    );
                    return setCitizenIdentityCardImage(null);
                } else {
                    setWarning("");
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

                setCitizenIdentityCardImage(resizedImage);
            };

            image.src = readerEvent.target.result;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            return setWarning("Tên đăng nhập không được để trống!");
        }

        if (!password) {
            return setWarning("Mật khẩu không được để trống!");
        }

        setWarning("");

        setIsSendingRequest(true);
        setTimeout(() => {
            setIsSendingRequest(false);
        }, 1000)
    };

    const closeDialog = () => {
        setShowDialog(false);
    }

    return <Popup
        modal
        open
        overlayStyle={{ background: "#00000080" }}
        onClose={closeDialog}
        closeOnDocumentClick={false}
    >
        <div className={styles.container}>
            <h2>Thông tin</h2>
            {
                warning &&
                <AlertError
                    text={warning}
                    style={{ marginBottom: 10 }}
                    textSize="0.875rem"
                    showIcon={false}
                />
            }
            <div className={styles.content}>
                <div className={styles.infoContainer}>
                    <label className={styles.formHeader}>Thông tin cá nhân</label>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Họ và tên</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nhập họ và tên"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dateOfBirth">Ngày sinh</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="image">Căn cước công dân</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    onChange={handleImageChange}
                                />
                                {
                                    citizenIdentityCardImage &&
                                    <img
                                        src={citizenIdentityCardImage}
                                        alt="Căn cước công dân"
                                        className={styles.citizenIdentityCardImage}
                                    />
                                }
                            </div>
                        </div>
                    </form>
                </div>
                
                <div className={styles.infoContainer}>
                    <label className={styles.formHeader}>Thông tin tài khoản</label>
                    <div className={styles.accountInfo}>
                        <span className={styles.avatarAndName}>
                            <div className={styles.avatarWrapper}>
                                <img src={"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-20.jpg"} alt="Avatar" />
                                <button>Đổi ảnh</button>
                            </div>
                            <span className={styles.namesContainer}>
                                <span className={styles.row}>
                                    <label className={styles.nameLabel}>Tên đăng nhập:</label>
                                    <input
                                        type="text"
                                        value={user.userName}
                                        onChange={() => { }}
                                    />
                                </span>
                                <span className={styles.row}>
                                    <label className={styles.nameLabel}>Tên công khai:</label>
                                    <input 
                                        type="text"
                                        value={user.userPublicName}
                                        onChange={() => {}}
                                    />
                                    <button>Đổi tên</button>
                                </span>
                            </span>
                        </span>
                        <span className={styles.rowInfo}>
                            <label className={styles.labelTitle}>Số dư:</label>
                            <label className={clsx(styles.labelContent, styles.balance)}>{Converter.formatMoney(user.amount)}</label>
                        </span>
                        <span className={styles.rowInfo}>
                            <label className={styles.labelTitle}>Số nợ:</label>
                            <label className={clsx(styles.labelContent, styles.owe)}>{Converter.formatMoney(user.amountOwed)}</label>
                        </span>
                        <span className={styles.rowInfo}>
                            <label className={styles.labelTitle}>Tình trạng:</label>
                            <label className={styles.labelContent}>{user.disabledSession ? "Đã bị khóa" : "Đang hoạt động"}</label>
                        </span>
                        <span className={styles.rowInfo}>
                            <label className={styles.labelTitle}>Ngày tham gia:</label>
                            <label className={styles.labelContent}>{user.createdDate}</label>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.closeButton} onClick={closeDialog}>
                <IoCloseOutline color="#000" size={30} />
            </div>
        </div>
    </Popup>
}

export default UserInfoDialog;
