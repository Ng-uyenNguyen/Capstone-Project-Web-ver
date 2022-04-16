import React, { useState, useEffect } from "react";
import styles from "./StudentList.module.scss";
import { Avatar, Button, Form, Input, Table, Typography, Modal, message, Upload } from "antd";
import StudentDetail from "./StudentDetail";
import axios from "axios";
import { apiStore } from "../../../constant/apiStore";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
export const StudentList = ({ item, setReRender }) => {
  const [outsideStudent, setOutsideStudent] = useState([]);
  console.log(item);
  const [studentTableLoading, setStudentTableLoading] = useState(true);
  const [outsideStudentDataSource, setOutsideStudentDataSource] = useState([]);
  const [activeRow, setActiveRow] = useState(0);
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [upLoading, setUpLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    import: false,
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setIsModalVisible((prev) => {
      return { ...prev, addNew: false };
    });
  };
  const handleSave = () => {
    const addStudentToClass = async () => {
      let data = {
        studentIds: [...selectedStudents],
        classId: item.classId,
      };
      console.log(data);
      console.log(apiStore.addStudentsToClass);
      try {
        const res = await axios.post(apiStore.addStudentsToClass, data);
        if (res.status === 200) {
          message.success("Add successfully!");
          setReRender("Add student");
          setSelectedRowKeys([]);
          setIsModalVisible((prev) => {
            return { ...prev, addNew: false };
          });
        }
      } catch (e) {
        console.error(e);
        message.error("Add failed!");
      }
    };
    addStudentToClass();
  };
  const showModal = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
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
  const handleUpload = async () => {
    const fileUpload = new FormData();
    console.log(fileList);
    fileUpload.append("file", fileList);
    try {
      const res = await axios.post(apiStore.importStudentToClass, fileUpload);
      if (res.status === 200) {
        setReRender("import");
        message.success("Import successfully!");
      }
    } catch (error) {
      message.error("Import failed!");
      console.error(error);
    }
  };
  return (
    <div className={styles.class_student_list}>
      <div className={styles.class_student_list__table}>
        <Button
          type="primary"
          className={styles.import_new_student_btn}
          onClick={() => {
            showModal("import");
          }}>
          <UploadOutlined />
          Import
        </Button>
        <Button
          type="primary"
          className={styles.add_new_student}
          onClick={() => {
            showModal("addNew");
          }}>
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

      <Modal title="" maskClosable={false} visible={isModalVisible.addNew} width="60%" className="studentList_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
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
      <Modal
        title="Import new students"
        maskClosable={true}
        visible={isModalVisible.import}
        width="30%"
        footer={null}
        style={{ padding: 0 }}
        getContainer={false}
        closable={true}
        onCancel={() =>
          setIsModalVisible((prev) => {
            return { ...prev, import: false };
          })
        }>
        <Upload
          maxCount={1}
          beforeUpload={(file) => {
            setFileList(file);
            return false;
          }}
          onRemove={() => setFileList([])}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0} loading={upLoading} style={{ marginTop: 16 }}>
          {upLoading ? "Uploading" : "Start Upload"}
        </Button>
        <Button type="primary" href={apiStore.downloadAddStudentToClassSample} style={{ marginTop: 16, marginLeft: 10 }} icon={<DownloadOutlined />}>
          Download sample file
        </Button>
      </Modal>
    </div>
  );
};
