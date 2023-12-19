import React from "react";
import styles from "./admin_nav_generator.module.scss";
import { NavLink, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import AccountManagement from "../../pages/ModeratorPages/AccountManagement";

const AdminNavGenerator = ({ routes }) => {
  const NavLinkItem = (path, text, activeIcon, inactiveIcon) => {
    return (
      <li>
        <NavLink to={path} className={styles.navLink}>
          {({ isActive, isPending }) => (
            <>
              {isActive && <div className={styles.mark} />}
              <img
                className={styles.navIcon}
                alt=""
                src={isActive ? activeIcon : inactiveIcon}
              />
              <span
                className={clsx(
                  styles.navText,
                  isActive ? styles.activeColor : styles.inactiveColor
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
        <ul>
          {routes.map((route) => {
            return NavLinkItem(
              route.path,
              route.text,
              route.activeIcon,
              route.inactiveIcon
            );
          })}
        </ul>
      </nav>
      <div className={styles.routes}>
        <Routes>
            {
                routes.map((route) => {
                    return <Route path={route.path} element={<AccountManagement />} />
                })
            }
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavGenerator;
