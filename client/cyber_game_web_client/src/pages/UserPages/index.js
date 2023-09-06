import React, { useState } from "react";
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import styles from "./user_feature.module.scss";
import HomePage from "./Home";
import EventPages from "./EventPages";
import PromotionPages from "./PromotionPages";
import ProfilePage from "./Profile";
import ChatPage from "./Chat";
import NotificationPage from "./Notification";
import DepositMoneyPages from "./DepositMoneyPages";
import HomeActiveIcon from "../../assets/icons/ic_home_active.svg";
import HomeInactiveIcon from "../../assets/icons/ic_home_inactive.svg";
import PromotionActiveIcon from "../../assets/icons/ic_promotion_active.svg";
import PromotionInactiveIcon from "../../assets/icons/ic_promotion_inactive.svg";
import EventActiveIcon from "../../assets/icons/ic_event_active.svg";
import EventInactiveIcon from "../../assets/icons/ic_event_inactive.svg";
import ProfileActiveIcon from "../../assets/icons/ic_profile_active.svg";
import ProfileInactiveIcon from "../../assets/icons/ic_profile_inactive.svg";
import ChatActiveIcon from "../../assets/icons/ic_chat_active.svg";
import ChatInactiveIcon from "../../assets/icons/ic_chat_inactive.svg";
import NotificationActiveIcon from "../../assets/icons/ic_notification_active.svg";
import NotificationInactiveIcon from "../../assets/icons/ic_notification_inactive.svg";
import DepositMoneyActiveIcon from "../../assets/icons/ic_depositmoney_active.svg";
import DepositMoneyInactiveIcon from "../../assets/icons/ic_depositmoney_inactive.svg";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import clsx from "clsx";
import useNavigationChecking from "../../hooks/useNavigationChecking";
import PATH from "../../enums/path.enum";

const UserPages = () => {
  const [isAuth, setIsAuth] = useState(true);

  const navigate = useNavigate();

  const navigationChecking = useNavigationChecking();

  const canGoBack = navigationChecking[0];
  const canGoForward = navigationChecking[1];

  const NavLinkItem = (path, text, activeIcon, inactiveIcon) => {
    return (
      <li className={styles.navItem}>
        <NavLink to={path} className={styles.navLink}>
          {({ isActive, isPending }) => (
            <>
              <img
                className={styles.navIcon}
                src={isActive ? activeIcon : inactiveIcon}
              />
              <span
                className={clsx(
                  styles.navText,
                  isActive ? styles.navTextActive : styles.navTextInactive
                )}
                autoCorrect="false"
              >
                {text}
              </span>
            </>
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <div id={styles.root}>
      <nav className={styles.navContainer}>
        <ul className={styles.navBox}>
          {NavLinkItem(
            PATH.root,
            "Trang chủ",
            HomeActiveIcon,
            HomeInactiveIcon
          )}
          {NavLinkItem(
            PATH.promotion,
            "Khuyến mại",
            PromotionActiveIcon,
            PromotionInactiveIcon
          )}
          {NavLinkItem(
            PATH.event,
            "Sự kiện",
            EventActiveIcon,
            EventInactiveIcon
          )}
        </ul>

        <ul className={styles.navBox}>
          {NavLinkItem(
            PATH.profile,
            "Hồ sơ",
            ProfileActiveIcon,
            ProfileInactiveIcon
          )}
          {NavLinkItem(PATH.chat, "Tin nhắn", ChatActiveIcon, ChatInactiveIcon)}
          {NavLinkItem(
            PATH.notification,
            "Thông báo",
            NotificationActiveIcon,
            NotificationInactiveIcon
          )}
          {NavLinkItem(
            PATH.deposit_money,
            "Nạp tiền",
            DepositMoneyActiveIcon,
            DepositMoneyInactiveIcon
          )}
        </ul>

        <div className={styles.buttonsWrapper}>
          <button
            className={styles.buttonStyle}
            onClick={() => {
              window.open(`${window.location.origin}${PATH.moderator}`);
            }}
          >
            <span>Đi đến trang quản lý</span>
          </button>
          <button
            className={styles.buttonStyle}
            onClick={() => {
              window.open(`${window.location.origin}${PATH.admin}`);
            }}
          >
            <span>Đi đến trang Admin</span>
          </button>
        </div>
      </nav>

      <div className={styles.pageContent}>
        <div className={styles.overlay} />
        <div className={styles.header}>
          <div className={styles.directButtonContent}>
            <button
              className={clsx(
                styles.directButton,
                canGoBack && styles.directButtonActive
              )}
              onClick={() => {
                if (canGoBack) {
                  navigate(-1);
                }
              }}
            >
              <SlArrowLeft
                color="white"
                size={16}
                style={{ paddingRight: 2 }}
              />
            </button>
            <button
              className={clsx(
                styles.directButton,
                canGoForward && styles.directButtonActive
              )}
              onClick={() => {
                if (canGoForward) {
                  navigate(1);
                }
              }}
            >
              <SlArrowRight
                color="white"
                size={16}
                style={{ paddingLeft: 2 }}
              />
            </button>
          </div>
          <button
            className={styles.signInButton}
            onClick={() => {
              navigate("/dang-nhap");
            }}
          >
            <span className={styles.signInText}>Đăng nhập</span>
          </button>
        </div>
        <div className={styles.routes}>
          <Routes>
            <Route path={PATH.root} element={<HomePage />} />
            <Route path={PATH.promotion} element={<PromotionPages />} />
            <Route path={PATH.event} element={<EventPages />} />
            <Route path={PATH.profile} element={<ProfilePage />} />
            <Route path={PATH.chat} element={<ChatPage />} />
            <Route path={PATH.notification} element={<NotificationPage />} />
            <Route path={PATH.deposit_money} element={<DepositMoneyPages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserPages;
