import React, { useState } from 'react';
import "antd/dist/antd.css";
import './modal_styles.scss';
import { Modal, Button } from 'antd';

export const SuccessModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
      <Modal className='customModal' visible={isModalVisible} centered footer={null} header>
        <div className='icon_container'>
            <img src={require("../../assets/images/success.png")} alt="success"/>
        </div>
        <p>Update successfully.</p>
        <Button className='btn_success' onClick={handleOk}>OK</Button>
      </Modal>
  );
};
