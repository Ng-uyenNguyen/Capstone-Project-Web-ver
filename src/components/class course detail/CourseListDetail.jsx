import { Image } from "antd";
import React from "react";
import styles from "./CourseListDetail.module.scss";
export const CourseListDetail = ({ loading }) => {
  return !loading ? (
    <div className={styles.class_course_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.class_course_detail}></div>
  );
};
