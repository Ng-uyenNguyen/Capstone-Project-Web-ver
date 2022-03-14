import React, { useState } from 'react'
import { Typography, Button, Table, Modal } from 'antd';
import { SpecDetail } from './SpecDetail.jsx'
import styles from './Style_Specs.module.scss'
import { AddSpecs } from './AddSpecs.jsx';
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
    return (
        <div className={styles.manage_spec}>
            <Title level={3}>Manage Specialization</Title>
            <div className={styles.divider} />
            <div className={styles.manage_spec__table}>
                <Button className={styles.add_new_spec_btn} onClick={showModal}>
                    + Specialization
                </Button>
                <div >
                    <Modal title={[
                        <div className={styles.modalTitle}>
                            <img src={require('../../assets/images/icon_addSpecs.png')} style={{ width: '30px' }}></img>
                            <Title level={4}>NEW SPECIALIZATION</Title>
                        </div>

                    ]} visible={isModalVisible} onCancel={handleCancel} footer={[
                        <Button className={styles.btn_done}>Done</Button>
                    ]}>
                        <AddSpecs />

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
