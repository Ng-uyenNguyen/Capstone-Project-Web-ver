import React, { useState } from "react";
import { Tag, Typography, Button, Table, Modal, Input, Divider, AutoComplete } from 'antd';
import { SubjectDetail } from './SubjectDetail'

import styles from './StyleSubject.module.scss'
import Title from "antd/lib/skeleton/Title";
import { ModalSubject } from "./ModalSubject";
export const ManageSubject = () => {
  const { Title } = Typography;
  const dataSource = [
    {
      no: "01",
      nameCode: "DBW301",
      name: "Data Warehouse",
      specializations: ['IS ', 'JS'],
    },
    {
      no: "02",
      nameCode: "WEB201c",
      name: "Web Design",
      specializations: ['IS'],
    },
    {
      no: "03",
      nameCode: "ACC101",
      name: "Accounting Principles",
      specializations: ['IS ', 'BA'],
    },
    {
      no: "01",
      nameCode: "DBW301",
      name: "Data Warehouse",
      specializations: ['IS ', 'JS'],
    },
    {
      no: "02",
      nameCode: "WEB201c",
      name: "Web Design",
      specializations: ['IS'],
    },
    {
      no: "03",
      nameCode: "ACC101",
      name: "Accounting Principles",
      specializations: ['IS ', 'BA'],
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
      title: "Specialization",
      dataIndex: "specializations",
      key: "specializations",
      render: specializations => (
        <>
          {specializations.map(specialization => {
            return (
              <Tag key={specialization} className={styles.subject_tag}>{specialization.toUpperCase()}</Tag>
            );
          })}
        </>
      ),
    },
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
    <div className={styles.manage_subject} >
      <Title level={3}><b>Manage Subject</b></Title>
      <div className={styles.divider} />

      <div className={styles.manage_subject__table}>
        <Button type="primary" className={styles.add_new_subject_btn} onClick={showModal} >
          + New Subject
        </Button>
        <div >
          <Modal title={[
            <div className={styles.modalTitle}>
              <img src={require('../../assets/images/icon_addSubject.png')} style={{ width: '30px' }}></img>
              <Title level={4}>NEW SUBJECT</Title>
            </div>

          ]} visible={isModalVisible} onCancel={handleCancel} footer={[
            <Button className={styles.btn_done}>Done</Button>
          ]}>
           <ModalSubject />

          </Modal>
        </div>

        {/* Table Data */}
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
      <SubjectDetail loading={loading} />
    </div>
  )
};


