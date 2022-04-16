import { Button, Image, Modal, Table, Typography, Form, Input, InputNumber, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./ManageClass.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiStore } from "../../constant/apiStore";
import { SearchOutlined } from "@ant-design/icons";
export const ManageClass = () => {
  const { Option } = Select;
  const { Title } = Typography;
  const [dataSource, setDatasource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  const onFinish = (values) => {
    const data = {
      khoa: values.khoa,
      specId: values.specialization,
      size: values.quantity,
      semester: 1,
    };
    const addNewClasses = async () => {
      const res = await axios.post(apiStore.addNewClass, data);
      if (res.status === 200) {
        message.success("Add successfully!");
        form.resetFields();
        setIsModalVisible(false);
      } else {
        console.log(res);
        message.success("Add failed!");
      }
    };
    addNewClasses();
  };
  const showModal = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  let navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate("classDetail", { state: { classInfo: { ...item } } });
  };

  // ---------- Fetch classes data --------------
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(apiStore.getAllClass);
      const data = await res.data;
      console.log(data);
      const mappedData = data.map((item, index) => ({
        key: index,
        khoa: "K" + item.classId.slice(2, 4),
        classID: item.classId,
        specilization: item.specialization,
        totalStudent: item.students.length,
        detail: (
          <Button type="link" onClick={() => handleNavigate({ item })}>
            Detail
          </Button>
        ),
      }));
      setLoading(false);
      setDatasource(mappedData);
    };
    fetchData();
  }, [isModalVisible]);

  // ---------- Fetch specialization data --------------
  useEffect(() => {
    const fetchStudentData = async () => {
      const res = await axios.get(apiStore.getAllSpecializations);
      const data = res.data;
      setSpecializations(data);
    };
    fetchStudentData();
  }, []);

  const columns = [
    {
      title: <b>Academic Year</b>,
      dataIndex: "khoa",
      key: "khoa",
      align: "left",
      filters: [
        {
          text: "K14",
          value: "K14",
        },
        {
          text: "K15",
          value: "K15",
        },
        {
          text: "K16",
          value: "K16",
        },
        {
          text: "K17",
          value: "K17",
        },
      ],
      onFilter: (value, record) => record.khoa.indexOf(value) === 0,
    },
    {
      title: <b>Class ID</b>,
      dataIndex: "classID",
      key: "classID",
      align: "left",
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
      onFilter: (value, record) => record.classID.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: <b>Specilization</b>,
      dataIndex: "specilization",
      key: "specilization",
    },
    {
      title: <b>Total Student</b>,
      dataIndex: "totalStudent",
      key: "totalStudent",
      align: "center",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];

  return (
    <div className={styles.class_management}>
      <Title level={3}>Manage Class</Title>
      <div className={styles.year_course}>
        <div className={styles.divider}>
          <div className={styles.center_divider} />
          <Button type="primary" className={styles.add_button} onClick={showModal}>
            + New Class
          </Button>
        </div>
        <Table loading={loading} className="custom_table_1" dataSource={dataSource} columns={columns} />

        {/* ============= Add new class modal ===========*/}

        <Modal title="" maskClosable={false} visible={isModalVisible} width="32%" className="add_newClass_modal" footer={null} closable={false} style={{ padding: 0 }}>
          <div className="header">
            <Image src={require("../../assets/images/google_classroom.png")} preview={false} />
            <h2>Add new class</h2>
          </div>
          <div className="divider" />
          {/* ============= Input form =============== */}
          <Form name="add_class_form" labelCol={{ span: 10 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" form={form}>
            <div className="input_wrapper">
              <Form.Item label="Academic Year" name="khoa" initialValue={14}>
                <Select>
                  <Option value={14}>K14</Option>
                  <Option value={15}>K15</Option>
                  <Option value={16}>K16</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Specialization" name="specialization">
                <Select>
                  {specializations.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]} initialValue={1}>
                <InputNumber min={1} max={10} />
              </Form.Item>
            </div>
            <div className="divider" />
            <Form.Item className="buttons_wrapper">
              <Button type="primary" onClick={handleCancel} className="cancel_btn">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="submit_btn">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
