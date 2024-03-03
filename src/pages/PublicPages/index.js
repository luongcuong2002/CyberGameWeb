import React, { useState, useEffect, useRef } from "react";
import styles from "./public_pages.module.scss";
import {
    NavLink, Routes, Route
} from "react-router-dom";

import PATH from "../../enums/path.enum";
import BackgroundImage from "../../assets/imgs/background.jpg";
import Logo from "../../assets/imgs/logo.jpeg";
import { ReactComponent as MenuIcon } from "../../assets/icons/ic_menu.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/ic_phone.svg";
import { ReactComponent as MapIcon } from "../../assets/icons/ic_map.svg";
import clsx from "clsx";
import Home from "./Home";
import FreeAccount from "./FreeAccount";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/user.slice";
import { Navigate, useNavigate } from "react-router-dom";

const MainPages2 = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser)

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const refContactBar = useRef(null);
    const refHeader = useRef(null);
    const refContent = useRef(null);

    const handleMenuIconClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleAddressClick = () => {
        window.open("https://www.google.com/maps?q=21.0333,105.8500");
    }

    const handleLoginButtonClick = () => {
        navigate(PATH.signIn);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (refContactBar.current && refHeader.current && refContent.current) {
                const windowScrollY = window.scrollY;
                const contactBarHeight = refContactBar.current.clientHeight;
                const headerHeight = refHeader.current.clientHeight;

                // change contact bar top position
                refContactBar.current.style.top = `${Math.max(-windowScrollY, -contactBarHeight)}px`;
                // change header top position
                refHeader.current.style.top = `${Math.max(contactBarHeight - windowScrollY, 0)}px`;
                // change content margin-top position
                refContent.current.style.marginTop = `${headerHeight + contactBarHeight}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const NavLinkItem = (path, text) => {
        return (
            <li className={styles.navItem}>
                <NavLink 
                    to={path} 
                    className={styles.navLink}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <label className={styles.navLinkText}>{text}</label>
                </NavLink>
            </li>
        );
    };

    return (
        <div id={styles.root}>
            <div ref={refContactBar} id={styles.contact}>
                <span className={styles.wrapper}>
                    <PhoneIcon className={styles.contactIcon} />
                    <label>034 753 8182</label>
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
            <header ref={refHeader} id={styles.header}>
                <div 
                    onClick={() => navigate(PATH.root)}
                    className={styles.headerLeftPanel}
                >
                    <img src={Logo} alt="logo" />
                    <label>HT Gaming</label>
                </div>
                <div className={clsx(styles.headerRightPanel, isMenuOpen && styles.headerRightPanelOpen)}>
                    <nav>
                        <ul className={styles.navBox}>
                            {
                                NavLinkItem(PATH.free_account, "Tài khoản miễn phí")
                            }
                            {
                                NavLinkItem(PATH.event, "Sự kiện")
                            }
                        </ul>
                    </nav>
                    {
                        user?.userId == null &&
                        <button 
                            onClick={handleLoginButtonClick}
                            className={styles.loginButton}
                        >
                            Đăng nhập
                        </button>
                    }
                </div>
                <div
                    className={styles.menuIconWrapper}
                    onClick={handleMenuIconClick}
                >
                    <MenuIcon
                        className={styles.menuIcon}
                        color="#FFFFFF"
                    />
                </div>
            </header>
            <div ref={refContent} id={styles.content}>
                <img className={styles.backgroundImage} src={BackgroundImage} alt="background" loading="lazy" />
                <Routes>
                    <Route path={PATH.root} element={<Home />} />
                    <Route path={PATH.free_account} element={<FreeAccount />} />
                    <Route path={"/*"} element={<Navigate to={PATH.root} />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainPages2;
