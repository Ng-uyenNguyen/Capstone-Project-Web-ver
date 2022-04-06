import { EditOutlined, HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Image, Space } from "antd";
import React from "react";
import styles from "./TeacherDetail.module.scss";

function PersonDetail({ loading, showModal, selectedPerson, role }) {
  return !loading ? (
    <div className={styles.loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.teacher}>
      <div className={styles.teacher__avatar__form}>
        <img src={"https://drive.google.com/uc?export=view&id=" + selectedPerson.avatar} alt="" className={styles.teacher__avatar__form__image} />
        <div className={styles.teacher__avatar__form__name}>{selectedPerson.name}</div>
        <div className={styles.teacher__avatar__form__class}>{selectedPerson.classs}</div>
        <div className={styles.teacher__avatar__form__role}>{role}</div>
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
            <p className={styles.teacher__contact__form__container__email__content}>{selectedPerson.email}</p>
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
            <p className={styles.teacher__contact__form__container__phone__content}>{selectedPerson.phone}</p>
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
            <p className={styles.teacher__contact__form__container__address__content}>{selectedPerson.address}</p>
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
            <div className={styles.teacher__information__form__container__item__value}>{selectedPerson.accountId}</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Personal Email</div>
            <div className={styles.teacher__information__form__container__item__value}>{selectedPerson.personalEmail}</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Age</div>
            <div className={styles.teacher__information__form__container__item__value}>{selectedPerson.age}</div>
          </div>
          <div className={styles.teacher__information__form__container__item}>
            <div className={styles.teacher__information__form__container__item__content}>Gender</div>
            <div className={styles.teacher__information__form__container__item__value}>{selectedPerson.gender === 0 ? "Male" : "Female"}</div>
          </div>
        </div>
      </div>
      <div className={styles.teacher__form__title}>
        <p className={styles.teacher__form__title__content}>{role === "Student" ? "Studying Class" : "Teaching Subjects"}</p>
        <img className={styles.teacher__form__title__image} src={require("../../assets/images/divideLine.png")} />
      </div>

      <div className={styles.teacher__teaching__subject__form}>
        {role === "Student" ? <div className={styles.teacher__teaching__subject__form__item}>{selectedPerson.classs[0]}</div> : selectedPerson.subjects.map((sub) => <div className={styles.teacher__teaching__subject__form__item}>{sub}</div>)}
      </div>
      <div className={styles.button_wrapper}>
        <button className={styles.remove_button}>De Active</button>
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
