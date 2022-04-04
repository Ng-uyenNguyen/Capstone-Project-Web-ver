import { Avatar, Image, Menu, Dropdown } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import styles from "./MainLayout.module.scss";
import { DownOutlined, UserOutlined, HolderOutlined, LogoutOutlined } from "@ant-design/icons";

export const MainLayout = () => {
  return (
    <div>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.admin_dropdown_wrapper}>
          <div className={styles.admin_dropdown}>
            <Avatar src={require("../assets/images/profileImg.png")} size="large" />
            <Dropdown overlay={menu} trigger={["click"]}>
              <p className={styles.admin_name}>
                Hello, My Nguyen <DownOutlined style={{ marginLeft: "25px" }} />
              </p>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/management/profile">
        <UserOutlined style={{ marginRight: "5px" }} />
        Profile
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/management/changePassword">
        <HolderOutlined style={{ marginRight: "5px" }} />
        Change Password
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Link to="/">
        <LogoutOutlined style={{ marginRight: "5px" }} />
        Log Out
      </Link>
    </Menu.Item>
  </Menu>
);
