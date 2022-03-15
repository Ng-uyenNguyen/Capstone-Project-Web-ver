import { Table, Avatar, Typography, Button, Modal, Form, Input, DatePicker, Image } from "antd";
import React, { useState } from "react";
import { PersonUpdateModal } from "../../components/modal/update person/PersonUpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faLocationDot, faMobileScreenButton, faVenusMars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import PersonDetail from "../../components/TeacherDetails";
import styles from "./ManageStudent.module.scss";
export const ManageStudent = () => {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={styles.container}>
      <Title level={3}>Manage Student</Title>
      <div className={styles.divider} />
      <div className={styles.student_list}>
        <Button type="primary" className={styles.add_new_student_btn} onClick={showModal}>
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
      {/* Modal update student */}
      <Modal title="" maskClosable={false} visible={isModalVisible} width="50%" className="person_update_modal" footer={null} closable={false}>
        <div className="modal_person_info">
          <div className="modal_person_personal">
            <Avatar src="https://joeschmoe.io/api/v1/random" size={140}></Avatar>
            <h3 className="modal_person_name">Cody Fisher</h3>
            <div>
              <h4>SI1423</h4>
              <h4>Student</h4>
            </div>
          </div>
          <div className="modal_person_social">
            <h4>Studying Class</h4>
            <div className="divider"></div>
            <div className="school_info_item_wrapper">
              <div className="school_info_item">SE1401</div>
              <div className="school_info_item">SE1402</div>
              <div className="school_info_item">SE1403</div>
              <div className="school_info_item">SE1404</div>
            </div>
          </div>
        </div>
        <div className="modal_update_info">
          <h1>
            Update Information <Image src={require("../../assets/images/update_icon.png")} />
          </h1>
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
            <div className="form_row">
              <Form.Item label="Name" name="name" className="item1">
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faUser} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Birthdate" name="birthdate" className="item2">
                {/* <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" />} /> */}
                <FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" style={{ marginRight: "10px" }} />
                <DatePicker bordered={false} suffixIcon={<></>} placeholder="" />
              </Form.Item>
            </div>
            <Form.Item label="Address" name="address">
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faLocationDot} size="xl" color="#21bf73" />} />
            </Form.Item>
            <div className="form_row">
              <Form.Item label="Contact" name="contact" className="item1">
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faMobileScreenButton} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Gender" name="gender" className="item2">
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faVenusMars} size="xl" color="#21bf73" />} />
              </Form.Item>
            </div>
            <Form.Item label="Email" name="email">
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
            </Form.Item>
            <Form.Item style={{ float: "right", marginTop: "7%" }}>
              <Button type="primary" htmlType="submit" className="submit_button" onClick={handleCancel}>
                Done
              </Button>
              <Button type="primary" htmlType="submit" className="cancel_button">
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
