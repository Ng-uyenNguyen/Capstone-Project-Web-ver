import React, { useState } from 'react'
import { Typography, Button, Table, Modal, Form, Input, Select } from 'antd';
import { SpecDetail } from './SpecDetail.jsx'
import styles from './Style_Specs.module.scss'

export const ManageSpecs = () => {
    const { Title } = Typography;
    const dataSource = [
        {
            no: "01",
            nameCode: "IS",
            name: " Information and Communication Technology ",
            numClass: 40,
            numStudent: 800,
        },
        {
            no: "02",
            nameCode: "BA",
            name: "Business Administration",
            numClass: 40,
            numStudent: 800,
        },
        {
            no: "01",
            nameCode: "IS",
            name: " Information and Communication Technology ",
            numClass: 40,
            numStudent: 800,
        },
        {
            no: "02",
            nameCode: "BA",
            name: "Business Administration",
            numClass: 40,
            numStudent: 800,
        },
        {
            no: "01",
            nameCode: "IS",
            name: " Information and Communication Technology ",
            numClass: 40,
            numStudent: 800,
        },
        {
            no: "02",
            nameCode: "BA",
            name: "Business Administration",
            numClass: 40,
            numStudent: 800,
        },


    ];

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Name  Code",
            dataIndex: "nameCode",
            key: "nameCode",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "No.Classes",
            dataIndex: "numClass",
            key: "numClass",
        }
        ,
        {
            title: "No.Students",
            dataIndex: "numStudent",
            key: "numStudent",
        }

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
    const lsSubjects = ['SSC', 'PRF', 'ACC', 'ITA', 'ITE'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = lsSubjects.filter(o => !selectedItems.includes(o));
    const handleSelectChange = selectedItems => {
        setSelectedItems(selectedItems);
    }
    return (
        <div className={styles.manage_spec}>
            <Title level={3}>Manage Specialization</Title>
            <div className={styles.divider} />
            <div className={styles.manage_spec__table}>
                <Button className={styles.add_new_spec_btn} onClick={showModal}>
                    + Specialization
                </Button>
                <div >
                    <Modal className="addNew_subject_modal" visible={isModalVisible} onCancel={handleCancel} footer={[
                        <Button htmlType="submit" className={styles.btn_done}>Done</Button>
                    ]}>
                        <div className="modal_content">
                            <div className={styles.modalTitle}>
                                <img src={require("../../assets/images/icon_addSpecs.png")} style={{ width: "30px" }} ></img>
                                <Title level={4}>NEW SPECIALIZATION</Title>
                            </div>
                            {/* ==== Form Input ===== */}
                            <Form layout="vertical">
                                <Form.Item label="Subject Name" name="name" rules={[{ required: true, message: 'Please enter subject name!' }]}>
                                    <div className="input_field">
                                        <img src={require("../../assets/images/icon_subject02.png")} alt="icon_subject" />
                                        <Input placeholder="Data Warehouse" bordered={false} required={true} />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Subject Code" name="lname">
                                    <div className="input_field">
                                        <img src={require("../../assets/images/icon_subjectCode.png")} alt="icon_subject" />
                                        <Select
                                            mode="multiple"
                                            placeholder="Select Subjects"
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
                <Table className="custom_table_1" dataSource={dataSource} columns={columns}
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
                    }} />

            </div>
            <SpecDetail loading={loading} />
        </div>
    )
}
