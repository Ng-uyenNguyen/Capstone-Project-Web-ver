import React, { useState, useEffect } from "react";
import { Tag, Typography, Button, Table, Modal, Input, Select, Form } from "antd";
import { SubjectDetail } from "./SubjectDetail";
import styles from "./StyleSubject.module.scss";
import Title from "antd/lib/skeleton/Title";
import { apiStore } from "../../constant/apiStore";
export const ManageSubject = () => {
  const { Title } = Typography;
  const [listClass, setListClass] = useState([]);
  const [subjectID, setSubID] = useState();
  let subID = 0
  useEffect(() => {
    const fetchData = async () => {
      const response  = await fetch(apiStore.subjects);
      const data = await response.json();
      setListClass(data);
    }
    fetchData()
  }, [])

  // const dataSource = [
  //   {
  //     no: "01",
  //     nameCode: "DBW301",
  //     name: "Data Warehouse",
  //     specializations: ["IS ", "JS"],
  //   },
  //   {
  //     no: "02",
  //     nameCode: "WEB201c",
  //     name: "Web Design",
  //     specializations: ["IS"],
  //   },
  //   {
  //     no: "03",
  //     nameCode: "ACC101",
  //     name: "Accounting Principles",
  //     specializations: ["IS ", "BA"],
  //   },
  //   {
  //     no: "01",
  //     nameCode: "DBW301",
  //     name: "Data Warehouse",
  //     specializations: ["IS ", "JS"],
  //   },
  //   {
  //     no: "02",
  //     nameCode: "WEB201c",
  //     name: "Web Design",
  //     specializations: ["IS"],
  //   },
  //   {
  //     no: "03",
  //     nameCode: "ACC101",
  //     name: "Accounting Principles",
  //     specializations: ["IS ", "BA"],
  //   },
  // ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name  Code",
      dataIndex: "subjectCode",
      key: "subjectCode",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specializations",
      key: "specializations",
      render: (specializations) => (
        <>
          {specializations.map((specialization) => {
            return (
              <Tag key={specialization} className={styles.subject_tag}>
                {specialization.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  // Select Input 
  const lsTeacher = ['Lý Quỳnh Trân', 'Nguyễn Quốc Long', 'Nguyễn Xuân Long', 'Nguyễn Thị Mai Sau'];
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = lsTeacher.filter(o => !selectedItems.includes(o));
  const handleSelectChange = selectedItems => {
    setSelectedItems(selectedItems);
  }
  return (
    <div className={styles.manage_subject}>
      <Title level={3}>
        <b>Manage Subject</b>
      </Title>
      <div className={styles.divider} />

      <div className={styles.manage_subject__table}>
        <Button type="primary" className={styles.add_new_subject_btn} onClick={showModal}>
          + New Subject
        </Button>
        <div>
          <Modal className="addNew_subject_modal" visible={isModalVisible} onCancel={handleCancel} footer={[
            <Button htmlType="submit" className={styles.btn_done}>Done</Button>
          ]}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSubject.png")} style={{ width: "30px" }}></img>
                <Title level={4}>NEW SUBJECT</Title>
              </div>
              {/* ==== Form Input ===== */}
              <Form layout="vertical">
                <Form.Item label="Subject Name" name="name" rules={[{ required: true, message: 'Please enter subject name!' }]}>
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_subject02.png")} alt="icon_subject" />
                    <Input placeholder="Data Warehouse" bordered={false} required={true} />
                  </div>
                </Form.Item>
                <Form.Item label="Subject Code" name="subjectCode" rules={[{ required: true, message: 'Please input subject code!' }]}>
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subjectCode" />
                    <Input placeholder="DBW101" bordered={false} required={true} />
                  </div>
                </Form.Item>
                <Form.Item label="Lecturer Name" name="lname">
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_teacher02.png")} alt="icon_teacher" />
                    <Select
                      mode="multiple"
                      placeholder="Select lectures"
                      value={selectedItems}
                      onChange={handleSelectChange}
                      style={{ width: '100%' }}
                    >
                      {filteredOptions.map(item => (
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

        {/* Table Data */}
        <Table
          className="custom_table_1"
          dataSource={listClass}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                subID = record.id
                console.log(subID)
               
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
      <SubjectDetail loading={loading}  />
    </div>
  );
};
