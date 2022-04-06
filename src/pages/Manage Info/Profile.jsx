import React from "react";
import { Typography, Avatar } from "antd";
import styles from "./Style_Info.module.scss";
export const Profile = () => {
  const { Title } = Typography;
  const user_data = {
    age: "30",
    gender: "Female",
    name: "My Nguyen",
    personal_email: "nguyenndbde140258@fpt.edu.vn",
    phone: "0123456789",
    account_id: "LE00001",
    // Not available
    email: "nguyenndbde@attendance.com",
    address: " 123 Chau Thi Vinh Te",
    birthday: "01/01/2000",
  };
  return (
    <div className={styles.manage_profile}>
      <h1>Profile</h1>
      <div className={styles.divider} />
      <div className={styles.info_banner}>
        <Avatar size={160} icon={<img src={require("../../assets/images/profileImg.png")}></img>} />
        <div className={styles.name_field}>
          <Title>{user_data.name}</Title>
          <p className={styles.role}>Administration</p>
        </div>
      </div>
      <div className={styles.profile_field}>
        <table>
          <tr>
            <td className={styles.profile_title}>Email</td>
            <td>{user_data.email}</td>
          </tr>
          <tr>
            <td className={styles.profile_title}>Birthday</td>
            <td>{user_data.birthday}</td>
          </tr>
          <tr>
            <td className={styles.profile_title}>Gender</td>
            <td>{user_data.gender}</td>
          </tr>
          <tr>
            <td className={styles.profile_title}>Phone</td>
            <td>{user_data.phone}</td>
          </tr>
          <tr>
            <td className={styles.profile_title}>Address</td>
            <td>{user_data.address}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
