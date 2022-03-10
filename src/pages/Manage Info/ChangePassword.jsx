import React, { useState } from 'react'
import { Avatar, Typography, Button } from 'antd';
import styles from './Style_Info.module.scss'

export const ChangePassword = () => {
    const { Title } = Typography;
    const [inputField, setInputField] = useState({
        mail: "nguyenndbde140258@fpt.edu.vn",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputField(values => ({ ...values, [name]: value }))
    }
    return (
        <div>
            <h1 >Change Password</h1>
            <div className={styles.divider}></div>
            <div className={styles.changePass}>
                <div className={styles.info}>
                    <Avatar className={styles.avatar}
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 160 }}
                        icon={<img src={require("../../assets/images/profileImg.png")}></img>}
                    />
                    <div className={styles.name_field}>
                        <Title title='2'>My Nguyen</Title>
                        <p className={styles.role}>Administration</p>
                    </div>
                </div>
                <div className={styles.contain}>
                    <div className={styles.custom_form}>
                        <div className={styles.input_item}>
                            <p>Email</p>
                            <input type="text" name="mail" value={inputField.mail} onChange={handleChange} />
                        </div>
                        <div className={styles.input_item}>
                            <p>Old Password</p>
                            <input
                                type='text'
                                name="oldPassword"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={inputField.oldPassword}

                            />
                        </div>
                        <div className={styles.input_item}>
                            <p>New Password</p>
                            <input
                                type='text'
                                name="newPassword"
                                placeholder="Enter your new password"
                                onChange={handleChange}
                                value={inputField.newPassword}


                            />
                        </div>
                        <div className={styles.input_item}>
                            <p>Confirm New Password</p>
                            <input
                                type='text'
                                name="confirmPassword"
                                placeholder="Enter your confirm password"
                                onChange={handleChange}
                                value={inputField.confirmPassword}

                            />
                        </div>
                        <div className={styles.custom_btn}>
                            <Button className={styles.custom_btn__btn_cancel}>Cancel</Button>
                            <Button className={styles.custom_btn__btn_done}>Done</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
