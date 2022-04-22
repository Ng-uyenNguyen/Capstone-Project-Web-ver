import { SearchOutlined } from "@mui/icons-material";
import { Button, Form, Input, message, Modal, Select, Table, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { apiStore } from "../../constant/apiStore";
import styles from "./StyleSubject.module.scss";
import { SubjectDetail } from "./SubjectDetail";
export const ManageSubject = () => {
  const { Title } = Typography;
  const [listSubjects, setListSub] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [lsTeacher, setlsTeachers] = useState([]);
  const [lsSubDetail, setSubDetai] = useState([]);
  const [info, setInfo] = useState({});
  const [reRender, setReRender] = useState("");
  const [updateSelected, setUpdateSelected] = useState([]);
  const [formUpdate] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadTable, setLoadTable] = useState(true);
  const [loadDetail, setLoadDetail] = useState(false);

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
  const handleUpdateSelected = (selectedItems) => {
    setUpdateSelected(selectedItems);
  };
  //========== GET LIST SUBJECTS AND STUDENTS
  useEffect(() => {
    setLoadTable(true);
    async function getSubjects() {
      const res = await fetch(apiStore.getSubjects);
      const data = await res.json();
      const mappedData = data.map((item, index) => ({
        key: index + 1,
        name: item.name,
        code: item.subjectCode,
        lsSpec: item.specializations,
        id: item.id,
      }));
      setDataSource([...mappedData]);
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
  // Get Subject Detail

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };
  let prevID = usePrevious(info.id);

  //=========== Get Subject Detail
  useEffect(() => {
    if (typeof info.id != undefined) {
      async function getSubjectDetail() {
        const res = await fetch(apiStore.getSubjectByID + info.id);
        const data = await res.json();
        setSubDetai(data);
        setUpdateSelected(data.teachers.map((teacher) => teacher.accountId));
        setLoadDetail(false);
      }
      setTimeout(getSubjectDetail, 1000);
    }
    if (prevID !== info.id) {
      setLoadDetail(true);
    }
  }, [info.id]);

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "",

      key: "id",
    },
    {
      title: "Name  Code",
      dataIndex: "code",
      key: "code",
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
      onFilter: (value, record) => record.code.toLowerCase().includes(value.toLowerCase()),
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
      dataIndex: "lsSpec",
      key: "lsSpec",
      render: (lsSpec) => (
        <>
          {lsSpec?.map((item, i) => {
            return (
              <Tag key={i} className={styles.subject_tag}>
                {item.toUpperCase()}
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
      teacherIds: updateSelected,
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
          setLoading(false);
          setReRender("update" + updateSelected);
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
                    <Select mode="multiple" placeholder="Select lectures" value={selectedItems} onChange={handleSelectChange} style={{ width: "100%" }} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                    <Select mode="multiple" placeholder="Select lectures" value={updateSelected} onChange={handleUpdateSelected} style={{ width: "100%" }} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                setInfo({ ...record });
                setLoading(true);
                let selected = listSubjects.find((item) => item.id === record.id);
                setInfo({ ...selected });
              },
            };
          }}
        />
      </div>
      <SubjectDetail loading={loading} info={info} showModal={showModal} lsSubDetail={lsSubDetail} loadDetail={loadDetail} />
    </div>
  );
};
