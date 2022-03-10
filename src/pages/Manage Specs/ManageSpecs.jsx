import React, { useState } from 'react'
import { Typography, Button, Table } from 'antd';
import {SpecDetail} from './SpecDetail.jsx'
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
    return (
        <div className={styles.manage_spec}>
            <Title level={3}>Manage Specialization</Title>
            <div className={styles.divider} />
            <div className={styles.manage_spec__table}>
                <Button type="primary" className={styles.add_new_spec_btn}>
                    + Specialization
                </Button>
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
            <SpecDetail loading={loading}/>
        </div>
    )
}
