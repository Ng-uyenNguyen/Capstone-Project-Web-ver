import { Button, Image, Modal, Table, Typography, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import styles from "./ManageClass.module.scss";
import { Link } from "react-router-dom";
export const ManageClass = () => {
  const { Title } = Typography;
  const dataSource = [
    {
      key: "1",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
    {
      key: "2",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
    {
      key: "3",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
    {
      key: "4",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
    {
      key: "5",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
    {
      key: "6",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Link to="classTimeTable">View</Link>,
      detail: <Link to="classDetail">Detail</Link>,
    },
  ];

  const columns = [
    {
      title: <b>Class ID</b>,
      dataIndex: "classID",
      key: "classID",
      align: "left",
    },
    {
      title: <b>Specilization</b>,
      dataIndex: "specilization",
      key: "specilization",
    },
    {
      title: <b>Total Student</b>,
      dataIndex: "totalStudent",
      key: "totalStudent",
      align: "center",
    },
    {
      title: <b>Time table</b>,
      dataIndex: "timeTable",
      key: "timeTable",
      align: "center",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];

  return (
    <div className={styles.class_management}>
      <Title level={3}>Manage Class</Title>
      <YearCourse title="K14" dataSource={dataSource} columns={columns} />
      <YearCourse title="K15" dataSource={dataSource} columns={columns} />
      <YearCourse title="K16" dataSource={dataSource} columns={columns} />
    </div>
  );
};

const YearCourse = ({ title, dataSource, columns }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    setIsModalVisible(false);
  };
  const onFinishFailed = (values) => {
    console.log(values);
    setIsModalVisible(false);
  };
  const showModal = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };

  const handleCancel = (method) => {
    setIsModalVisible(false);
  };
  const { Title } = Typography;
  const { Option } = Select;
  return (
    <div className={styles.year_course}>
      <div className={styles.divider}>
        <Title level={4}>{title}</Title>
        <div className={styles.center_divider} />
        <Button type="primary" className={styles.add_button} onClick={showModal}>
          + New Class
        </Button>
      </div>
      <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
      {/* ============= Add new class modal ===========*/}
      <Modal title="" maskClosable={false} visible={isModalVisible} width="32%" className="add_newClass_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <div className="header">
          <Image src={require("../../assets/images/google_classroom.png")} preview={false} />
          <h2>Add new class</h2>
        </div>
        <div className="divider" />
        {/* ============= Input form =============== */}
        <Form name="add_class_form" labelCol={{ span: 10 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div className="input_wrapper">
            <Form.Item label="Class ID" name="classId">
              <Input />
            </Form.Item>
            <Form.Item label="Specialization" name="specialization">
              <Select>
                <Option value="male">Software Engineering</Option>
                <Option value="female">Business Analytics</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber min={1} max={10} />
            </Form.Item>
          </div>
          <div className="divider" />
          <Form.Item className="buttons_wrapper">
            <Button type="primary" onClick={handleCancel} className="cancel_btn">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="submit_btn">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
