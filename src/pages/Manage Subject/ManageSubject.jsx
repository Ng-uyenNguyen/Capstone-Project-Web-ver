import React, { useState, useEffect } from "react";
import { Tag, Typography, Button, Table, Modal, Input, Select, Form } from "antd";
import { SubjectDetail } from "./SubjectDetail";
import styles from "./StyleSubject.module.scss";

import { apiStore } from "../../constant/apiStore";
import { display } from "@mui/system";
export const ManageSubject = () => {
  const { Title } = Typography;
  const [listSubjects, setListSub] = useState([]);
  const [info, setInfo] = useState({
    teachers: [],
    specs: [],
    name: "",
    code: "",
    id: "",
  });
  const [reRender, setReRender] = useState("");

  const [lsTeacher, setlsTeachers] = useState([]);
  useEffect(() => {
    async function getSubjects() {
      const res = await fetch(apiStore.subjects);
      const data = await res.json();
      setListSub(data);
    }

    setTimeout(getSubjects, 1000);
  }, [reRender]);
  useEffect(() => {
    async function getLsTeacher() {
      const res = await fetch(apiStore.getTeachers);
      const data = await res.json();
      setlsTeachers(data);
    }
    setTimeout(getLsTeacher, 1000);
  }, []);
  //======================================  DELETE SUBJECT ======================
  //  console.log(apiStore.deleteSubject+info.id)
  const deleteSubject = () => {
    console.log("hhiiiiiiiii");
    console.log(info.id);
    fetch(apiStore.deleteSubject + info.id, { method: "DELETE" })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Success");
          setReRender("delete");
        }
      })
      .catch((error) => {
        // setErrorMessage(error);
        console.error("There was an error!", error);
      });
  };
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
          {specializations.map((specialization, i) => {
            return (
              <Tag key={i} className={styles.subject_tag}>
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  // Selected Input

  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = lsTeacher.filter((o) => !selectedItems.includes(o));

  const handleSelectChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  //======================================  ADD NEW SUBJECT ======================
  const [form] = Form.useForm();

  const onAddNewFinish = (fieldsValue) => {
    form.resetFields();
    const values = {
      ...fieldsValue,
      teacherIds: selectedItems,
    };
    fetch(apiStore.subjects, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("add new success");
          setReRender("add new");
        }
      })

      .catch((err) => {
        console.error(err);
      });
    setSelectedItems([]);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setSelectedItems([]);
    setIsModalVisible(false);
  };

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
          <Modal className="addNew_subject_modal" visible={isModalVisible} onCancel={handleCancel} footer={null} closable={false} maskClosable={false}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSubject.png")} style={{ width: "30px" }} />
                <Title level={4}>NEW SUBJECT</Title>
              </div>
              {/* ==== Form Input ===== */}
              <Form form={form} layout="vertical" onFinish={onAddNewFinish} style={{ height: "400px" }}>
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
                <Form.Item label="Lecturer Name" name="teacherIds">
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_teacher02.png")} alt="icon_teacher" />
                    <Select mode="multiple" placeholder="Select lectures" value={selectedItems} onChange={handleSelectChange} style={{ width: "100%" }}>
                      {filteredOptions.map((item, i) => (
                        <Select.Option key={i} value={item.accountId}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Form.Item>
                <Form.Item style={{ float: "right", margin: "12px" }}>
                  <Button className={styles.btn_cancel} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button htmlType="submit" className={styles.btn_done}>
                    Done
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>

        {/* Table Data */}
        <Table
          className="custom_table_1"
          dataSource={listSubjects}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const rows = event.target.parentElement.parentElement.children;

                setActiveRow((prev) => {
                  console.log(prev);
                  if (rows[[prev]] !== undefined) rows[[prev]].classList.remove("active");
                  event.target.parentElement.classList.add("active");
                  return rowIndex;
                });
                setInfo({ ...record });
                setLoading(true);
              },
            };
          }}
        />
      </div>
      <SubjectDetail loading={loading} info={info} deleteSubject={deleteSubject} />
    </div>
  );
};
