import { Button, Form, Input, Modal, Table, Select } from "antd";
import React, { useState } from "react";
import { faBook, faBookBible } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CourseListDetail } from "../../../components/class course detail/CourseListDetail";
import styles from "./CourseList.module.scss";

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
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onAddNewFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      birthdate: fieldsValue["birthdate"].format("YYYY-MM-DD"),
    };
    console.log(values);
    setIsModalVisible(false);
  };
  const onAddNewFinishFailed = (err) => {
    console.log(err);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Option } = Select;
  return (
    <div class={styles.class_course_list}>
      <div className={styles.class_course_list__table}>
        <Button type="primary" className={styles.add_new_course_btn} onClick={showModal}>
          + New Course
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
                  setLoading(true);
                  return rowIndex;
                });
              },
            };
          }}
        />
      </div>
      <CourseListDetail loading={loading} />
      <Modal title="" maskClosable={false} visible={isModalVisible} width="30%" className="course_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <h2>
          <FontAwesomeIcon icon={faBookBible} size="lg" color="#21bf73" style={{ marginRight: "10px" }} />
          Add new course
        </h2>

        <div className="modal_addnew_form">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onAddNewFinish} onFinishFailed={onAddNewFinishFailed} autoComplete="off" layout="vertical">
            <Form.Item label="Course Id" name="courseId">
              <Select
                showSearch
                bordered={false}
                placeholder="Select Course"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}>
                <Option value="1">DBW201</Option>
                <Option value="2">PRX301</Option>
                <Option value="3">PRM302</Option>
                <Option value="4">SWP401</Option>
                <Option value="5">PRO103</Option>
                <Option value="6">PMG201</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Course name" name="courseName">
              <Input disabled bordered={false} />
            </Form.Item>
            <Form.Item label="Lecturer" name="lecture">
              <Select
                showSearch
                bordered={false}
                placeholder="Select Lecturer"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}>
                <Option value="1">TranLQ</Option>
                <Option value="2">HoangVD</Option>
                <Option value="3">PRM302</Option>
                <Option value="4">ThanhDVB</Option>
                <Option value="5">NguyenNBD</Option>
                <Option value="6">MyNH</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ float: "right", margin: "0" }}>
              <Button type="primary" htmlType="submit" className="submit_button" onClick={handleCancel}>
                Done
              </Button>
              <Button type="primary" className="cancel_button" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
