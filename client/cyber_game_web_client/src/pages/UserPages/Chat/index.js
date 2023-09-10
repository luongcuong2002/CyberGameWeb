import React from "react";
import styles from "./chat_routing.module.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatPage from "./ChatPage";
import CONSTANT from "../../../utils/constant";
import PATH from "../../../enums/path.enum";

const ChatRouting = () => {
  const routes = ["", CONSTANT.roomChatChannelName, "69", "20"];

  return (
    <div className={styles.root}>
      <Routes>
        {routes.map((element) => {
          return <Route path={`/${element}`} element={<ChatPage />} />;
        })}
        <Route path="/*" element={<Navigate to={PATH.chat} />} />
      </Routes>
    </div>
  );
};

export default ChatRouting;
