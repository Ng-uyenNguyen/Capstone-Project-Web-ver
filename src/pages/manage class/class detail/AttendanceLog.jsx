import { Table } from "antd";
import React, { useState } from "react";
import { AttendanceDetail } from "../../../components/attendance detail/AttendanceDetail";
import styles from "./AttendanceLog.module.scss";
export const AttendanceLog = () => {
  const dataSource = [
    {
      key: "1",
      semester: 1,
      startDate: "20/01/2018",
      endDate: "20/04/2018",
      totalCourses: 5,
    },
    {
      key: "2",
      semester: 2,
      startDate: "20/01/2018",
      endDate: "20/04/2018",
      totalCourses: 5,
    },
    {
      key: "3",
      semester: 3,
      startDate: "20/01/2018",
      endDate: "20/04/2018",
      totalCourses: 5,
    },
    {
      key: "4",
      semester: 4,
      startDate: "20/01/2018",
      endDate: "20/04/2018",
      totalCourses: 5,
    },
    {
      key: "5",
      semester: 5,
      startDate: "20/01/2018",
      endDate: "20/04/2018",
      totalCourses: 5,
    },
  ];

  const columns = [
    {
      title: <b>Semester</b>,
      dataIndex: "semester",
      key: "semester",
      align: "left",
    },
    {
      title: <b>Start Date</b>,
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: <b>End Date</b>,
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: <b>Total Courses</b>,
      dataIndex: "totalCourses",
      key: "totalCourses",
    },
  ];
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.class_attendance_log}>
      <Table
        className="custom_table_1"
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              const rows = event.target.parentElement.parentElement.children;
              setActiveRow((prev) => {
                rows[[prev]].classList.remove("active");
                event.target.parentElement.classList.add("active");
                return rowIndex;
              });
              setLoading(true);
            },
          };
        }}
      />
      <AttendanceDetail loading={loading} />
    </div>
  );
};
