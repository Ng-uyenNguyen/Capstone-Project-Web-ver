import { Table, Avatar, Typography, Button } from "antd";
import React, { useState } from "react";
import PersonDetail from "../../components/TeacherDetails";
import styles from "./ManageStudent.module.scss";
const ManageStudent = () => {
  const dataSource = [
    {
      key: "1",
      name: (
        <>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar> Nguyen Duy Bao Nguyen
        </>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "2",
      name: (
        <>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "3",
      name: (
        <>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </>
      ),
      id: "ST0001",
      phone: "0904003849",
      email: "nguyenndbst140258@capstone.com",
    },
    {
      key: "4",
      name: (
        <>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: "10px" }}></Avatar>Nguyen Duy Bao Nguyen
        </>
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
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;
  return (
    <div className={styles.container}>
      <Title level={3}>Manage Student</Title>
      <div className={styles.divider} />
      <div className={styles.student_list}>
        <Button type="primary" className={styles.add_new_student_btn}>
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
                setLoading(true);
              },
            };
          }}
        />
      </div>
      <PersonDetail loading={loading} />
    </div>
  );
};

export default ManageStudent;
