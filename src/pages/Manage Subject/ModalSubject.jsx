import React from 'react'
import {  Input, Divider, AutoComplete } from 'antd';
import styles from './StyleSubject.module.scss'
export const ModalSubject = () => {
    const options = [
        { value: 'Nguyen Van A' },
        { value: 'Le Van A' },
        { value: 'Dao Van A' },
      ];
  return (
    <div>
    <div className={styles.AddSubject}>
      <p>Subject Name</p>
      <div className={styles.input_field}>
        <img src={require('../../assets/images/icon_subject02.png')} alt="icon_subject" />
        <Input placeholder="Data Warehouse" bordered={false} required={true} />
      </div>
      <Divider className={styles.AddSubject__divider} />

      <p>Subject Code</p>
      <div className={styles.input_field}>
        <img src={require('../../assets/images/icon_subjectCode.png')} alt="icon_subjectCode" />
        <Input placeholder="DBW101" bordered={false} required={true} />

      </div>
      <Divider className={styles.AddSubject__divider} />


      <p>Subject Name</p>
      <div className={styles.input_field}>
        <img src={require('../../assets/images/icon_teacher02.png')} alt="icon_teacher" />
        <AutoComplete
          style={{ width: 500}}
          options={options}
          placeholder="Lecture Name"
          bordered={false}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
      <Divider className={styles.AddSubject__divider} />

    </div>
  </div>
  )
}
