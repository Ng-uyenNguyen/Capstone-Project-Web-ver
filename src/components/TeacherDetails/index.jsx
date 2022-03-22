import { EditOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Image, Space } from "antd";
import React from "react";
import styles from "./TeacherDetail.module.scss";
function PersonDetail({ loading, showModal }) {
  return !loading ? (
    <div className={styles.loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.teacher}>
      <div className={styles.teacher__avatar__form}>
        <img src="https://thumbs.dreamstime.com/b/portrait-young-male-teacher-background-school-blackboard-teacher-s-day-knowledge-day-back-to-school-study-159722312.jpg" alt="" className={styles.teacher__avatar__form__image} />
        <div className={styles.teacher__avatar__form__name}>Cody Fisher</div>
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
      <div className={styles.button_wrapper}>
        <button className={styles.remove_button}>Remove</button>
        {showModal ? (
          <button className={styles.update_button} onClick={showModal}>
            Update
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default PersonDetail;
