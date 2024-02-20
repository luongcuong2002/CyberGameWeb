import React, { useEffect } from "react";
import styles from "./admin.module.scss";
import PATH from "../../enums/path.enum";
import ManagementPageHeader from "../../parts/ManagementPageHeader";
import ManagementPageNavGenerator from "../../parts/ManagementPageNavGenerator";
import { ReactComponent as IconAccountManagement } from "../../assets/icons/tab_account_management_icon.svg";
import ModeratorAccount from "./ModeratorAccount";
import { fetchModeratorAccountTableData } from "../../slices/moderator_account_table_data.slice";
import { useDispatch } from "react-redux";

const AdminPages = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch mọi thứ ở đây

    // load user table data
    dispatch(fetchModeratorAccountTableData({
      pageNo: 1,
      searchTerm: '',
    }));

  }, []);

  return (
    <div id={styles.root}>
      <ManagementPageHeader onClickSignOut={() => { }} />
      <ManagementPageNavGenerator
        parentRoute={PATH.admin}
        activeIconColor={"#FFFFFF"}
        inactiveIconColor={"#919496"}
        routes={[
          {
            path: PATH.moderator_account_management,
            text: "Quản lý tài khoản",
            icon: IconAccountManagement,
            page: ModeratorAccount,
          },
        ]}
      />
    </div>
  );
};

export default AdminPages;
 