import { Button, Table, Typography } from "antd";
import React from "react";
import styles from "./CurrentClassTable.module.scss";
import { Link } from "react-router-dom";
export const CurrentClassTable = () => {
  const dataSource = [
    {
      key: "1",
      Room: "201",
      Class: "SE002",
      Lecture: "Cody Fisher",
      Subject: "ABC123",
    },
    {
      key: "1",
      Room: "201",
      Class: "SE002",
      Lecture: "Cody Fisher",
      Subject: "ABC123",
    },
    {
      key: "1",
      Room: "201",
      Class: "SE002",
      Lecture: "Cody Fisher",
      Subject: "ABC123",
    },
    {
      key: "1",
      Room: "201",
      Class: "SE002",
      Lecture: "Cody Fisher",
      Subject: "ABC123",
    },
    {
      key: "1",
      Room: "201",
      Class: "SE002",
      Lecture: "Cody Fisher",
      Subject: "ABC123",
    },
  ];

  const columns = [
    {
      title: <b>Room</b>,
      dataIndex: "Room",
      key: "Room",
      align: "left",
    },
    {
      title: <b>Class</b>,
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: <b>Lecture</b>,
      dataIndex: "Lecture",
      key: "Lecture",
      align: "center",
    },
    {
      title: <b>Subject</b>,
      dataIndex: "Subject",
      key: "Subject",
      align: "center",
    },
  ];

  return (
    <div className={styles.class_management}>
      <YearCourse title="K15" dataSource={dataSource} columns={columns} />
    </div>
  );
};

const YearCourse = ({ title, dataSource, columns }) => {
  const { Title } = Typography;
  return (
    <div className={styles.year_course}>
      <div className={styles.divider}>
        <Title level={4}>{title}</Title>
        <div className={styles.center_divider} />
      </div>
      <Table
        className="custom_table_1"
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
