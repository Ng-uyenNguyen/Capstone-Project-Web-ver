import React from "react";
import styles from "./recentOnline.module.scss";
import { Avatar, Typography, Divider } from "antd";

export const RecentOnline = () => {
  return (
    <div className={styles.recent_online}>
      <div className="divider">
        <Typography.Title level={4}>Recently Online</Typography.Title>
        <div className="center_divider" />
      </div>
      <div className={styles.user_status_container}>
        <UserStatus username={"Bro1191"} imgurl="" />
        <UserStatus username={"Bro1191"} imgurl="" />
        <UserStatus username={"Bro1191"} imgurl="" />
        <UserStatus username={"Bro1191"} imgurl="" />
        <UserStatus username={"Bro1191"} imgurl="" />
      </div>
    </div>
  );
};
const UserStatus = ({ username, imgurl }) => {
  const { Text } = Typography;
  return (
    <>
      <div className={styles.user_status}>
        <div className={styles.status_userimage}>
          <Avatar src={imgurl} size="large" />
        </div>
        <Text className={styles.status_username} level={5}>
          {username}
        </Text>
      </div>
      <Divider style={{ margin: "10px 0" }} />
    </>
  );
};
