import React, { useState } from "react";
import { Image, Tag, Button, Typography } from "antd";
import styles from "./StyleSubject.module.scss";

export const SubjectDetail = ({ loading, info, showModal }) => {
  const { Title } = Typography;

  return !loading ? (
    <div className={styles.subject_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.subject_detail}>
      <div className={styles.subject_banner}>
        <div className={styles.subject_info}>
          {/* <Image src={require("../../assets/images/icon_subject.png")} alt="icon_subject" width={56} height={53}></Image> */}
          <div>
            <h3>{info.name}</h3>
            <p>{info.subjectCode}</p>
          </div>
        </div>
      </div>
      {/* Subject Info detail*/}
      <div className={styles.teaching_teachers}>
        <div className={styles.heading_title}>
          <h4>
            <b>Teaching teachers</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.teaching_teachers__info}>
          <ul>
            {info.teachers.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.studying_classes}>
        <div className={styles.heading_title}>
          <h4>
            <b>Studying classes</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          {info.classes.map((item, index) => (
            <Tag className={styles.subject_detail__subject_tag} key={index}>
              {item}
            </Tag>
          ))}
        </div>
      </div>
      <div className={styles.specs}>
        <div className={styles.heading_title}>
          <h4>
            <b>Specializations</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          {info.specializations.map((item, index) => (
            <Tag key={index} className={styles.subject_detail__subject_tag}>
              {item}
            </Tag>
          ))}
        </div>
      </div>
      {/* ======= button  */}
      <div className={styles.btn_field}>
        {/* <Button className={styles.btn_remove} onClick={() => { deleteSubject() }}>DELETE</Button> */}
        <Button
          className={styles.btn_remove}
          onClick={() => {
            showModal("confirm");
            console.log("clicked");
          }}>
          DELETE
        </Button>
        <Button
          className={styles.btn_update}
          onClick={() => {
            showModal("update");
          }}>
          UPDATE
        </Button>
      </div>
    </div>
  );
};
