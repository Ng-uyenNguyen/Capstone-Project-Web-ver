import { DownloadOutlined } from "@ant-design/icons";
import { Image, Button, Space } from "antd";
import React from "react";
import styles from "./AttendanceDetail.module.scss";
export const AttendanceDetail = ({ loading }) => {
  return !loading ? (
    <div className={styles.class_attendance_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.class_attendance_detail}>
      <div className={styles.subject_box_wrapper}>
        <SubjectBox />
        <SubjectBox />
        <SubjectBox />
        <SubjectBox />
        <SubjectBox />
        <Button className={styles.download_all}>
          <DownloadOutlined style={{ color: "white", fontWeight: "bold" }} /> Download all
        </Button>
      </div>
    </div>
  );
};

const SubjectBox = () => {
  return (
    <div className={styles.subject_box}>
      <div className={styles.subject_info}>
        <Image src={require("../../assets/images/course.png")} preview={false} />
        <div>
          <h4>
            <b>Mobile Programming</b>
          </h4>
          <p>PRM301</p>
        </div>
      </div>
      <div className={styles.subject_operation}>
        <div className={styles.subject_detail}>
          <Space direction="vertical">
            <p>
              <b>Duration: </b>
              10 weeks
            </p>
            <p>
              <b>Lecturer: </b>
              TranLQ
            </p>
          </Space>
        </div>
        <Button className={styles.download_btn}>
          <DownloadOutlined style={{ color: "white", fontWeight: "bold" }} />
        </Button>
      </div>
    </div>
  );
};
