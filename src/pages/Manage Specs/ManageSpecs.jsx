import React, { useState, useEffect } from "react";
import { Typography, Button, Table, Modal, Form, Input, Select, message } from "antd";
import { SpecDetail } from "./SpecDetail.jsx";
import styles from "./Style_Specs.module.scss";
import { apiStore } from "../../constant/apiStore";
import { SearchOutlined } from "@mui/icons-material";
import { CompassOutlined } from "@ant-design/icons";
export const ManageSpecs = () => {
  const { Title } = Typography;
  const [listSpecs, setListSpecs] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  // List subjects of system
  const [listSubjects, setListSub] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  // Subjects of Specs

  const [info, setInfo] = useState({});
  const [reRender, setReRender] = useState("");
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formUpdate] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [loadTable, setLoadTable] = useState(true);

  // modal
  const [isModalVisible, setIsModalVisible] = useState({
    addNew: false,
    update: false,
  });
  const handleCancel = () => {
    formAdd.resetFields();
    formUpdate.resetFields();
    setIsModalVisible(false);
  };
  const showModal = (method) => {
    setIsModalVisible((prev) => {
      return { ...prev, [method]: true };
    });
  };
  //================ API GET SPECS, SUBJECTS ============
  useEffect(() => {
    setLoadTable(true);
    async function getSpecs() {
      const res = await fetch(apiStore.getSpecs);
      const data = await res.json();
      const mappedData = data.map((item, index) => ({
        key: index + 1,
        code: getCode(item.name),
        name: item.name,
        noClass: item.classes.length,
        id: item.specId,
      }));
      setDataSource([...mappedData]);
      setListSpecs(data);
      setLoadTable(false);
    }
    getSpecs();
  }, [reRender]);

  useEffect(() => {
    async function getSubjects() {
      const res = await fetch(apiStore.getSubjects);
      const data = await res.json();
      setListSub(data);
    }
    getSubjects();
  }, []);
  // API GET LIST SUBJECTS OF SPECS
  // useEffect(() => {
  //     async function getSub() {
  //         const res = await fetch(apiStore.getSpecById + info.specId);
  //         const data = await res.json();
  //         setLsSubject(data)
  //     }
  //     setTimeout(getSub, 1000);
  // }, [specID]);
  // Select Input
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateSelected, setUpdateSelected] = useState([]);
  const filteredOptions = listSubjects.filter((o) => !selectedItems.includes(o));
  const handleSelectChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
  const handleUpdateSelected = (selectedItems) => {
    setUpdateSelected(selectedItems);
  };

  function getCode(str) {
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join("");
    return acronym;
  }
  //======================================  ADD NEW SPECS ======================
  const addNewSpecs = (fieldsValue) => {
    // form.resetFields();
    const values = {
      ...fieldsValue,
      subjectId: selectedItems,
    };
    fetch(apiStore.getSpecs, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          message.success("Add new specialization successfully!");
          setReRender("add new");
        } else {
          message.error("Add specialization failed!");
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
  //====================== UPDATE SPECS ========================
  const updateSpecs = () => {
    setUpdateLoading(true);
    const values = {
      specId: info.specId,
      name: info.name,
      subjectId: updateSelected,
    };
    fetch(apiStore.getSpecs, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          message.success("Update specialization successfully");
          setIsModalVisible((prev) => {
            return { ...prev, update: false };
          });
          setLoading(false);
          setUpdateLoading(false);
          setReRender("update" + updateSelected);
        } else {
          message.error("Update specialization Failed!");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    formUpdate.resetFields();
  };
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
      title: "No.Classes",
      dataIndex: "noClass",
      key: "noClass",
    },
  ];

  return (
    <div className={styles.manage_spec}>
      <Title level={3}>Manage Specializations</Title>
      <div className={styles.divider} />
      <div className={styles.manage_spec__table}>
        <Button
          className={styles.add_new_spec_btn}
          onClick={() => {
            showModal("addNew");
          }}>
          + Specialization
        </Button>
        <div>
          <Modal className="addNew_subject_modal" visible={isModalVisible.addNew} onCancel={handleCancel} footer={null} closable={false} maskClosable={false}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSpecs.png")} style={{ width: "30px" }}></img>
                <Title level={4}>NEW SPECIALIZATION</Title>
              </div>
              {/* ==== FORM ADD SPECS  ===== */}
              <Form form={formAdd} layout="vertical" onFinish={addNewSpecs} style={{ height: "280px" }}>
                <Form.Item
                  label="Specialization Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter subject name!" },
                    { pattern: "^[a-zA-Zd]+(?: [A-Za-zd]{2,})*$", message: "Invalid name" },
                  ]}>
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_subject02.png")} alt="icon_subject" />
                    <Input bordered={false} required={true} />
                  </div>
                </Form.Item>
                <Form.Item label="Subject Code" name="subjectId">
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subject" />
                    <Select mode="multiple" placeholder="Select Subjects" value={selectedItems} onChange={handleSelectChange} style={{ width: "100%" }} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {filteredOptions.map((item, i) => (
                        <Select.Option key={i} value={item.id}>
                          {item.subjectCode}
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

        {/* ================== Update Specs Modal  ======================*/}
        <div>
          <Modal getContainer={false} forceRender className="addNew_subject_modal" visible={isModalVisible.update} onCancel={handleCancel} footer={null} closable={false} maskClosable={false}>
            <div className="modal_content">
              <div className={styles.modalTitle}>
                <img src={require("../../assets/images/icon_addSpecs.png")} style={{ width: "30px" }}></img>
                <Title level={4}>UPDATE SPECIALIZATION</Title>
              </div>
              {/* ==== UPDATE SPECS FORM  ===== */}
              <Form form={formUpdate} layout="vertical" onFinish={updateSpecs} style={{ height: "200px" }}>
                <p style={{ marginTop: "25px", textAlign: "center", color: "#21BF73", fontSize: "large" }}>{info.name}</p>
                <Form.Item label="Subject Code" name="subjectId">
                  <div className="input_field">
                    <img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subject" />
                    <Select mode="multiple" placeholder="Select Subjects" value={updateSelected} onChange={handleUpdateSelected} style={{ width: "100%" }} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {filteredOptions.map((item, i) => (
                        <Select.Option key={i} value={item.id}>
                          {item.subjectCode}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                </Form.Item>
                <Form.Item style={{ float: "right" }}>
                  <Button className={styles.btn_cancel} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button htmlType="submit" className={styles.btn_done} loading={updateLoading}>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
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
                const data = listSpecs.find((item) => item.specId === record.id);
                setInfo(data);
                setLoading(true);
                let selectedSubjects = listSubjects.filter((item) => data.subjects.includes(item.subjectCode));
                setUpdateSelected(selectedSubjects.map((i) => i.id));
              },
            };
          }}
        />
      </div>
      <SpecDetail loading={loading} info={info} showModal={showModal} getCode={getCode} />
    </div>
  );
};
