import React from "react";
import styles from "./admin.module.scss";
import PATH from "../../enums/path.enum";

const AdminPages = () => {
  const formatPath = (originalPath) => {
    if (originalPath === PATH.admin) {
      return "/";
    }
    return originalPath.replace(PATH.admin, "");
  };

  return (
    <div id={styles.root}>
      <h1>Admin Page</h1>
    </div>
    // <Routes>
    //   <Route path={formatPath(PATH.admin)} element={<AdminPage />} />
    // </Routes>
  );
};

export default AdminPages;
