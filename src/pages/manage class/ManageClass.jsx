import { Button, Table, Typography } from "antd";
import React from "react";
import styles from "./ManageClass.module.scss";
import { Link } from "react-router-dom";
export const ManageClass = () => {
  const { Title } = Typography;
  const dataSource = [
    {
      key: "1",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Link to="/classDetail">Detail</Link>,
    },
    {
      key: "2",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "3",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "4",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "5",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "6",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
  ];

  const columns = [
    {
      title: <b>Class ID</b>,
      dataIndex: "classID",
      key: "classID",
      align: "left",
    },
    {
      title: <b>Specilization</b>,
      dataIndex: "specilization",
      key: "specilization",
    },
    {
      title: <b>Total Student</b>,
      dataIndex: "totalStudent",
      key: "totalStudent",
      align: "center",
    },
    {
      title: <b>Time table</b>,
      dataIndex: "timeTable",
      key: "timeTable",
      align: "center",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];

  return (
    <div className={styles.class_management}>
      <Title level={3}>Manage Class</Title>
      <YearCourse title="K14" dataSource={dataSource} columns={columns} />
      <YearCourse title="K15" dataSource={dataSource} columns={columns} />
      <YearCourse title="K16" dataSource={dataSource} columns={columns} />
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
        <Button type="primary" className={styles.add_button}>
          + New Class
        </Button>
      </div>
      <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
    </div>
  );
};
