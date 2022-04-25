import { DownloadOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { faCalendar, faEnvelope, faLocationDot, faMobileScreenButton, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, DatePicker, Form, Image, Input, Modal, Select, Table, Typography, message, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import PersonDetail from "../../components/TeacherDetails";
import { apiStore } from "../../constant/apiStore";
import styles from "./ManageStudent.module.scss";

export const ManageStudent = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [studentData, setStudentData] = useState([]);
  const [openPicker, data, authResponse] = useDrivePicker();
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [reRender, setReRender] = useState("");
  const [fileList, setFileList] = useState([]);
  const [upLoading, setUpLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    update: false,
    import: false,
  });
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
      onFilter: (value, record) => record.id.toLowerCase().includes(value.toLowerCase()),
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
      khoa: parseInt(selectedStudent.accountId.slice(2, 4)),
      roleId: 3,
      specializationId: 1,
      personalEmail: fieldsValue.email,
      name: fieldsValue.name,
      age: fieldsValue.age,
      avatar: selectedStudent.avatar,
      phone: fieldsValue.contact,
      gender: fieldsValue.gender,
      address: fieldsValue.address,
    };
    console.log(apiStore.updateProfile + selectedStudent.accountId);
    const updateStudent = async () => {
      const res = await axios.put(apiStore.updateProfile + selectedStudent.accountId, data);
      if (res.status === 200) {
        message.success("Update successfully!");
        setReRender("Update");
        setIsModalVisible((prev) => {
          return { ...prev, update: false };
        });
      } else {
        message.error("Update failed!");
        console.error(res);
      }
    };
    updateStudent();
  };
  const onUpdateFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setIsModalVisible((prev) => {
      return { ...prev, update: false };
    });
  };
  const handleUpload = async () => {
    const fileUpload = new FormData();
    console.log(fileList);
    fileUpload.append("file", fileList);
    try {
      const res = await axios.post(apiStore.registerImports, fileUpload, { headers: { "Access-Control-Allow-Origin": "*" } });
      if (res.status === 200) {
        message.success("Upload successfully!");
        setReRender("import");
      }
    } catch (error) {
      message.error("Upload failed!");
      console.error(error);
    }
  };
  const onAddNewFinish = (fieldsValue) => {
    const studentData = {
      khoa: fieldsValue.khoa,
      roleId: 3,
      specializationId: fieldsValue.specialization,
      personalEmail: fieldsValue.email,
      name: fieldsValue.name,
      age: fieldsValue.age,
      avatar: data.docs[0].id,
      phone: fieldsValue.contact,
      gender: fieldsValue.gender,
      address: fieldsValue.address,
    };
    console.log(studentData);
    const addNewStudent = async () => {
      try {
        const res = await axios.post(apiStore.register, studentData);
        if (res.status === 200) {
          addNewForm.resetFields();
          message.success("Add new student successfully!");
          setReRender("Add new");
          setIsModalVisible((prev) => {
            return { ...prev, addNew: false };
          });
        }
      } catch (error) {
        message.error("Add new student failed!");
        console.error(error);
      }
    };
    addNewStudent();
  };
  const showModal = (method) => {
    if (method === "update") {
      updateForm.setFieldsValue({ name: selectedStudent.name, age: selectedStudent.age, email: selectedStudent.personalEmail, address: selectedStudent.address, contact: selectedStudent.phone, gender: selectedStudent.gender });
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
      token: "ya29.A0ARrdaM9_QJtdjAE3fz8ZM2iD2ObMaeh-Vj_i0JX9gLOOJ6D2N8wC-aOPkvKABkWbziQunqgdYnh3G3QKBs2JtVAcf9GiweARHtbJd1I9ZBDp-H_CmygN54yPk09fejYqCLtuHZnd5SxqLlfjXLjmUayeid1K", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  const handleDeActive = async () => {
    const deActiveAccounts = [selectedStudent.accountId];
    try {
      const res = await axios.put(apiStore.deAtiveAccount, deActiveAccounts);
      if (res.status === 200) {
        message.success("Account was de-activated!");
        setReRender("De-active");
      }
    } catch (error) {
      message.error("Cannot de-active account!");
      console.error(error);
    }
  };
  // ------ Fetch student data -----------
  useEffect(() => {
    setTableLoading(true);
    const fetchStudentData = async () => {
      const res = await axios.get(apiStore.getStudents);
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
      setStudentData([...data]);
      setTableLoading(false);
    };
    fetchStudentData();
  }, [reRender]);

  // ---------- Fetch specialization data --------------
  useEffect(() => {
    const fetchStudentData = async () => {
      const res = await axios.get(apiStore.getAllSpecializations);
      const data = res.data;
      setSpecializations(data);
    };
    fetchStudentData();
  }, []);

  return (
    <div className={styles.container}>
      <Title level={3}>Manage Student</Title>
      <div className={styles.divider} />
      <div className={styles.student_list}>
        <Button
          type="primary"
          className={styles.import_new_student_btn}
          onClick={() => {
            showModal("import");
          }}>
          <UploadOutlined />
          Import
        </Button>
        <Button
          type="primary"
          className={styles.add_new_student_btn}
          onClick={() => {
            showModal("addNew");
          }}>
          + New Student
        </Button>
        <Table
          loading={tableLoading}
          className="custom_table_1"
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
                let selected = studentData.find((e) => e.accountId === record.id);
                setSelectedStudent({ ...selected });
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
        role="Student"
        selectedPerson={selectedStudent}
        handleDeActive={handleDeActive}
      />
      {/* Modal update student */}

      {selectedStudent !== {} && (
        <Modal forceRender title="" maskClosable={false} visible={isModalVisible.update} width="60%" className="person_update_modal" footer={null} closable={false} style={{ padding: 0 }} getContainer={false}>
          <div className="modal_person_info">
            <div className="modal_person_personal">
              <Avatar src={"https://drive.google.com/uc?export=view&id=" + selectedStudent.avatar} size={140}></Avatar>
              <h3 className="modal_person_name">{selectedStudent.name}</h3>
              <div>
                <h4>{selectedStudent.accountId}</h4>
                <h4>Student</h4>
              </div>
            </div>
            <div className="modal_person_social">
              <h4>Studying Class</h4>
              <div className="divider"></div>
              <div className="school_info_item_wrapper">{selectedStudent.classs !== undefined && selectedStudent.classs.map((className) => <div className="school_info_item">{className}</div>)}</div>
            </div>
          </div>
          <div className="modal_update_info">
            <h1>
              Update Information <Image src={require("../../assets/images/update_icon.png")} preview={false} />
            </h1>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onUpdateFinish} onFinishFailed={onUpdateFinishFailed} autoComplete="off" layout="vertical" form={updateForm}>
              <div className="form_row">
                <Form.Item label="Name" name="name" className="item1" rules={[{ required: true }, { pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$", message: "Invalid phone number" }]}>
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
              <Form.Item label="Email" name="email" rules={[{ required: true }, { pattern: /^[^s@]+@[^s@]+.[^s@]+$/, message: "Invalid email address" }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item style={{ float: "right", marginTop: "7%", marginBottom: "0" }}>
                <Button type="primary" htmlType="submit" className="submit_button">
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
      )}
      {/* ============== Add new modal ==============*/}
      <Modal title="" maskClosable={false} visible={isModalVisible.addNew} width="30%" className="person_addnew_modal" footer={null} closable={false} style={{ padding: 0 }} getContainer={false}>
        <h2>
          <FontAwesomeIcon icon={faUserPlus} size="lg" color="#21bf73" style={{ marginRight: "10px" }} />
          Add new student
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
            <div className="form_row">
              <Form.Item label="Specialization" name="specialization" className="item1">
                <Select bordered={false} className="specialization">
                  {specializations.map((item, index) => (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Academic Year" name="khoa" className="item2" initialValue={14}>
                <Select bordered={false} className="year">
                  <Option value={14}>K14</Option>
                  <Option value={15}>K15</Option>
                  <Option value={16}>K16</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faLocationDot} size="xl" color="#21bf73" />} />
            </Form.Item>
            <div className="form_row">
              <Form.Item label="Contact" name="contact" className="item1" rules={[{ required: true }, { pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$", message: "Invalid phone number" }]}>
                <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faMobileScreenButton} size="xl" color="#21bf73" />} />
              </Form.Item>
              <Form.Item label="Gender" name="gender" className="item2" initialValue={0}>
                <Select bordered={false} className="gender">
                  <Option value={0}>Male</Option>
                  <Option value={1}>Female</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="Email" name="email" rules={[{ required: true }, { pattern: /^[^s@]+@[^s@]+.[^s@]+$/, message: "Invalid email address" }]}>
              <Input bordered={false} addonBefore={<FontAwesomeIcon icon={faEnvelope} size="xl" color="#21bf73" />} />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
              <button onClick={() => handleOpenPicker()}>Open Picker</button>
            </Form.Item>
            <Form.Item style={{ float: "right", margin: "0" }}>
              <Button type="primary" htmlType="submit" className="submit_button">
                Done
              </Button>
              <Button type="primary" className="cancel_button" onClick={() => handleCancel("addNew")}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Import new students"
        maskClosable={true}
        visible={isModalVisible.import}
        width="30%"
        footer={null}
        style={{ padding: 0 }}
        getContainer={false}
        closable={true}
        onCancel={() =>
          setIsModalVisible((prev) => {
            return { ...prev, import: false };
          })
        }>
        <Upload
          maxCount={1}
          beforeUpload={(file) => {
            setFileList(file);
            return false;
          }}
          onRemove={() => setFileList([])}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0} loading={upLoading} style={{ marginTop: 16 }}>
          {upLoading ? "Uploading" : "Start Upload"}
        </Button>
        <Button type="primary" href={apiStore.downloadSampleFile} style={{ marginTop: 16, marginLeft: 10 }} icon={<DownloadOutlined />}>
          Download sample file
        </Button>
      </Modal>
    </div>
  );
};
