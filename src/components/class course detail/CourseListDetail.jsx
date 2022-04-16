import { CheckCircleFilled, EditOutlined } from "@ant-design/icons";
import { Button, Image, Progress, Select, Space, Typography } from "antd";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./CourseListDetail.module.scss";
import moment from "moment";
export const CourseListDetail = ({ loading, courseInfo, handleDeleteCourse }) => {
  return !loading ? (
    <div className={styles.class_course_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.class_course_detail}>
      <div className={styles.course_box}>
        <div className={styles.course_info}>
          <Image src={require("../../assets/images/Books.png")} preview={false} width={80} height={80} />
          <div className={styles.course_name}>
            <h3>{courseInfo.subjectName}</h3>
            <h4>{courseInfo.subjectCode}</h4>
          </div>
        </div>
        <Space direction="vertical" className={styles.course_detail} size="small">
          <table>
            <tr>
              <td>
                <b>Lecturer: </b>
              </td>
              <td>
                <Typography.Text>{courseInfo.teacherName}</Typography.Text>
              </td>
            </tr>
            <tr>
              <td>
                <b>Start date: </b>
              </td>
              <td>{moment(courseInfo.startDate).format("DD/MM/YYYY") == "Invalid date" ? "-" : moment(courseInfo.startDate).format("DD/MM/YYYY")} </td>
            </tr>
            <tr>
              <td>
                <b>End date: </b>
              </td>
              <td>{moment(courseInfo.endDate).format("DD/MM/YYYY") == "Invalid date" ? "-" : moment(courseInfo.endDate).format("DD/MM/YYYY")}</td>
            </tr>
            <tr>
              <td>
                <b>Duration: </b>
              </td>
              <td>{moment(courseInfo.startDate).format("DD/MM/YYYY") == "Invalid date" ? "-" : "10 weeks"}</td>
            </tr>
          </table>
          <Button className={styles.remove_button} onClick={handleDeleteCourse}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Space>
      </div>
    </div>
  );
};
