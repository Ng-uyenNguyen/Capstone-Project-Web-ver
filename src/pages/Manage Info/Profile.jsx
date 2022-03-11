import React from 'react'
import { Typography, Avatar } from 'antd';
import styles from './Style_Info.module.scss'
export const Profile = () => {
    const { Title } = Typography;
    const user_data = {
        age: '30',
        gender: 'Female',
        name: "My Nguyen",
        personal_email: "nguyenndbde140258@fpt.edu.vn",
        phone: "0123456789",
        account_id: "LE00001",
        // Not available
        email: "nguyenndbde@attendance.com",
        address: " 123 Chau Thi Vinh Te",
        birthday: '01/01/2000'
    };
    return (

        <div className={styles.manage_profile}>

            <h1 >Profile</h1>
            <div className={styles.divider} />
            <div className={styles.info_banner}>
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 160 }}
                    icon={<img src={require("../../assets/images/profileImg.png")}></img>}
                />
                <div className={styles.name_field}>
                    <Title>{user_data.name}</Title>
                    <p className={styles.role}>Administration</p>
                </div>
            </div>
            <div className={styles.profile_field}>
                <div className={styles.profile_title}>
                    <p>Email</p>
                    <p>Birthday</p>
                    <p>Gender</p>
                    <p>Phone</p>
                    <p>Address</p>
                </div>
                <div className={styles.profile_data}>
                    <p>{user_data.email}</p>
                    <p>{user_data.birthday}</p>
                    <p>{user_data.gender}</p>
                    <p>{user_data.phone}</p>
                    <p>{user_data.address}</p>
                </div>
            </div>

        </div>
    )
}