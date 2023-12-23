import React from "react";
import styles from "./account.module.scss";
import ManagementPageHeader from "../../parts/ManagementPageHeader";
import ManagementPageNavGenerator from "../../parts/ManagementPageNavGenerator";
import PATH from "../../enums/path.enum";
import IconAccountInfoActive from "../../assets/icons/tab_account_info_icon_active.svg";
import IconAccountInfoInactive from "../../assets/icons/tab_account_info_icon_inactive.svg";
import IconTransactionHistoryActive from "../../assets/icons/tab_transaction_history_icon_active.svg";
import IconTransactionHistoryInactive from "../../assets/icons/tab_transaction_history_icon_inactive.svg";
import IconDebtDetailActive from "../../assets/icons/tab_debt_details_icon_active.svg";
import IconDebtDetailInactive from "../../assets/icons/tab_debt_details_icon_inactive.svg";
import IconChangePasswordActive from "../../assets/icons/tab_changing_password_icon_active.svg";
import IconChangePasswordInactive from "../../assets/icons/tab_changing_password_icon_inactive.svg";
import IconFeedbackActive from "../../assets/icons/tab_feedback_icon_active.svg";
import IconFeedbackInactive from "../../assets/icons/tab_feedback_icon_inactive.svg";
import AccountInfo from "./AccountInfo";
import TransactionHistory from "./TransactionHistory";
import DebtDetail from "./DebtDetail";
import ChangePassword from "./ChangePassword";
import SendFeedback from "./SendFeedback";

const AccountPages = () => {
  return (
    <div id={styles.root}>
      <ManagementPageHeader onClickSignOut={() => { }} />
      <ManagementPageNavGenerator
        parentRoute={PATH.account}
        routes={[
          {
            path: PATH.account_info,
            text: "Thông tin tài khoản",
            activeIcon: IconAccountInfoActive,
            inactiveIcon: IconAccountInfoInactive,
            page: AccountInfo,
          },
          {
            path: PATH.transaction_history,
            text: "Lịch sử giao dịch",
            activeIcon: IconTransactionHistoryActive,
            inactiveIcon: IconTransactionHistoryInactive,
            page: TransactionHistory,
          },
          {
            path: PATH.debt_detail,
            text: "Chi tiết số nợ",
            activeIcon: IconDebtDetailActive,
            inactiveIcon: IconDebtDetailInactive,
            page: DebtDetail,
          },
          {
            path: PATH.change_password,
            text: "Đổi mật khẩu",
            activeIcon: IconChangePasswordActive,
            inactiveIcon: IconChangePasswordInactive,
            page: ChangePassword,
          },
          {
            path: PATH.feedback,
            text: "Góp ý",
            activeIcon: IconFeedbackActive,
            inactiveIcon: IconFeedbackInactive,
            page: SendFeedback,
          },
        ]}
      />
    </div>
  );
}

export default AccountPages;