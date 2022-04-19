import React, { useEffect, useState } from "react";
import styles from "./recentOnline.module.scss";
import { Avatar, Typography, Divider } from "antd";
import { apiStore } from "../../../../constant/apiStore";
import axios from "axios";

export const RecentOnline = () => {
  const [currentlyOnline, setCurrentlyOnline] = useState([]);
  useEffect(() => {
    const fetchCurrentlyOnline = async () => {
      const res = await axios.get(apiStore.getCurrentlyOnline);
      const data = await res.data;
      console.log(data);
      setCurrentlyOnline(data);
    };
    fetchCurrentlyOnline();
  }, []);

  return (
    <div className={styles.recent_online}>
      <div className="divider">
        <Typography.Title level={4}>Recently Online</Typography.Title>
        <div className="center_divider" />
      </div>
      <div className={styles.user_status_container}>
        {currentlyOnline.map((item) => (
          <UserStatus username={item.name} imgurl={"https://drive.google.com/uc?export=view&id=" + item.avatar} />
        ))}
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
