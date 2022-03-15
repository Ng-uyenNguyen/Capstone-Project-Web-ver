import React from 'react'
import { Input, Divider, AutoComplete } from 'antd';
import styles from './Style_Modal.module.scss'


export const AddSpecs = () => {
  
    return (
        <div>
            <div className={styles.AddSpecs}>
                <p>Specialization Name</p>
                <div className={styles.input_field}>
                    <img src={require('../../assets/images/icon_subject02.png')} alt="icon_subject" />
                    <Input placeholder="Data Warehouse" bordered={false} required={true} />
                </div>
                <Divider className={styles.AddSpecs__divider} />

                <p>Specialization Code</p>
                <div className={styles.input_field}>
                    <img src={require('../../assets/images/icon_subjectCode.png')} alt="icon_subjectCode" />
                    <Input placeholder="DBW101" bordered={false} required={true} />

                </div>
                <Divider className={styles.AddSpecs__divider} />
                <p>Description</p>
                <div className={styles.input_field}>
                    <img src={require('../../assets/images/icon_desc.png')} alt="icon_teacher" />
                    <Input placeholder="About Specialization" bordered={false} required={true} />
                </div>
                <Divider className={styles.AddSpecs__divider} />

            </div>
        </div>
    )
}
