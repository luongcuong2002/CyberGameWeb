import React from "react";
import styles from "./moderator.module.scss";
import PATH from "../../enums/path.enum";
import AdminHeader from "../../parts/AdminHeader";
import AdminNavGenerator from "../../parts/AdminNavGenerator";
import AccountManagement from "./AccountManagement";
import IconAccountManagementActive from "../../assets/icons/tab_account_management_icon_active.svg";
import IconAccountManagementInactive from "../../assets/icons/tab_account_management_icon_inactive.svg";
import IconApprovalTopUpRequestActive from "../../assets/icons/tab_topup_request_icon_active.svg";
import IconApprovalTopUpRequestInactive from "../../assets/icons/tab_topup_request_icon_inactive.svg";
import IconSendNotificationActive from "../../assets/icons/tab_send_notification_icon_active.svg";
import IconSendNotificationInactive from "../../assets/icons/tab_send_notification_icon_inactive.svg";
import IconViewFeedbackActive from "../../assets/icons/tab_view_feedback_icon_active.svg";
import IconViewFeedbackInactive from "../../assets/icons/tab_view_feedback_icon_inactive.svg";
import IconPlayedTimeActive from "../../assets/icons/tab_played_time_icon_active.svg";
import IconPlayedTimeInactive from "../../assets/icons/tab_played_time_icon_inactive.svg";

const ModeratorPages = () => {
  return (
    <div id={styles.root}>
      <AdminHeader onClickSignOut={() => {}} />
      <AdminNavGenerator
        routes={[
          {
            path: PATH.account_management,
            text: "Quản lý tài khoản",
            activeIcon: IconAccountManagementActive,
            inactiveIcon: IconAccountManagementInactive,
            page: AccountManagement,
          },
          {
            path: PATH.approval_topup_request,
            text: "Duyệt yêu cầu nạp tiền",
            activeIcon: IconApprovalTopUpRequestActive,
            inactiveIcon: IconApprovalTopUpRequestInactive,
            page: AccountManagement,
          },
          {
            path: PATH.send_notification,
            text: "Gửi thông báo",
            activeIcon: IconSendNotificationActive,
            inactiveIcon: IconSendNotificationInactive,
            page: AccountManagement,
          },
          {
            path: PATH.view_feedback,
            text: "Xem góp ý",
            activeIcon: IconViewFeedbackActive,
            inactiveIcon: IconViewFeedbackInactive,
            page: AccountManagement,
          },
          {
            path: PATH.played_time,
            text: "Thời gian chơi",
            activeIcon: IconPlayedTimeActive,
            inactiveIcon: IconPlayedTimeInactive,
            page: AccountManagement,
          },
        ]}
      />
    </div>
  );
};

export default ModeratorPages;
