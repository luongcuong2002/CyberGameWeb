import React, { useEffect, useState } from "react";
import styles from "./user_info.module.scss";
import Popup from "reactjs-popup";
import AlertError from "../../components/AlertError";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import Converter from "../../utils/converter";
import AlertDialog from "../../components/AlertDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moderatorAccountManagementService from "../../services/moderator_account_management.service";
import TimeUtils from "../../utils/time_utils";
import GENDER from "../../enums/gender.enum";
import is from "date-fns/locale/is";

const UserInfoDialog = ({ setShowDialog, user }) => {

    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [warning, setWarning] = useState("");
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date().getTime());
    const [gender, setGender] = useState(GENDER.male);
    const [address, setAddress] = useState('');
    const [citizenIdentityCardImage, setCitizenIdentityCardImage] = useState(null);
    
    const [userData, setUserData] = useState(null);
    const [shouldShowDeleteImageDialog, setShouldShowDeleteImageDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);

    useEffect(() => {
        moderatorAccountManagementService.getUserInfo(user.userId)
            .then((data) => {
                console.log(data);
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

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleUpdateUserInfo = (e) => {
        e.preventDefault();

        if (!name) {
            return setWarning("Tên đăng nhập không được để trống!");
        }

        // check if date of birth is valid, must be at least 5 years old
        if (!dateOfBirth || dateOfBirth >= (new Date().getTime() - 5 * 365 * 24 * 60 * 60 * 1000) ) {
            return setWarning("Ngày sinh không hợp lệ!");
        }

        if (!address) {
            return setWarning("Địa chỉ không được để trống!");
        }

        if (
            name == userData?.realName && 
            dateOfBirth == userData?.dateOfBirth && 
            address == userData?.address && 
            gender == userData?.gender
        ) {
            return setWarning("Không có gì thay đổi!");
        }

        setWarning("");

        const updateData = {
            realName: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            address: address,
            //citizenIdentityCard: citizenIdentityCardImage,
        };

        setIsSendingRequest(true);
        moderatorAccountManagementService.updateUserInfo(user.userId, updateData)
            .then(() => {
                setUserData({
                    ...userData,
                    ...updateData
                });
                setIsEditing(false);
            })
            .catch((err) => {
                let errorMessage = err.response?.data?.message;
                if (!errorMessage) {
                    errorMessage = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
                }
                setWarning(errorMessage);
            })
            .finally(() => {
                setIsSendingRequest(false);
            })
    };

    const closeDialog = () => {
        setShowDialog(false);
    }

    const showDeleteImageDialog = () => {
        setShouldShowDeleteImageDialog(true);
    }

    const onClickRenameButton = () => {
        if (isRenaming) {
            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
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
            <div className={styles.content}>
                {
                    userData && (
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
                                                    disabled={isSendingRequest}
                                                >
                                                    Huỷ
                                                </button>
                                                <button
                                                    className={clsx(styles.saveButton, styles.buttonStyle)}
                                                    onClick={handleUpdateUserInfo}
                                                    disabled={isSendingRequest}
                                                >
                                                    Lưu
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={clsx(styles.editButton, styles.buttonStyle)}
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setName(userData.realName);
                                                    setDateOfBirth(userData.dateOfBirth);
                                                    setGender(userData.gender);
                                                    setAddress(userData.address);
                                                }}
                                                disabled={isSendingRequest}
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
                                            userData.realName || isEditing ? (
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Nhập họ và tên"
                                                    value={isEditing ? name : userData.realName}
                                                    disabled={!isEditing || isSendingRequest}
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
                                                        isEditing || !userData.dateOfBirth ? new Date(dateOfBirth) : new Date(userData.dateOfBirth)
                                                    }
                                                    startOpen={false}
                                                    onChange={handleChangeDateOfBirth}
                                                    dateFormat="dd-MM-yyyy"
                                                    autoFocus={false}
                                                    disabled={!isEditing || isSendingRequest}
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
                                        onChange={handleGenderChange}
                                    >
                                        <input
                                            type="radio"
                                            value="male"
                                            name="gender"
                                            checked={
                                                isEditing ? (gender == GENDER.male) :
                                                    ((userData.gender && userData.gender == GENDER.male) ?? false)}
                                            disabled={!isEditing || isSendingRequest}
                                        />
                                        <span style={{ cursor: "default" }} > Nam</span>
                                        <input
                                            type="radio"
                                            value="female"
                                            name="gender"
                                            checked={
                                                isEditing ? (gender == GENDER.female) :
                                                    ((userData.gender && userData.gender == GENDER.female) ?? false)}
                                            style={{ marginLeft: 30 }}
                                            disabled={!isEditing || isSendingRequest}
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
                                                    value={isEditing ? address : userData.address}
                                                    disabled={!isEditing || isSendingRequest}
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
                                            disabled={!isEditing || isSendingRequest}
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
                    )
                }
                {
                    userData && (
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
                                            <label className={styles.nameContent}>{userData.userName}</label>
                                        </span>
                                        <span className={styles.row}>
                                            <label className={styles.nameLabel}>Tên công khai:</label>
                                            <label className={styles.nameContent}>{userData.userPublicName ?? "Chưa có"}</label>
                                            <button onClick={onClickRenameButton}>Đổi tên</button>
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
                                    <label className={styles.labelTitle}>Hạng thành viên:</label>
                                    <label className={clsx(styles.labelContent, styles.membershipClass)}>{userData.membershipClass}</label>
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
                    )
                }
                {
                    !userData && (
                        <label className={styles.loadingText}>Đang lấy dữ liệu...</label>
                    )
                }
            </div>
            <div className={styles.closeButton} onClick={closeDialog}>
                <IoCloseOutline color="#000" size={30} />
            </div>
        </div>
    </Popup>
}

export default UserInfoDialog;
