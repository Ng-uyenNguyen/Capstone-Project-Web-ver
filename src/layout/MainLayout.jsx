import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import styles from "./MainLayout.module.scss";
export const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};
