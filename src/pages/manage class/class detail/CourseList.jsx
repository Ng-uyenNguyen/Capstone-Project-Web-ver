import React, { useState } from "react";
import styles from "./CourseList.module.scss";
import { Avatar, Button, Table, Typography } from "antd";
export const CourseList = () => {
  const dataSource = [
    {
      key: "1",
      name: "Object-Oriented Programming",
      id: "PRO192",
      teacher: "TranLQ",
    },
    {
      key: "2",
      name: "Object-Oriented Programming",
      id: "PRO192",
      teacher: "TranLQ",
    },
  ];

  const columns = [
    {
      title: <b>Name</b>,
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: <b>ID</b>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <b>Teacher</b>,
      dataIndex: "teacher",
      key: "teacher",
    },
  ];
  const [activeRow, setActiveRow] = useState(0);
  return (
    <div class={styles.class_course_list}>
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
            },
          };
        }}
      />
    </div>
  );
};
