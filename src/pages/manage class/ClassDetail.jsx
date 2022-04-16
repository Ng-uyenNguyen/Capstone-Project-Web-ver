import React, { useEffect, useState } from "react";
import { Spin, Tabs, Typography } from "antd";
import styles from "./ClassDetail.module.scss";
import { StudentList } from "./class detail/StudentList";
import { CourseList } from "./class detail/CourseList";
import { AttendanceLog } from "./class detail/AttendanceLog";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { apiStore } from "../../constant/apiStore";
export const ClassDetail = () => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  const location = useLocation();
  const { item } = location.state.classInfo;
  const [reRender, setReRender] = useState("");
  const [classData, setClassData] = useState({});
  useEffect(() => {
    const myAbortController = new AbortController();
    const fetchClassData = async () => {
      const res = await axios.get(apiStore.getClassById + item.classId);
      const data = await res.data;
      console.log(data);
      setClassData({ ...data });
    };
    fetchClassData();
    return () => {
      myAbortController.abort();
    };
  }, [reRender]);

  return (
    <div className={styles.class_detail}>
      <Title level={3}>{item.classId} Class Detail</Title>
      {Object.keys(classData).length !== 0 ? (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Students" key="1">
            <StudentList item={classData} setReRender={setReRender} />
          </TabPane>
          <TabPane tab="Courses" key="2">
            <CourseList item={classData} setReRender={setReRender} />
          </TabPane>
          <TabPane tab="Attendance log" key="3">
            <AttendanceLog item={classData} />
          </TabPane>
        </Tabs>
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};
