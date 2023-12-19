import React from "react";
import styles from "./moderator.module.scss";
import PATH from "../../enums/path.enum";
import ManagementPageHeader from "../../parts/ManagementPageHeader";
import ManagementPageNavGenerator from "../../parts/ManagementPageNavGenerator";
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
import TopupRequest from "./TopupRequest";
import SendingNotification from "./SendingNotification";
import ViewFeedback from "./ViewFeedback";
import PlayedTime from "./PlayedTime";

const ModeratorPages = () => {
  return (
    <div id={styles.root}>
      <ManagementPageHeader onClickSignOut={() => {}} />
      <ManagementPageNavGenerator
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
            page: TopupRequest,
          },
          {
            path: PATH.send_notification,
            text: "Gửi thông báo",
            activeIcon: IconSendNotificationActive,
            inactiveIcon: IconSendNotificationInactive,
            page: SendingNotification,
          },
          {
            path: PATH.view_feedback,
            text: "Xem góp ý",
            activeIcon: IconViewFeedbackActive,
            inactiveIcon: IconViewFeedbackInactive,
            page: ViewFeedback,
          },
          {
            path: PATH.played_time,
            text: "Thời gian chơi",
            activeIcon: IconPlayedTimeActive,
            inactiveIcon: IconPlayedTimeInactive,
            page: PlayedTime,
          },
        ]}
      />
    </div>
  );
};

export default ModeratorPages;
