import { CheckCircleFilled, EditOutlined } from "@ant-design/icons";
import { Button, Image, Progress, Select, Space } from "antd";
import React, { useState } from "react";
import styles from "./CourseListDetail.module.scss";
export const CourseListDetail = ({ loading }) => {
  const { Option } = Select;
  const [isDisable, setIsDisable] = useState(true);
  const handleEditLecture = (e) => {
    setIsDisable(false);
  };
  const handleFinishEdit = (e) => {
    setIsDisable(true);
  };
  return !loading ? (
    <div className={styles.class_course_detail_loading}>
      <Image src={require("../../assets/images/loading_sidebar.png")} alt="logo" preview={false} width={200} height={200} />
    </div>
  ) : (
    <div className={styles.class_course_detail}>
      <div className={styles.course_box}>
        <div className={styles.course_info}>
          <Image src={require("../../assets/images/Books.png")} preview={false} width={80} height={80} />
          <div className={styles.course_name}>
            <h3>Object-Oriented Programming</h3>
            <h4>PRO192</h4>
          </div>
        </div>
        <Space direction="vertical" className={styles.course_detail} size="small">
          <table>
            <tr>
              <td>
                <b>Lecturer: </b>
              </td>
              <td>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                  defaultValue="1"
                  disabled={isDisable}>
                  <Option value="1">TranLQ</Option>
                  <Option value="2">AnhNN</Option>
                  <Option value="3">HoangVD</Option>
                </Select>
                {isDisable ? (
                  <Button icon={<EditOutlined />} style={{ border: "none", boxShadow: "none", backgroundColor: "transparent" }} onClick={handleEditLecture}></Button>
                ) : (
                  <Button icon={<CheckCircleFilled />} style={{ border: "none", boxShadow: "none", backgroundColor: "transparent" }} onClick={handleFinishEdit}></Button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>Start date: </b>
              </td>
              <td> 20/02/2022</td>
            </tr>
            <tr>
              <td>
                <b>End date: </b>
              </td>
              <td>20/03/2022</td>
            </tr>
            <tr>
              <td>
                <b>Duration: </b>
              </td>
              <td>10 weeks</td>
            </tr>
            <tr>
              <td>
                <b>Progress: </b>
              </td>
              <td>
                <Progress percent={20} status="normal" />
              </td>
            </tr>
          </table>
        </Space>
      </div>
    </div>
  );
};
