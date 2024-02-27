import React, { useState } from "react";
import styles from "./main_page_2.module.scss";
import {
    NavLink,
} from "react-router-dom";

import PATH from "../../enums/path.enum";
import BackgroundImage from "../../assets/imgs/background.jpg";
import Logo from "../../assets/imgs/logo.jpeg";
import { ReactComponent as MenuIcon } from "../../assets/icons/ic_menu.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/ic_phone.svg";
import { ReactComponent as MapIcon } from "../../assets/icons/ic_map.svg";
import clsx from "clsx";

const MainPages2 = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuIconClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleAddressClick = () => {
        window.open("https://www.google.com/maps?q=21.0333,105.8500");
    }

    const NavLinkItem = (path, text) => {
        return (
            <li className={styles.navItem}>
                <NavLink to={path} className={styles.navLink}>
                    <label className={styles.navLinkText}>{text}</label>
                </NavLink>
            </li>
        );
    };

    return (
        <div id={styles.root}>
            <div id={styles.contact}>
                <span className={styles.wrapper}>
                    <PhoneIcon className={styles.contactIcon} />
                    <label>097 208 58 01</label>
                </span>
                <div className={styles.divider} />
                <span
                    className={clsx(styles.wrapper, styles.addressWrapper)}
                    onClick={handleAddressClick}
                >
                    <MapIcon className={styles.contactIcon} />
                    <label style={{cursor: "pointer"}}>Số nhà 39, Đường Vành Đai, Canh Nậu, Thạch Thất, Hà Nội</label>
                </span>
            </div>
            <header id={styles.header}>
                <div className={styles.headerLeftPanel}>
                    <img src={Logo} alt="logo" />
                    <label>HT Gaming</label>
                </div>
                <div className={clsx(styles.headerRightPanel, isMenuOpen && styles.headerRightPanelOpen)}>
                    <nav>
                        <ul className={styles.navBox}>
                            {
                                NavLinkItem(PATH.promotion, "Tài khoản miễn phí")
                            }
                            {
                                NavLinkItem(PATH.event, "Sự kiện")
                            }
                        </ul>
                    </nav>
                    <button className={styles.loginButton}>
                        Đăng nhập
                    </button>
                </div>
                <MenuIcon
                    onClick={handleMenuIconClick}
                    className={styles.menuIcon}
                    color="#FFFFFF"
                />
            </header>
            <div id={styles.content}>
                <img className={styles.backgroundImage} src={BackgroundImage} alt="background" />
                <p className={styles.contentText}>
                    Website này được tạo ra nhằm mang đến nhiều quyền lợi cho khách hàng. Trở thành hội viên của chúng tôi để nhận được nhiều ưu đãi hấp dẫn.
                </p>
            </div>
        </div>
    );
};

export default MainPages2;
