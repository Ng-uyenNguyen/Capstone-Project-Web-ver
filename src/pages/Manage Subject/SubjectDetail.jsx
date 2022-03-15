import React, { useState } from 'react'
import { Image, Tag, Button, AutoComplete, Modal, Divider, Input, Typography } from "antd";
import styles from './StyleSubject.module.scss'

import { ModalSubject } from './ModalSubject';
export const SubjectDetail = ({ loading }) => {
  const { Title } = Typography;
  // modal 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  return !loading ? (
    <div className={styles.subject_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.subject_detail}>
      <div className={styles.subject_banner}>
        <div className={styles.subject_info}>
          <Image src={require('../../assets/images/icon_subject.png')} alt='icon_subject' width={56} height={53}></Image>
          <div>
            <h4>
              Accounting Principles
            </h4>
            <p>ACC101</p>
          </div>
        </div>
      </div>
      {/* Subject Info detail*/}
      <div className={styles.teaching_teachers}>
        <div className={styles.heading_title}>
          <h4><b>Teaching teachers</b></h4>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.teaching_teachers__info}>
          <ul>
            <li>Jerome Bel</li>
            <li>Jerome Bell</li>
            <li>Jerome Bell</li>
          </ul>
        </div>
      </div>
      <div className={styles.studying_classes}>
        <div className={styles.heading_title}>
          <h4><b>Studying classes</b></h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>
          <Tag className={styles.subject_detail__subject_tag}>SE1401</Tag>

        </div>
      </div>
      <div className={styles.specs}>
        <div className={styles.heading_title}>
          <h4><b>Specializations</b></h4>
          <div className={styles.divider}></div>
        </div>
        <div>
          <Tag className={styles.subject_detail__subject_tag}>IS</Tag>
          <Tag className={styles.subject_detail__subject_tag}>JS</Tag>
        </div>
      </div>
      {/* ======= button  */}
      <div className={styles.btn_field}>
        <Button className={styles.btn_remove}>REMOVE</Button>
        <Button className={styles.btn_update} onClick={showModal}>UPDATE</Button>
      </div>
      <div className={styles.modalStyle}>
        <Modal title={[
          <div className={styles.modalTitle}>
            <img src={require('../../assets/images/icon_addSubject.png')} style={{ width: '30px' }}></img>
            <Title level={4}>UPDATE SUBJECT</Title>
          </div>

        ]} visible={isModalVisible} onCancel={handleCancel} footer={[
          <Button className={styles.btn_done}>Done</Button>
        ]}>
          <ModalSubject />

        </Modal>
      </div>
    </div>

  );



}
