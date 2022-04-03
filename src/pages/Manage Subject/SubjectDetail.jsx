import React, { useState } from "react";
import { Image, Tag, Button, Modal, Select, Input, Typography, Form } from "antd";
import styles from "./StyleSubject.module.scss";
import { apiStore } from "../../constant/apiStore";

export const SubjectDetail = ({ loading, info, deleteSubject }) => {
  const { Title } = Typography;
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  // Select Input
  const lsTeacher = ["LE00001", "LE00003"];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = lsTeacher.filter((o) => !selectedItems.includes(o));
  const handleSelectChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const onUpdateFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
    };
    console.log(values);
  };

  return !loading ? (
    <div className={styles.subject_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.subject_detail}>
      <div className={styles.subject_banner}>
        <div className={styles.subject_info}>
          <Image src={require("../../assets/images/icon_subject.png")} alt="icon_subject" width={56} height={53}></Image>
          <div>
            <h4>{info.name}</h4>
            <p>{info.subjectCode}</p>
          </div>
        </div>
      </div>
      {/* Subject Info detail*/}
      <div className={styles.teaching_teachers}>
        <div className={styles.heading_title}>
          <h4>
            <b>Teaching teachers</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.teaching_teachers__info}>
          <ul>
            {info.teachers.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.studying_classes}>
        <div className={styles.heading_title}>
          <h4>
            <b>Studying classes</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
        </div>
      </div>
      <div className={styles.specs}>
        <div className={styles.heading_title}>
          <h4>
            <b>Specializations</b>
          </h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          {info.specializations.map((item, index) => (
            <Tag key={index} className={styles.subject_detail__subject_tag}>
              {item}
            </Tag>
          ))}
        </div>
      </div>
      {/* ======= button  */}
      <div className={styles.btn_field}>
        <Button
          className={styles.btn_remove}
          onClick={() => {
            deleteSubject();
          }}>
          REMOVE
        </Button>
        <Button className={styles.btn_update} onClick={showModal}>
          UPDATE
        </Button>
      </div>
      <div className={styles.modalStyle}>
        <Modal className="addNew_subject_modal" visible={isModalVisible} onCancel={handleCancel} footer={[<Button className={styles.btn_done}>Done</Button>]}>
          <div className="modal_content">
            <div className={styles.modalTitle}>
              <img src={require("../../assets/images/icon_addSubject.png")} style={{ width: "30px" }}></img>
              <Title level={4}>UPDATE SUBJECT</Title>
            </div>
            {/* ==== Form Input ===== */}
            <Form layout="vertical" onFinish={onUpdateFinish}>
              <Form.Item label="Subject Name" name="name" rules={[{ required: true, message: "Please enter subject name!" }]}>
                <div className="input_field">
                  <img src={require("../../assets/images/icon_subject02.png")} alt="icon_subject" />
                  <Input placeholder="Data Warehouse" bordered={false} required={true} />
                </div>
              </Form.Item>
              <Form.Item label="Subject Code" name="subjectCode" rules={[{ required: true, message: "Please input subject code!" }]}>
                <div className="input_field">
                  <img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subjectCode" />
                  <Input placeholder="DBW101" bordered={false} required={true} />
                </div>
              </Form.Item>
              <Form.Item label="Lecture Name" name="teacherIds">
                <div className="input_field">
                  <img src={require("../../assets/images/icon_teacher02.png")} alt="icon_teacher" style={{ width: "30px" }} />
                  <Select mode="multiple" placeholder="Select lectures" value={selectedItems} onChange={handleSelectChange} style={{ width: "100%" }}>
                    {filteredOptions.map((item) => (
                      <Select.Option key={item} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};
