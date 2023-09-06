import React from "react";
import styles from "./moderator.module.scss";
import PATH from "../../enums/path.enum";

const ModeratorPages = () => {
  const formatPath = (originalPath) => {
    if (originalPath === PATH.moderator) {
      return "/";
    }
    return originalPath.replace(PATH.moderator, "");
  };

  return (
    <div id={styles.root}>
      <h1>Moderator Pages</h1>
    </div>
    // <Routes>
    //   <Route path={formatPath(PATH.admin)} element={<AdminPage />} />
    // </Routes>
  );
};

export default ModeratorPages;
