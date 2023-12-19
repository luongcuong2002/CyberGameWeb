import React from "react";
import styles from "./chat_routing.module.scss";
import { Navigate, Route, Routes, NavLink } from "react-router-dom";
import ChatPage from "./ChatPage";
import CONSTANT from "../../../utils/constant";
import PATH from "../../../enums/path.enum";
import clsx from "clsx";

const ChatRouting = () => {
  const routes = [
    {
      path: "",
      name: "Kênh chung",
    },
    {
      path: CONSTANT.roomChatChannelName,
      name: "Kênh phòng nét",
    },
  ];

  const NavLinkItem = (path, avatar, chatName, recentMessage) => {
    return (
      <li className={styles.navItem}>
        <NavLink end to={path} style={{ textDecoration: "none" }}>
          {({ isActive, isPending }) => (
            <div
              className={styles.navLink}
              style={
                isActive ? { backgroundColor: "rgba(30, 64, 88, 0.5)" } : {}
              }
            >
              <img src={avatar} className={styles.avatar} />
              <div className={styles.nameAndMessage}>
                <p
                  className={clsx(
                    styles.chatName,
                    isActive ? styles.chatNameActive : styles.chatNameInactive
                  )}
                >
                  {chatName}
                </p>
                <p className={styles.newestMessage}>{recentMessage}</p>
              </div>
            </div>
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.chatSideBar}>
        <ul style={{ padding: 0 }}>
          {routes.map((element) => {
            const path = !element.path
              ? `${PATH.chat}`
              : `${PATH.chat}/${element.path}`;

            return NavLinkItem(
              path,
              "https://i.pinimg.com/originals/8d/8b/5a/8d8b5ac326b638c35f38719dd061fc4f.jpg",
              element.name,
              "Hello, how are you?"
            );
          })}
        </ul>
      </div>
      <Routes>
        {routes.map((element) => {
          return (
            <Route
              path={`/${element.path}`}
              element={<ChatPage chatChannel={element.path} />}
            />
          );
        })}
        <Route path="/*" element={<Navigate to={PATH.chat} />} />
      </Routes>
    </div>
  );
};

export default ChatRouting;
