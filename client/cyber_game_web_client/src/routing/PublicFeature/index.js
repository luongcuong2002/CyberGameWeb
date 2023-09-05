import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import styles from "./publicfeature.module.scss";
import HomePage from "../../pages/Home";
import EventPage from "../../pages/Event";
import PromotionPage from "../../pages/Promotion";
import HomeActiveIcon from "../../assets/icons/ic_home_active.svg";
import HomeInactiveIcon from "../../assets/icons/ic_home_inactive.svg";
import PromotionActiveIcon from "../../assets/icons/ic_promotion_active.svg";
import PromotionInactiveIcon from "../../assets/icons/ic_promotion_inactive.svg";
import EventActiveIcon from "../../assets/icons/ic_event_active.svg";
import EventInactiveIcon from "../../assets/icons/ic_event_inactive.svg";
import clsx from "clsx";

const PublicFeature = () => {
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
          {NavLinkItem("/", "Trang chủ", HomeActiveIcon, HomeInactiveIcon)}
          {NavLinkItem(
            "/khuyen-mai",
            "Khuyến mại",
            PromotionActiveIcon,
            PromotionInactiveIcon
          )}
          {NavLinkItem(
            "/su-kien",
            "Sự kiện",
            EventActiveIcon,
            EventInactiveIcon
          )}
        </ul>
      </nav>

      <div className={styles.pageContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/khuyen-mai" element={<PromotionPage />} />
          <Route path="/su-kien" element={<EventPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default PublicFeature;
