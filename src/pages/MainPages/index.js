import React, { useEffect, useRef, useState } from "react";
import {
  Route,
  Routes,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import styles from "./main_pages.module.scss";
import HomePage from "./Home";
import EventPages from "./EventPages";
import PromotionPages from "./PromotionPages";
import ProfilePage from "./Profile";
import ChatRouting from "./Chat";
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
import ROLE from "../../enums/role.enum";
import Converter from "../../utils/converter";
import NeedSignInPage from "../NeedSignIn";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserNull } from "../../slices/user.slice";

const MainPages = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
                alt=""
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
    window.open(`${window.location.origin}${PATH.account}`);
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
    dispatch(setUserNull(null));
    navigate(PATH.root);
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

        {user.userId && (
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

            {(user.role === ROLE.admin || user.role === ROLE.moderator) && (
              <div className={styles.buttonsWrapper}>
                <button
                  className={styles.buttonStyle}
                  onClick={onOpenModeratorTab}
                >
                  <span>Đi đến trang quản lý</span>
                </button>
                {user.role === ROLE.admin && (
                  <button
                    className={styles.buttonStyle}
                    onClick={onOpenAdminTab}
                  >
                    <span>Đi đến trang Admin</span>
                  </button>
                )}
              </div>
            )}
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
          {user.userId ? (
            <div className={styles.userInfoContainer}>
              <button className={styles.coinButton}>
                {Converter.formatMoney(user.amount)}
              </button>
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
                            alt=""
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
                    alt=""
                    className={
                      user.avatar
                        ? styles.userWithAvatar
                        : styles.userWithoutAvatar
                    }
                    src={user.avatar ?? ProfileInactiveIcon}
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
            <Route
              path={PATH.profile}
              element={user.userId ? <ProfilePage /> : <NeedSignInPage />}
            />
            <Route
              path={`${PATH.chat}/*`}
              element={user.userId ? <ChatRouting /> : <NeedSignInPage />}
            />
            <Route
              path={PATH.notification}
              element={user.userId ? <NotificationPage /> : <NeedSignInPage />}
            />
            <Route
              path={PATH.deposit_money}
              element={user.userId ? <DepositMoneyPages /> : <NeedSignInPage />}
            />
            <Route path={"/*"} element={<Navigate to={PATH.root} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPages;
