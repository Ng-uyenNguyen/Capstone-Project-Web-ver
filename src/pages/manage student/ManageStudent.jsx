import { faEnvelope, faLocationDot, faMobileScreenButton, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, DatePicker, Form, Image, Input, Modal, Select, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import PersonDetail from "../../components/TeacherDetails";
import styles from "./ManageStudent.module.scss";
export const ManageStudent = () => {
  const dataSource = [
    {
      key: "1",
      name: (
        <>
          <Avatar src="https://drive.google.com/uc?export=view&id=1ACIeUGM2GYFQ4yK_4uf4I_sarLJvdcXo" style={{ marginRight: "10px" }}></Avatar> Nguyen Duy Bao Nguyen
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
  const [openPicker, data, authResponse] = useDrivePicker();
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    update: false,
  });
  const onUpdateFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      birthdate: fieldsValue["birthdate"].format("YYYY-MM-DD"),
    };
    console.log(values);
    setIsModalVisible((prev) => {
      return { ...prev, update: false };
    });
  };
  const onUpdateFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsModalVisible((prev) => {
      return { ...prev, update: false };
    });
  };
  const onAddNewFinish = (fieldsValue) => {
    form.resetFields();
    const values = {
      ...fieldsValue,
      birthdate: fieldsValue["birthdate"].format("YYYY-MM-DD"),
    };
    console.log(values);
    setIsModalVisible((prev) => {
      return { ...prev, addNew: false };
    });
  };
  const onAddNewFinishFailed = (err) => {
    console.log(err);
    setIsModalVisible((prev) => {
      return { ...prev, addNew: false };
    });
  };

  const showModal = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };

  const handleCancel = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: false };
    });
  };
  const handleOpenPicker = () => {
    openPicker({
      clientId: "783817650711-i61ag5smqtp7r7idjfdr689vo3jabh9p.apps.googleusercontent.com",
      developerKey: "AIzaSyDmk-kVoNPTD8_jjT58mClo8SRtJfF-fVo",
      viewId: "DOCS",
      token: "ya29.A0ARrdaM-8VZ0_3vgPRI12PZQ9ee1qwUcqFiq5NLvLUkzW7DyBIbYX7x9yaNjZ3lrfWnacU3HhXSi_kzz85QcmNR-6in8Rl-GordnKoLITqmx1s6CQ1DMbKyKCKGTtzyMeJu9fQj2eDdGolLlbI_TfkVJFr8JA", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };
  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);
  return (
    <div className={styles.container}>
      <Title level={3}>Manage Student</Title>
      <div className={styles.divider} />
      <div className={styles.student_list}>
        <Button
          type="primary"
          className={styles.add_new_student_btn}
          onClick={() => {
            showModal("addNew");
          }}>
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
      <PersonDetail
        loading={loading}
        showModal={() => {
          showModal("update");
        }}
      />
      {/* Modal update student */}
      <Modal title="" maskClosable={false} visible={isModalVisible.update} width="50%" className="person_update_modal" footer={null} closable={false} style={{ padding: 0 }}>
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
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onUpdateFinish} onFinishFailed={onUpdateFinishFailed} autoComplete="off" layout="vertical">
            <div className="form_row">
              <Form.Item label="Name" name="name" className="item1">
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faUser} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Birthdate" name="birthdate" className="item2">
                <DatePicker bordered={false} suffixIcon={<></>} placeholder="" />
                {/* <FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" style={{ marginRight: "10px" }} /> */}
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
                {/* <FontAwesomeIcon icon={faVenusMars} size="xl" color="#21bf73" style={{ marginRight: "10px" }} /> */}
                <Select bordered={false} defaultValue="male">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="Email" name="email">
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
            </Form.Item>
            <Form.Item style={{ float: "right", marginTop: "7%", marginBottom: "0" }}>
              <Button type="primary" htmlType="submit" className="submit_button" onClick={handleCancel}>
                Done
              </Button>
              <Button
                type="primary"
                className="cancel_button"
                onClick={() =>
                  setIsModalVisible((prev) => {
                    return { ...prev, update: false };
                  })
                }>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      {/* ============== Add new modal ==============*/}
      <Modal title="" maskClosable={false} visible={isModalVisible.addNew} width="30%" className="person_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <h2>
          <FontAwesomeIcon icon={faUserPlus} size="lg" color="#21bf73" style={{ marginRight: "10px" }} />
          Add new student
        </h2>

        <div className="modal_addnew_form">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onAddNewFinish} onFinishFailed={onAddNewFinishFailed} autoComplete="off" layout="vertical">
            <div className="form_row">
              <Form.Item label="Name" name="name" className="item1">
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faUser} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Birthdate" name="birthdate" className="item2">
                <DatePicker bordered={false} suffixIcon={<></>} placeholder="" />
                {/* <FontAwesomeIcon icon={faCalendar} size="xl" color="#21bf73" style={{ marginRight: "10px" }} /> */}
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
                {/* <FontAwesomeIcon icon={faVenusMars} size="xl" color="#21bf73" style={{ marginRight: "10px" }} /> */}
                <Select bordered={false} defaultValue="male">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
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
