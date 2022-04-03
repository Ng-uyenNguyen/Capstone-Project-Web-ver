import { Table, Tabs, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ClassTimeTable.module.scss";

export const ClassTimeTable = () => {
  const dataSource = [
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Attended",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Attended",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Attended",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Not yet",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Not yet",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Not yet",
    },
    {
      day: "Monday, 10/02/2022",
      startTime: "7:00",
      endTime: "8:30",
      room: 201,
      lecturer: "LongNQ",
      attendance: "Not yet",
    },
  ];

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Lecturer",
      dataIndex: "lecturer",
      key: "lecturer",
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
    },
  ];
  const { Title } = Typography;
  const { TabPane } = Tabs;
  return (
    <div className={styles.class_timetable}>
      <Title level={3}>
        <b>Time table of SE1402</b>
      </Title>
      <Tabs defaultActiveKey="1" type="line" size="large">
        <TabPane tab="Timetable by groups" key="1">
          <div className={styles.class_timetable__course}>
            <Title level={3}>ITE302c (Ethics in IT)</Title>
            <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
