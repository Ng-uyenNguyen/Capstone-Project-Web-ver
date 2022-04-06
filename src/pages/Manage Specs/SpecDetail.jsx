import React from "react";
import { Image, Button } from "antd";
import styles from "./Style_Specs.module.scss";

export const SpecDetail = ({ loading, info, showModal, getCode }) => {
  return !loading ? (
    <div className={styles.spec_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.spec_detail}>
      <div className={styles.custom_box}>
        <div className={styles.box} style={{ flexDirection: "column", justifyItems: "center" }}>
          <h3>{info.name}</h3>
          <p className={styles.spec_detail__spec}>{getCode(info.name)}</p>
        </div>
      </div>
      <div className={styles.btn_field}>
        <Button
          className={styles.btn_update}
          onClick={() => {
            showModal("update");
          }}>
          Update
        </Button>
      </div>
      {/* <Divider className={styles.spec_detail__divider} /> */}
      <div className={styles.heading_title}>
        <h4>
          <b>Information</b>
        </h4>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.info}>
        <div className={styles.info__item}>
          <p className={styles.info__item__title}>No.Classes</p>
          <p>10</p>
        </div>
        <div className={styles.info__item}>
          <p className={styles.info__item__title}>No.Students</p>
          <p>50</p>
        </div>
      </div>
      <div className={styles.heading_title}>
        <h4>
          <b>List of Subjects</b>
        </h4>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.subject_list}>
        {info.subjects &&
          info.subjects.map((info, i) => {
            return (
              <div className={styles.subject_tag} key={i}>
                {info}
              </div>
            );
          })}
      </div>
    </div>
  );
};
