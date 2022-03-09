import React from "react";
import styles from "./TeacherDetail.module.scss";
import clsx from "clsx";
import { EditOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
function TeacherDetails() {
  return (
    <div className={styles.teacher}>
      <div className={styles.teacher__avatar__form}>
        <img src="https://thumbs.dreamstime.com/b/portrait-young-male-teacher-background-school-blackboard-teacher-s-day-knowledge-day-back-to-school-study-159722312.jpg" alt="" className={styles.teacher__avatar__form__image} />
        <div className={styles.teacher__avatar__form__name}>
          Cody Fisher
          <EditOutlined style={{ fontSize: "1rem", marginLeft: "0.5rem" }} />
        </div>
        <div className={styles.teacher__avatar__form__class}>SE1402</div>
        <div className={styles.teacher__avatar__form__role}>IT Lecturer</div>
      </div>
      <div className={styles.teacher__form__title}>
        <p className={styles.teacher__form__title__content}>Contact</p>
        <img className={styles.teacher__form__title__image} src={require("../../assets/images/divideLine.png")} />
      </div>
      <div className={styles.teacher__contact__form}>
        <div className={styles.teacher__contact__form__container}>
          <div className={styles.teacher__contact__form__container__email}>
            <MailOutlined
              style={{
                fontSize: "1rem",
                backgroundColor: "#F1F1F1",
                padding: "0.5em",
                borderRadius: "50%",
              }}
            />
            <p className={styles.teacher__contact__form__container__email__content}>nvt.isst.nute@gmail.com</p>
          </div>
          <div className={styles.teacher__contact__form__container__phone}>
            <PhoneOutlined
              style={{
                fontSize: "1rem",
                backgroundColor: "#F1F1F1",
                padding: "0.5em",
                borderRadius: "50%",
              }}
            />
            <p className={styles.teacher__contact__form__container__phone__content}>0901121234</p>
          </div>
          <div className={styles.teacher__contact__form__container__address}>
            <HomeOutlined
              style={{
                fontSize: "1rem",
                backgroundColor: "#F1F1F1",
                padding: "0.5em",
                borderRadius: "50%",
              }}
            />
            <p className={styles.teacher__contact__form__container__address__content}>123 Chau Thi Vinh Te</p>
          </div>
        </div>
      </div>
      <div className={styles.teacher__form__title}>
        <p className={styles.teacher__form__title__content}>Information</p>
        <img className={styles.teacher__form__title__image} src={require("../../assets/images/divideLine.png")} />
      </div>
      <div className={styles.teacher__information__form}>
        <div className={styles.teacher__information__form__container}>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>UserID</div>
            <div className={styles.teacher__information__form__container__item__value}>DE140199</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Personal Email</div>
            <div className={styles.teacher__information__form__container__item__value}>Cody@gmail.com</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Age</div>
            <div className={styles.teacher__information__form__container__item__value}>40</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Gender</div>
            <div className={styles.teacher__information__form__container__item__value}>Male</div>
          </div>
        </div>
      </div>
      <div className={styles.teacher__form__title}>
        <p className={styles.teacher__form__title__content}>Teaching Subjects</p>
        <img className={styles.teacher__form__title__image} src={require("../../assets/images/divideLine.png")} />
      </div>
      <div className={styles.teacher__teaching__subject__form}>
        <div className={styles.teacher__teaching__subject__form__item}>SSC102</div>
        <div className={styles.teacher__teaching__subject__form__item}>SSC102</div>
        <div className={styles.teacher__teaching__subject__form__item}>SSC102</div>
        <div className={styles.teacher__teaching__subject__form__item}>SSC102</div>
        <div className={styles.teacher__teaching__subject__form__item}>SSC102</div>
      </div>
      <button className={styles.teacher__button__remove}>Remove</button>
    </div>
  );
}

export default TeacherDetails;
