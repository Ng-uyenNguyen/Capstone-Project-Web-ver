import React, { useState, useEffect } from "react";
import styles from "./StudentList.module.scss";
import { Avatar, Button, Form, Input, Table, Typography, Modal, message } from "antd";
import StudentDetail from "./StudentDetail";
import axios from "axios";
import { apiStore } from "../../../constant/apiStore";
export const StudentList = ({ item }) => {
  const [outsideStudent, setOutsideStudent] = useState([]);
  const [studentTableLoading, setStudentTableLoading] = useState(true);
  const [outsideStudentDataSource, setOutsideStudentDataSource] = useState([]);
  const dataSource = item.students.map((student, index) => ({
    key: index,
    name: (
      <>
        <Avatar src={"https://drive.google.com/uc?export=view&id=" + student.avatar} style={{ marginRight: "10px" }}></Avatar>
        {student.name}
      </>
    ),
    id: student.accountId,
    phone: student.phone,
    email: student.email,
  }));

  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchStudentData = async () => {
      const res = await axios.get(apiStore.getStudents, { signal: myAbortController.signal });
      const data = res.data;
      console.log(data);
      const sameSpecStudents = data.filter((student) => student.specialization === item.specialization);
      let outsideStudentData = [];
      sameSpecStudents.forEach((student) => {
        if (item.students.findIndex((s) => s.accountId === student.accountId) === -1) {
          outsideStudentData.push(student);
        }
      });
      setOutsideStudentDataSource(
        outsideStudentData.map((student, index) => ({
          key: index,
          name: (
            <>
              <Avatar src={"https://drive.google.com/uc?export=view&id=" + student.avatar} style={{ marginRight: "10px" }}></Avatar>
              {student.name}
            </>
          ),
          id: student.accountId,
          phone: student.phone,
          email: student.email,
        }))
      );
      setOutsideStudent(outsideStudentData);
      setStudentTableLoading(false);
    };
    fetchStudentData();
    return () => {
      myAbortController.abort();
    };
  }, []);

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
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };
  const handleSave = () => {
    const addStudentToClass = async () => {
      let data = {
        studentIds: [...selectedStudents],
        classId: item.classId,
      };
      console.log(data);
      console.log(apiStore.addStudentsToClass);
      const res = await axios.post(apiStore.addStudentsToClass, data);
      if (res.status === 200) {
        message.success("Add successfully!");
        setSelectedRowKeys([]);
        setIsModalVisible(false);
      } else {
        console.log(res);
        message.error("Add failed!");
      }
    };
    addStudentToClass();
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    let selectedStudentsID = selectedRows.map((student) => student.id);
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
                let selectedStudent = item.students.find((e) => e.accountId === record.id);
                setStudentInfo({ ...selectedStudent });
              },
            };
          }}
        />
      </div>
      <StudentDetail loading={loading} studentInfo={studentInfo} classId={item.classId} />

      <Modal title="" maskClosable={false} visible={isModalVisible} width="60%" className="studentList_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <h2>Add new students</h2>
        <div className="divider" />
        <Table dataSource={outsideStudentDataSource} columns={columns} rowSelection={rowSelection} loading={studentTableLoading} />
        <div className="button_wrapper">
          <Button onClick={handleSave} className="save_button">
            Save
          </Button>
          <Button onClick={handleCancel} className="cancel_button">
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
