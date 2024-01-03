import React, { useState } from "react";
import styles from "./reject_topup_request_dialog.module.scss";
import Popup from "reactjs-popup";
import CircleLoader from "../../components/CircleLoader";
import AlertError from "../../components/AlertError";
import { IoCloseOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import moderatorAccountManagementService from "../../services/moderator_account_management.service";

const RejectTopupRequestDialog = ({ setShowDialog, topupRequest, userName, onSuccess }) => {
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [warning, setWarning] = useState("");
    const [reason, setReason] = useState('');

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // // block topupRequest at least 1 day
        // if (unblockDate.getTime() < new Date().getTime() + 86400000) {
        //     return setWarning("Cần khoá ít nhất 1 ngày!");
        // }

        // if (reason.trim().length == 0) {
        //     return setWarning("Lý do không được để trống");
        // }

        // if (reason.trim().length > 100) {
        //     return setWarning("Lý do không được quá 100 kí tự");
        // }

        // setWarning("");

        // setIsSendingRequest(true);

        // moderatorAccountManagementService.blockUser(
        //     {
        //         topupRequestId: topupRequest.topupRequestId,
        //         reason: reason.trim(),
        //         unblockTime: unblockDate.getTime()
        //     }
        // ).then(() => {
        //     setShowDialog(false);
        //     onSuccess();
        // })
        //     .catch((error) => {
        //         let errorMessage = error?.response?.data?.message
        //         if (errorMessage) {
        //             setWarning(errorMessage);
        //         } else {
        //             setWarning("Đã có lỗi xảy ra!");
        //         }
        //     })
        //     .finally(() => {
        //         setIsSendingRequest(false);
        //     });
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
        <div className={styles.formContainer}>
            <h2>Xác nhận</h2>
            {
                warning &&
                <AlertError
                    text={warning}
                    style={{ marginBottom: 10 }}
                    textSize="0.875rem"
                    showIcon={false}
                />
            }
            <form onSubmit={handleSubmit}>
                <label>Bạn có chắc chắn muốn từ chối yêu cầu nạp <i>{topupRequest.finalAmount.formattedValue}</i> của <b>{userName}</b> không?</label>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Lý do</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id="reason"
                            placeholder="Nhập lý do ( không bắt buộc )"
                            value={reason}
                            onChange={handleReasonChange}
                        />
                    </div>
                </div>
                <div className={styles.confirmButton} onClick={handleSubmit}>
                    {
                        isSendingRequest
                            ? <CircleLoader size="15px" strokeWidth="2px" color="transparent" />
                            : <label htmlFor="confirm">Tôi chắc</label>
                    }
                </div>
            </form>
            <div className={styles.closeButton} onClick={closeDialog}>
                <IoCloseOutline color="#000" size={30} />
            </div>
        </div>
    </Popup>
}

export default RejectTopupRequestDialog;