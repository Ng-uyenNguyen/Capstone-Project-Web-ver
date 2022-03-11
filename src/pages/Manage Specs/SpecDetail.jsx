import React from 'react'
import { Image, Button, Typography, Divider } from "antd";
import styles from './Style_Specs.module.scss'


export const SpecDetail = ({ loading }) => {
  const { Title } = Typography;
  return !loading ? (
    <div className={styles.spec_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.spec_detail}>
      <Title level={5}> Information and Communication Technology </Title>
      <p className={styles.spec_detail__spec}>IS</p>
      <div className={styles.btn_field}>
        <Button className={styles.btn_remove}>Remove</Button>
        <Button className={styles.btn_update}>Update</Button>
      </div>
      <Divider className={styles.spec_detail__divider} />
      <div className={styles.info}>
        <div className={styles.info__item}>
          <p className={styles.info__item__title}>No.Classes</p>
          <p>40</p>
        </div>
        <div className={styles.info__item}>
          <p className={styles.info__item__title}>No.Students</p>
          <p>800</p>
        </div>
        <div className={styles.info__item}>
          <p className={styles.info__item__title}>Description </p>
          <p>Lorem ipsum dolor sit amet </p>
        </div>

      </div>
      <div>
        <Semester_Box />
      </div>
    </div>
  );
}
const Semester_Box = () => {
  return (
    <div >
      {/* ========= Semester list item */}
      <div className={styles.sem_detail}>
        <div className={styles.custom_box}>
          <Divider className={styles.custom_box__divider}></Divider>
          <div className={styles.box}>
            <h2>Semester 01</h2>
          </div>
        </div>
        <div className={styles.subject_list}>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>

        </div>
      </div>
      {/* ====== */}
      <div className={styles.sem_detail}>
        <div className={styles.custom_box}>
          <Divider className={styles.custom_box__divider}></Divider>
          <div className={styles.box}>
            <h2>Semester 01</h2>
          </div>
        </div>
        <div className={styles.subject_list}>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>

        </div>
      </div>
      <div className={styles.sem_detail}>
        <div className={styles.custom_box}>
          <Divider className={styles.custom_box__divider}></Divider>
          <div className={styles.box}>
            <h2>Semester 01</h2>
          </div>
        </div>
        <div className={styles.subject_list}>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>
          <div className={styles.subject_list__subject_items}>
            <div className={styles.subject_tag}>SSG01</div>
            <Divider className={styles.subject_tag__divider}></Divider>
            <p>Working in group</p>
          </div>

        </div>
      </div>
    </div>


  );
}