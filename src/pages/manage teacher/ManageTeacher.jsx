import { faCalendar, faEnvelope, faLocationDot, faMobileScreenButton, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, DatePicker, Form, Image, Input, Modal, Select, Table, Typography, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import PersonDetail from "../../components/TeacherDetails";
import { apiStore } from "../../constant/apiStore";
import styles from "./ManageTeacher.module.scss";

export const ManageTeacher = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  const [openPicker, data, authResponse] = useDrivePicker();
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reRender, setReRender] = useState("");
  const { Title } = Typography;
  const [updateForm] = Form.useForm();
  const [addNewForm] = Form.useForm();
  const { Option } = Select;
  const [tableLoading, setTableLoading] = useState(true);
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
  const onUpdateFinish = (fieldsValue) => {
    const data = {
      khoa: parseInt(selectedTeacher.accountId.slice(2, 4)),
      roleId: 2,
      specializationId: 1,
      personalEmail: fieldsValue.email,
      name: fieldsValue.name,
      age: fieldsValue.age,
      avatar: selectedTeacher.avatar,
      phone: fieldsValue.contact,
      gender: fieldsValue.gender,
      address: fieldsValue.address,
    };
    console.log(data);
    console.log(apiStore.updateProfile + selectedTeacher.accountId);
    const updateTeacher = async () => {
      const res = await axios.put(apiStore.updateProfile + selectedTeacher.accountId, data);
      if (res.status === 200) {
        message.success("Update successfully!");
        setReRender("update");
        setIsModalVisible((prev) => {
          return { ...prev, update: false };
        });
      } else {
        message.error("Update failed!");
        setIsModalVisible((prev) => {
          return { ...prev, update: false };
        });
        console.error(res);
      }
    };
    updateTeacher();
  };

  const onAddNewFinish = (fieldsValue) => {
    const teacherData = {
      khoa: 1,
      roleId: 2,
      specializationId: 1,
      personalEmail: fieldsValue.email,
      name: fieldsValue.name,
      age: fieldsValue.age,
      avatar: data.docs[0].id,
      phone: fieldsValue.contact,
      gender: fieldsValue.gender,
      address: fieldsValue.address,
    };
    const addNewTeacher = async () => {
      const res = await axios.post(apiStore.register, teacherData);
      if (res.status === 200) {
        message.success("Add new teacher successfully!");
        addNewForm.resetFields();
        setReRender("addNew");
        setIsModalVisible((prev) => {
          return { ...prev, addNew: false };
        });
      } else {
        addNewForm.resetFields();
        message.error("Add new teacher failed!");
        setIsModalVisible((prev) => {
          return { ...prev, addNew: false };
        });
        console.error(res);
      }
    };
    addNewTeacher();
  };
  const showModal = (method) => {
    if (method === "update") {
      updateForm.setFieldsValue({ name: selectedTeacher.name, age: selectedTeacher.age, email: selectedTeacher.personalEmail, address: selectedTeacher.address, contact: selectedTeacher.phone, gender: selectedTeacher.gender });
    }
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };

  const handleCancel = (method) => {
    method === "addNew" && addNewForm.resetFields();
    setIsModalVisible((prev) => {
      return { ...prev, [method]: false };
    });
  };
  const handleOpenPicker = () => {
    openPicker({
      clientId: "783817650711-i61ag5smqtp7r7idjfdr689vo3jabh9p.apps.googleusercontent.com",
      developerKey: "AIzaSyDmk-kVoNPTD8_jjT58mClo8SRtJfF-fVo",
      viewId: "DOCS",
      token: "ya29.A0ARrdaM9op1qMcbeHj4vr430uw9NPE724vRKgsbEadi3LKY-0eQexHWD5tXjtc_A6Gz2jILA0yYC-YZ2TogNc3jrGfZKvmqGcGMc8bdbUXMVXT8lXEdhv-h32A84N4Hi8fZjKfKfQLEMnLpxM22h0Nf82fM6a", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    update: false,
  });
  // ------ Fetch teacher data -----------
  useEffect(() => {
    setTableLoading(true);
    const fetchTeacherData = async () => {
      const res = await axios.get(apiStore.getAllTeachers);
      const data = res.data;
      const mappedData = data.map((item, index) => ({
        key: index,
        name: (
          <>
            <Avatar src={"https://drive.google.com/uc?export=view&id=" + item.avatar} style={{ marginRight: "10px" }}></Avatar> {item.name}
          </>
        ),
        id: item.accountId,
        phone: item.phone,
        email: item.email,
      }));
      setDataSource([...mappedData]);
      setTeacherData([...data]);
      setTableLoading(false);
    };
    fetchTeacherData();
  }, [reRender]);

  return (
    <div className={styles.container}>
      <Title level={3}>Manage Teacher</Title>
      <div className={styles.divider} />
      <div className={styles.teacher_list}>
        <Button
          type="primary"
          className={styles.add_new_teacher_btn}
          onClick={() => {
            showModal("addNew");
          }}>
          + New Teacher
        </Button>
        <Table
          className="custom_table_1"
          loading={tableLoading}
          dataSource={dataSource}
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
                setLoading(true);
                let selected = teacherData.find((e) => e.accountId === record.id);
                setSelectedTeacher({ ...selected });
              },
            };
          }}
        />
      </div>
      <PersonDetail
        loading={loading}
        showModal={() => {
          showModal("update");
        }}
        role="Lecturer"
        selectedPerson={selectedTeacher}
      />
      {/* Modal update teacher */}

      {selectedTeacher !== {} && (
        <Modal forceRender title="" maskClosable={false} visible={isModalVisible.update} width="60%" className="person_update_modal" footer={null} closable={false} style={{ padding: 0 }} getContainer={false}>
          <div className="modal_person_info">
            <div className="modal_person_personal">
              <Avatar src={"https://drive.google.com/uc?export=view&id=" + selectedTeacher.avatar} size={140}></Avatar>
              <h3 className="modal_person_name">{selectedTeacher.name}</h3>
              <div>
                <h4>{selectedTeacher.accountId}</h4>
                <h4>Lecturer</h4>
              </div>
            </div>
            <div className="modal_person_social">
              <h4>Teaching Subject</h4>
              <div className="divider"></div>
              {selectedTeacher.subjects !== undefined ? (
                <div className="school_info_item_wrapper">
                  {selectedTeacher.subjects.map((item) => (
                    <div className="school_info_item">{item}</div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="modal_update_info">
            <h1>
              Update Information <Image src={require("../../assets/images/update_icon.png")} />
            </h1>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onUpdateFinish} autoComplete="off" layout="vertical" form={updateForm}>
              <div className="form_row">
                <Form.Item label="Name" name="name" className="item1" rules={[{ required: true }]}>
                  <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faUser} size="xl" color="#21bf73" />} />
                </Form.Item>
                <Form.Item label="Age" name="age" className="item2" rules={[{ required: true }]}>
                  <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" />} />
                </Form.Item>
              </div>
              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faLocationDot} size="xl" color="#21bf73" />} />
              </Form.Item>
              <div className="form_row">
                <Form.Item label="Contact" name="contact" className="item1" rules={[{ required: true }]}>
                  <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faMobileScreenButton} size="xl" color="#21bf73" />} />
                </Form.Item>
                <Form.Item label="Gender" name="gender" className="item2">
                  <Select bordered={false}>
                    <Option value={0}>Male</Option>
                    <Option value={1}>Female</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item style={{ float: "right", marginTop: "7%", marginBottom: "0" }}>
                <Button type="primary" htmlType="submit" className="submit_button">
                  Done
                </Button>
                <Button type="primary" className="cancel_button" onClick={() => handleCancel("update")}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      )}
      {/* ============== Add new modal ==============*/}
      <Modal title="" maskClosable={false} visible={isModalVisible.addNew} width="30%" className="person_addnew_modal" footer={null} closable={false} style={{ padding: 0 }} getContainer={false}>
        <h2>
          <FontAwesomeIcon icon={faUserPlus} size="lg" color="#21bf73" style={{ marginRight: "10px" }} />
          Add new teacher
        </h2>
        <div className="modal_addnew_form">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onAddNewFinish} autoComplete="off" layout="vertical" form={addNewForm}>
            <div className="form_row">
              <Form.Item label="Name" name="name" className="item1" rules={[{ required: true }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faUser} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Age" name="age" className="item2" rules={[{ required: true }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" />} />
              </Form.Item>
            </div>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faLocationDot} size="xl" color="#21bf73" />} />
            </Form.Item>
            <div className="form_row">
              <Form.Item label="Contact" name="contact" className="item1" rules={[{ required: true }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faMobileScreenButton} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Gender" name="gender" className="item2" initialValue={0}>
                <Select bordered={false} className="gender">
                  <Option value={0}>Male</Option>
                  <Option value={1}>Female</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="Email" name="email">
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <button onClick={() => handleOpenPicker()}>Open Picker</button>
            </Form.Item>
            <Form.Item style={{ float: "right", margin: "0" }}>
              <Button type="primary" htmlType="submit" className="submit_button" onClick={handleCancel}>
                Done
              </Button>
              <Button
                type="primary"
                className="cancel_button"
                onClick={() =>
                  setIsModalVisible((prev) => {
                    return { ...prev, addNew: false };
                  })
                }>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
