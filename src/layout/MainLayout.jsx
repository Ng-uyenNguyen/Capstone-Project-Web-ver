import { DownOutlined, HolderOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from "antd";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
  let navigate = useNavigate();
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
        <Button
          type="text"
          onClick={() => {
            localStorage.setItem("userAuth", "false");
            console.log(localStorage.getItem("userAuth"));
            navigate("/", { replace: true });
          }}>
          <LogoutOutlined style={{ marginRight: "5px" }} />
          Log Out
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.admin_dropdown_wrapper}>
          <div className={styles.admin_dropdown}>
            <Avatar src={"https://drive.google.com/uc?export=view&id=1Ym8PMuDF4g_v2THXCyhWQYp_InPLjKQ8"} size="large" />
            <Dropdown overlay={menu} trigger={["click"]}>
              <p className={styles.admin_name}>
                Hello, XuanNT <DownOutlined style={{ marginLeft: "25px" }} />
              </p>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
