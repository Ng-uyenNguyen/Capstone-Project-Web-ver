import React, { useState } from "react";
import styles from "./StudentList.module.scss";
import { Avatar, Button, Table, Typography } from "antd";
export const StudentList = () => {
  const dataSource = [
    {
      key: "1",
      name: (
        <div>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </div>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "2",
      name: (
        <div>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </div>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "3",
      name: (
        <div>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </div>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "4",
      name: (
        <div>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </div>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
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
      title: <b>Phone</b>,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: <b>Email</b>,
      dataIndex: "email",
      key: "email",
    },
  ];
  const [activeRow, setActiveRow] = useState(0);
  return (
    <div className={styles.class_student_list}>
      <Button type="primary" className={styles.add_new_student}>
        + New Student
      </Button>
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
