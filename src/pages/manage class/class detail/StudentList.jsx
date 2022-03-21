import React, { useState } from "react";
import styles from "./StudentList.module.scss";
import { Avatar, Button, Form, Input, Table, Typography, Modal } from "antd";
import PersonDetail from "../../../components/TeacherDetails";
export const StudentList = () => {
  const dataSource = [
    {
      key: "1",
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSave = () => {
    setSelectedRowKeys([]);
    setSelectedStudents([]);
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    let selectedStudentsID = selectedRows.map((student) => student.id);
    console.log("selectedRow changed: ", selectedStudentsID);
    setSelectedStudents(selectedStudentsID);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className={styles.class_student_list}>
      <div className={styles.class_student_list__table}>
        <Button type="primary" className={styles.add_new_student} onClick={showModal}>
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
      <Modal title="" maskClosable={false} visible={isModalVisible} width="60%" className="studentList_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <h2>Add new students</h2>
        <Table className="custom_table_1" dataSource={dataSource} columns={columns} rowSelection={rowSelection} />
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </div>
  );
};
