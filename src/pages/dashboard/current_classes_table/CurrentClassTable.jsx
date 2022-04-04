import { Button, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CurrentClassTable.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiStore } from "../../../constant/apiStore";
export const CurrentClassTable = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  useEffect(async () => {
    const res = await axios.get(apiStore.getOngoingClass);
    const data = res.data;
    const mappedData = data.map((item, index) => ({
      key: index,
      Room: item.classId,
      Class: item.room,
      Lecture: item.teacherName,
      Subject: item.subjectName,
    }));
    setDataSource(mappedData);
    setLoading(false);
  }, []);

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
      <YearCourse title="On-Going Classes" dataSource={dataSource} loading={loading} columns={columns} />
    </div>
  );
};

const YearCourse = ({ title, dataSource, columns, loading }) => {
  const { Title } = Typography;
  return (
    <div className={styles.year_course}>
      <div className={styles.divider}>
        <Title level={4}>{title}</Title>
        <div className={styles.center_divider} />
      </div>
      <Table className="custom_table_1" loading={loading} dataSource={dataSource} columns={columns} />
    </div>
  );
};
