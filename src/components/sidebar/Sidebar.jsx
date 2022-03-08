import React, { useState } from "react";
import sidebarNav from "./sidebarNav";
import styles from "./Sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useEffect } from "react";
export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <img src={require("../../assets/images/Logo.png")} alt="logo" />
      </div>
      <div className={styles.sidebar__divider} />
      <div className={styles.sidebar__menu}>
        {sidebarNav.map((item, index) => (
          <Link to={item.link} key={`nav-${index}`} className={clsx(styles.sidebar__menu__item, { [styles.sidebar__menu__active]: index === activeIndex })}>
            <div className={styles.sidebar__menu__item__icon}>{item.icon}</div>
            <div className={styles.sidebar__menu__item__text}>{item.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
