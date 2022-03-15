import React from "react";
import { Modal, Avatar, Button, Form, Input, DatePicker, Image } from "antd";
import "./PersonUpdateModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faLocationDot, faMobileScreenButton, faVenusMars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
export const PersonUpdateModal = ({ isModalVisible }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal title="" maskClosable={false} visible={true} width="50%" className="person_update_modal" footer={null} closable={false}>
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
        <h2>Update Information</h2>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
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
            <Button type="primary" htmlType="submit" className="submit_button">
              Done
            </Button>
            <Button type="primary" htmlType="submit" className="cancel_button">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
