import React from "react";
import styles from "./management_page_nav_generator.module.scss";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import Converter from "../../utils/converter.js";
import PATH from "../../enums/path.enum.js";

const ManagementPageNavGenerator = ({ routes, parentRoute }) => {
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
          {routes.map((route) => {
            return (
              <Route
                path={Converter.formatPath(parentRoute, route.path)}
                element={<route.page />}
              />
            );
          })}
          <Route path="*" element={<Navigate to={routes[0].path} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagementPageNavGenerator;