import React, { useEffect, useState } from "react";
import styles from "./user_info.module.scss";
import Popup from "reactjs-popup";
import CircleLoader from "../../components/CircleLoader";
import AlertError from "../../components/AlertError";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import Converter from "../../utils/converter";
import AlertDialog from "../../components/AlertDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moderatorAccountManagementService from "../../services/moderator_account_management.service";
import TimeUtils from "../../utils/time_utils";

const UserInfoDialog = ({ setShowDialog, user }) => {

    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [warning, setWarning] = useState("");
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [address, setAddress] = useState('');
    const [citizenIdentityCardImage, setCitizenIdentityCardImage] = useState(null);
    
    const [userData, setUserData] = useState(null);
    const [shouldShowDeleteImageDialog, setShouldShowDeleteImageDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        moderatorAccountManagementService.getUserInfo(user.userId)
            .then((data) => {
                setUserData(data);
                setCitizenIdentityCardImage(data.citizenIdentityCard);
            })
            .catch((err) => {
                let errorMessage = err.response?.data?.message;
                if (!errorMessage) {
                    errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau."
                }
                setShowDialog(false);
                setTimeout(() => {
                    alert(errorMessage);
                }, 500);
            })
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleChangeDateOfBirth = (date) => {
        setDateOfBirth(date.getTime());
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }

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

        setWarning("");

        setIsSendingRequest(true);
        setTimeout(() => {
            setIsSendingRequest(false);
        }, 1000)
    };

    const closeDialog = () => {
        setShowDialog(false);
    }

    const showDeleteImageDialog = () => {
        setShouldShowDeleteImageDialog(true);
    }

    return <Popup
        modal
        open
        overlayStyle={{ background: "#00000080" }}
        onClose={closeDialog}
        closeOnDocumentClick={false}
    >
        <AlertDialog
            isOpen={shouldShowDeleteImageDialog}
            title={"Thông báo"}
            message={"Bạn có muốn xoá hình ảnh người dùng này không? Điều này sẽ không thể hoàn tác!"}
            onClickPositiveButton={() => {
                
            }}
            onClickNegativeButton={() => {
                setShouldShowDeleteImageDialog(false);
            }}
            closeWhenClickOutside={true}
            shouldShowNegativeButton={true}
        />
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
            {
                userData ? (
                    <div className={styles.content}>
                        <div className={styles.infoContainer}>
                            <label className={styles.formHeader}>Thông tin cá nhân</label>
                            <div className={styles.form}>
                                <div className={styles.buttonsContainer}>
                                    {
                                        isEditing ? (
                                            <>
                                                <button
                                                    className={clsx(styles.cancelButton, styles.buttonStyle)}
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setWarning("");
                                                    }}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={clsx(styles.saveButton, styles.buttonStyle)}
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setWarning("");
                                                    }}
                                                >
                                                    Lưu
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={clsx(styles.editButton, styles.buttonStyle)}
                                                onClick={() => {
                                                    setIsEditing(true);
                                                }}
                                            >
                                                Sửa
                                            </button>
                                        )
                                    }
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Họ và tên</label>
                                    <div className={styles.inputWrapper}>
                                        {
                                            userData.name || isEditing ? (
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Nhập họ và tên"
                                                    value={name}
                                                    defaultValue={userData.name ?? ""}
                                                    disabled={!isEditing}
                                                    onChange={handleNameChange}
                                                />
                                            ) : (
                                                <span className={styles.unsetText} >Chưa có</span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="dateOfBirth">Ngày sinh</label>
                                    <div className={styles.inputWrapper}>
                                        {
                                            userData.dateOfBirth || isEditing ? (
                                                <DatePicker
                                                    selected={
                                                        userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date()
                                                    }
                                                    startOpen={false}
                                                    onChange={handleChangeDateOfBirth}
                                                    dateFormat="dd-MM-yyyy"
                                                    autoFocus={false}
                                                    disabled={!isEditing}
                                                />
                                            ) : (
                                                <span className={styles.unsetText} >Chưa có</span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">Giới tính</label>
                                    <div
                                        className={styles.radioButtonGroup}
                                        onChange={() => {
                                            console.log("changed: ");
                                        }}
                                    >
                                        <input 
                                            type="radio" 
                                            value="male" 
                                            name="gender" 
                                            disabled={!isEditing} 
                                        />
                                        <span style={{ cursor: "default" }} > Nam</span>
                                        <input 
                                            type="radio" 
                                            value="female" 
                                            name="gender" 
                                            style={{ marginLeft: 30 }} 
                                            disabled={!isEditing} 
                                        />
                                        <span style={{ cursor: "default" }} > Nữ</span>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="address">Địa chỉ</label>
                                    <div className={styles.inputWrapper}>
                                        {
                                            userData.address || isEditing ? (
                                                <input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Nhập địa chỉ"
                                                    defaultValue={userData.address ?? ""}
                                                    value={address}
                                                    disabled={!isEditing}
                                                    onChange={handleAddressChange}
                                                />
                                            ) : (
                                                <span className={styles.unsetText} >Chưa có</span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="image">Căn cước công dân</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            disabled={!isEditing}
                                            onChange={handleImageChange}
                                        />
                                        {
                                            userData.citizenIdentityCard && !isEditing && (
                                                <img
                                                    src={userData.citizenIdentityCard}
                                                    alt="Căn cước công dân"
                                                    className={styles.citizenIdentityCardImage}
                                                />
                                            )
                                        }
                                        {
                                            citizenIdentityCardImage && isEditing && (
                                                <img
                                                    src={citizenIdentityCardImage}
                                                    alt="Căn cước công dân"
                                                    className={styles.citizenIdentityCardImage}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoContainer}>
                            <label className={styles.formHeader}>Thông tin tài khoản</label>
                            <div className={styles.accountInfo}>
                                <span className={styles.avatarAndName}>
                                    <div className={styles.avatarWrapper}>
                                        <img src={"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-20.jpg"} alt="Avatar" />
                                        <div className={styles.overlayView}>
                                            <button className={styles.textButton} onClick={showDeleteImageDialog}>
                                                Xoá ảnh
                                            </button>
                                        </div>
                                    </div>
                                    <span className={styles.namesContainer}>
                                        <span className={styles.row}>
                                            <label className={styles.nameLabel}>Tên đăng nhập:</label>
                                            <input
                                                type="text"
                                                value={userData.userName}
                                                onChange={() => { }}
                                            />
                                        </span>
                                        <span className={styles.row}>
                                            <label className={styles.nameLabel}>Tên công khai:</label>
                                            <input
                                                type="text"
                                                value={userData.userPublicName ?? "Chưa có"}
                                                onChange={() => { }}
                                            />
                                            <button>Đổi tên</button>
                                        </span>
                                    </span>
                                </span>
                                <span className={styles.rowInfo}>
                                    <label className={styles.labelTitle}>Số dư:</label>
                                    <label className={clsx(styles.labelContent, styles.balance)}>{Converter.formatMoney(userData.amount)}</label>
                                </span>
                                <span className={styles.rowInfo}>
                                    <label className={styles.labelTitle}>Số nợ:</label>
                                    <label className={clsx(styles.labelContent, styles.owe)}>{Converter.formatMoney(userData.amountOwed)}</label>
                                </span>
                                <span className={styles.rowInfo}>
                                    <label className={styles.labelTitle}>Tình trạng:</label>
                                    <label className={styles.labelContent}>{user.disabledSessionId > -1 ? "Đã bị khóa" : "Đang hoạt động"}</label>
                                </span>
                                <span className={styles.rowInfo}>
                                    <label className={styles.labelTitle}>Ngày tham gia:</label>
                                    <label className={styles.labelContent}>{TimeUtils.formatTimestampToDateString(userData.createdDate)}</label>
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <label className={styles.loadingText}>Đang lấy dữ liệu...</label>
                )
            }
            <div className={styles.closeButton} onClick={closeDialog}>
                <IoCloseOutline color="#000" size={30} />
            </div>
        </div>
    </Popup>
}

export default UserInfoDialog;
