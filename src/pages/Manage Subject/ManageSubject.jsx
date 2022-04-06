import React, { useState, useEffect } from "react";
import { Tag, Typography, Button, Table, Modal, Input, Select, Form, message } from "antd";
import { SubjectDetail } from "./SubjectDetail";
import styles from "./StyleSubject.module.scss";
import { SearchOutlined } from "@mui/icons-material";
import { apiStore } from "../../constant/apiStore";
import { display, flexbox } from "@mui/system";
import { ExclamationCircleOutlined } from "@ant-design/icons";
export const ManageSubject = () => {
  const { Title } = Typography;
  const [listSubjects, setListSub] = useState([]);
  const [info, setInfo] = useState({});
  const [reRender, setReRender] = useState("");

  const [lsTeacher, setlsTeachers] = useState([]);
  const [formUpdate] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadTable, setLoadTable] = useState(true);

  // modal
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    update: false,
    confirm: false,
  });
  const handleCancel = () => {
    formAdd.resetFields();
    formUpdate.resetFields();
    setIsModalVisible(false);
  };
  const showModal = (method) => {
    console.log(info);
    formUpdate.setFieldsValue({ name: info.name, subjectCode: info.subjectCode });

    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };
  // Selected Input

  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOptions = lsTeacher.filter((o) => !selectedItems.includes(o));

  const handleSelectChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  //========== GET LIST SUBJECTS AND STUDENTS
  useEffect(() => {
    setLoadTable(true);
    async function getSubjects() {
      const res = await fetch(apiStore.getSubjects);
      const data = await res.json();
      setListSub(data);
      setLoadTable(false);
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          autoFocus
          placeholder="Search here..."
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
        />
      ),
      filterIcon: () => <SearchOutlined size="large" />,
      onFilter: (value, record) => record.subjectCode.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          autoFocus
          placeholder="Search here..."
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
        />
      ),
      filterIcon: () => <SearchOutlined size="large" />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
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

  //======================================  ADD NEW SUBJECT ======================
  const addNewSubject = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      teacherIds: selectedItems,
    };
    fetch(apiStore.getSubjects, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          message.success("Add new subject successfully!");
          setReRender("add new");
        } else {
          message.error("Add new subject failed!");
        }
      })

      .catch((err) => {
        console.error(err);
      });
    setSelectedItems([]);
    formAdd.resetFields();
    setIsModalVisible((prev) => {
      return { ...prev, addNew: false };
    });
  };
  //======================= DELETE SUBJECT ======================
  const deleteSubject = () => {
    fetch(apiStore.subject + info.id, { method: "DELETE" })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Success");
          message.success("Delete subject successfully!");
          setReRender("delete");
          setLoading(false);
        } else {
          message.error("Delete subject failed!");
        }
      })
      .catch((error) => {
        // setErrorMessage(error);
        console.error("There was an error!", error);
      });
    setIsModalVisible((prev) => {
      return { ...prev, confirm: false };
    });
  };
  //====================== UPDATE SUBJECT ========================
  const updateSubject = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      teacherIds: selectedItems,
    };
    fetch(apiStore.subject + info.id, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          message.success("Update Subject successfully");
          setReRender("update");
        } else {
          message.error("Update Subject failed");
        }
      })

      .catch((err) => {
        console.error(err);
      });
    formUpdate.resetFields();
    setIsModalVisible((prev) => {
      return { ...prev, update: false };
    });
  };

  return (
    <div className={styles.manage_subject}>
      <Title level={3}>
        <b>Manage Subjects</b>
      </Title>
      <div className={styles.divider} />

      <div className={styles.manage_subject__table}>
        <Button
          type="primary"
          className={styles.add_new_subject_btn}
          onClick={() => {
            showModal("addNew");
          }}>
          + New Subject
        </Button>
        {/* ================== New Subject Modal  ======================*/}
        <div>
          <Modal className="addNew_subject_modal" visible={isModalVisible.addNew} onCancel={handleCancel} footer={null} closable={false} maskClosable={false}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSubject.png")} style={{ width: "30px" }} />
                <Title level={4}>NEW SUBJECT</Title>
              </div>
              {/* ==== Form Input ===== */}
              <Form form={formAdd} layout="vertical" onFinish={addNewSubject} style={{ height: "400px" }}>
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
        {/* ================== Update Subject Modal  ======================*/}
        <div className={styles.modalStyle}>
          <Modal className="addNew_subject_modal" visible={isModalVisible.update} onCancel={handleCancel} footer={null} closable={false} maskClosable={false}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSubject.png")} style={{ width: "30px" }}></img>
                <Title level={4}>UPDATE SUBJECT</Title>
              </div>
              {/* ==== UPDATE SUBJECT FORM  ===== */}
              <Form form={formUpdate} layout="vertical" onFinish={updateSubject} style={{ height: "400px" }}>
                <div className="input_field">
                  <Form.Item label="Subject Name" name="name" rules={[{ required: true, message: "Please enter subject name!" }]}>
                    {/* <img src={require("../../assets/images/icon_subject02.png")} alt="icon_subject" /> */}
                    <Input placeholder="Data Warehouse" bordered={false} required={true} addonBefore={<img src={require("../../assets/images/icon_subject02.png")} alt="icon_subjectCode" />} />
                  </Form.Item>
                </div>
                <div className="input_field">
                  <Form.Item label="Subject Code" name="subjectCode" rules={[{ required: true, message: "Please input subject code!" }]}>
                    <Input placeholder="DBW101" bordered={false} required={true} addonBefore={<img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subjectCode" />} />
                  </Form.Item>
                </div>
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
        {/* ================== Confirm Modal  ======================*/}
        <div>
          <Modal
            width={400}
            className="addNew_subject_modal"
            style={{ width: "40px" }}
            closable={false}
            maskClosable={false}
            visible={isModalVisible.confirm}
            footer={[
              <div>
                <Button className={styles.btn_cancel} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className={styles.btn_done} onClick={deleteSubject}>
                  OK
                </Button>
              </div>,
            ]}>
            <div>
              <h2>Confirm</h2>
              <p>Do you want to delete this subject?</p>
            </div>
          </Modal>
        </div>
        {/* Table Data */}
        <Table
          loading={loadTable}
          className="custom_table_1"
          dataSource={listSubjects}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const rows = event.target.parentElement.parentElement.children;
                setActiveRow((prev) => {
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
      <SubjectDetail loading={loading} info={info} showModal={showModal} />
    </div>
  );
};
