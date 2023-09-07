import React, { useEffect, useRef, useState } from "react";
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
import NewTabIcon from "../../assets/icons/ic_new_tab.svg";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import clsx from "clsx";
import useNavigationChecking from "../../hooks/useNavigationChecking";
import PATH from "../../enums/path.enum";

const UserPages = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [hasPhoto, setHasPhoto] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  const navigationChecking = useNavigationChecking();

  const canGoBack = navigationChecking[0];
  const canGoForward = navigationChecking[1];

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const { target } = event;

      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(target)) {
        if (openPopup) {
          setOpenPopup(false);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [openPopup]);

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

  const onOpenAccountTab = () => {
    window.open(`${window.location.origin}${PATH.admin}`);
    setOpenPopup(false);
  };

  const onOpenModeratorTab = () => {
    window.open(`${window.location.origin}${PATH.moderator}`);
  };

  const onOpenAdminTab = () => {
    window.open(`${window.location.origin}${PATH.admin}`);
  };

  const onClickUserAvatar = () => {
    setOpenPopup(!openPopup);
  };

  const onSignOut = () => {
    setOpenPopup(false);
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

        {isAuth && (
          <>
            <ul className={styles.navBox}>
              {NavLinkItem(
                PATH.profile,
                "Hồ sơ",
                ProfileActiveIcon,
                ProfileInactiveIcon
              )}
              {NavLinkItem(
                PATH.chat,
                "Tin nhắn",
                ChatActiveIcon,
                ChatInactiveIcon
              )}
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
                onClick={onOpenModeratorTab}
              >
                <span>Đi đến trang quản lý</span>
              </button>
              <button className={styles.buttonStyle} onClick={onOpenAdminTab}>
                <span>Đi đến trang Admin</span>
              </button>
            </div>
          </>
        )}
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
          {isAuth ? (
            <div className={styles.userInfoContainer}>
              <button className={styles.coinButton}>50.000 VNĐ</button>
              <div className={styles.userAvatarAndPopupMenu} ref={wrapperRef}>
                {openPopup && (
                  <div className={styles.popupMenu}>
                    <ul className={styles.popupItemList}>
                      <li>
                        <button
                          className={styles.popupItem}
                          onClick={onOpenAccountTab}
                        >
                          <span style={{ paddingTop: 2.5 }}>Tài khoản</span>
                          <img
                            src={NewTabIcon}
                            style={{ width: 15, height: 15 }}
                          />
                        </button>
                      </li>
                      <li className={styles.divider}></li>
                      <li>
                        <button
                          className={styles.popupItem}
                          onClick={onSignOut}
                        >
                          <span style={{ paddingTop: 2.5 }}>Đăng xuất</span>
                          <></>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                <button
                  className={styles.userAvatarButton}
                  onClick={onClickUserAvatar}
                >
                  <img
                    className={
                      hasPhoto
                        ? styles.userWithAvatar
                        : styles.userWithoutAvatar
                    }
                    src={
                      hasPhoto
                        ? "https://i.vietgiaitri.com/2020/11/12/vuong-anh-tu-tung-bi-tu-ti-ve-ngoai-hinh-quyet-tam-giam-30kg-de-lam-ca-si-e86-5368142.png"
                        : ProfileInactiveIcon
                    }
                  />
                </button>
              </div>
            </div>
          ) : (
            <button
              className={styles.signInButton}
              onClick={() => {
                navigate("/dang-nhap");
              }}
            >
              <span className={styles.signInText}>Đăng nhập</span>
            </button>
          )}
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
