import { Button, Table, Typography, Modal, Radio, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CurrentClassTable.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiStore } from "../../../constant/apiStore";
import moment from "moment";
export const CurrentClassTable = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [attendanceLogDataSource, setAttendanceLogDataSource] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleShowModal = async (item) => {
    setSelectedClass(item);
    showModal();
    setAttendanceLoading(true);
    let response = await axios.get(apiStore.getAttendanceLogBySlotId + item.id);
    let data = response.data;
    console.log(data);
    let mappedData = data.map((item, index) => ({
      key: index,
      no: index + 1,
      avatar: (
        <>
          <Avatar src={"https://drive.google.com/uc?export=view&id=" + item.avatar} shape="square" size={30} />
        </>
      ),
      studentId: item.accountId,
      studentName: item.name,
      status: (
        <Radio.Group disabled={true} defaultValue={item.status}>
          <Radio value="PRESENT">
            <Typography.Text type="success">Present</Typography.Text>
          </Radio>
          <Radio value="ABSENT">
            <Typography.Text type="danger">Absent</Typography.Text>
          </Radio>
        </Radio.Group>
      ),
      description: <Typography.Text type="danger">{item.description}</Typography.Text>,
    }));
    setAttendanceLogDataSource([...mappedData]);
    setAttendanceLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(apiStore.getOngoingClass);
      const data = res.data;
      const mappedData = data.map((item, index) => ({
        key: index,
        Class: item.classId,
        Room: item.room,
        timeStart: moment(item.timeStart).format("HH:mm"),
        timeEnd: moment(item.timeEnd).format("HH:mm"),
        Lecture: item.teacherName,
        Subject: item.subject.code,
        detail: (
          <Button type="link" onClick={() => handleShowModal(item)}>
            Detail
          </Button>
        ),
      }));
      setDataSource(mappedData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: <b>Class</b>,
      dataIndex: "Class",
      key: "Class",
    },
    {
      title: <b>Room</b>,
      dataIndex: "Room",
      key: "Room",
      align: "left",
    },
    {
      title: <b>Time start</b>,
      dataIndex: "timeStart",
      key: "timeStart",
    },
    {
      title: <b>Time end</b>,
      dataIndex: "timeEnd",
      key: "timeEnd",
    },
    {
      title: <b>Lecture</b>,
      dataIndex: "Lecture",
      key: "Lecture",
    },
    {
      title: <b>Subject</b>,
      dataIndex: "Subject",
      key: "Subject",
    },
    {
      title: <b></b>,
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];
  const attendanceLogColumns = [
    {
      title: <b>No</b>,
      dataIndex: "no",
      key: "no",
      align: "left",
    },
    {
      title: <b>Avatar</b>,
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: <b>Student Name</b>,
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: <b>Student ID</b>,
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: <b>Status</b>,
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];

  return (
    <div className={styles.class_management}>
      <YearCourse title="On-Going Classes" dataSource={dataSource} loading={loading} columns={columns} />
      <Modal title="Class Detail" visible={isModalVisible} width="70%" maskClosable={false} className="class_detail_modal" footer={null} closable={true} style={{ padding: 0 }} onCancel={handleCancel}>
        <table className={styles.slot_information}>
          <tbody>
            <tr>
              <td>
                <Typography.Text strong>Class ID : </Typography.Text>
              </td>
              <td>
                <Typography.Text>{selectedClass.classId}</Typography.Text>
              </td>
              <td>
                <Typography.Text strong>Subject : </Typography.Text>
              </td>
              <td>
                <Typography.Text>{selectedClass?.subject?.code}</Typography.Text>
              </td>
            </tr>
            <tr>
              <td>
                <Typography.Text strong>Lecture : </Typography.Text>
              </td>
              <td>
                <Typography.Text>{selectedClass.teacherName}</Typography.Text>
              </td>
            </tr>
            <tr>
              <td>
                <Typography.Text strong>Attendance status : </Typography.Text>
              </td>
              <td>
                <Typography.Text type={selectedClass.status === "ATTENDED" ? "success" : "danger"}>{selectedClass.status}</Typography.Text>
              </td>
            </tr>
            <tr>
              <td>
                <Typography.Text strong>Total student : </Typography.Text>
              </td>
              <td>
                <Typography.Text>{selectedClass.totalStudents}</Typography.Text>
              </td>
            </tr>
          </tbody>
        </table>
        <Table dataSource={attendanceLogDataSource} columns={attendanceLogColumns} pagination={false} loading={attendanceLoading} />
      </Modal>
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
