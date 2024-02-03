import React from "react";
import styles from "./deposit_money.module.scss";
import { NavLink } from "react-router-dom";
import backgroundImage from "../../../assets/imgs/dark_low_poly_background.jpg";

const DepositMoneyPages = () => {

  const NavLinkItem = (path, text) => {
    return (
      <NavLink to={path} className={styles.navLink}>
        {({ isActive, isPending }) => (
          <span
            className={styles.buttonWayra}
            autoCorrect="false"
          >
            {text}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <div id={styles.root}>
      <img className={styles.background} src={backgroundImage} draggable={false} />
      <nav className={styles.navContainer}>
        {
          NavLinkItem("/deposit-money", "Deposit Money")
        }
      </nav>
    </div>
  );
};

export default DepositMoneyPages;
