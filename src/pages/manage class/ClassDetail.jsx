import React from "react";
import { Tabs, Typography } from "antd";
import styles from "./ClassDetail.module.scss";
import { StudentList } from "./class detail/StudentList";
import { CourseList } from "./class detail/CourseList";
import { AttendanceLog } from "./class detail/AttendanceLog";
export const ClassDetail = () => {
  const { TabPane } = Tabs;
  const { Title } = Typography;
  return (
    <div className={styles.class_detail}>
      <Title level={3}>Class Detail</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Students" key="1">
          <StudentList />
        </TabPane>
        <TabPane tab="Courses" key="2">
          <CourseList />
        </TabPane>
        <TabPane tab="Attendance log" key="3">
          <AttendanceLog />
        </TabPane>
      </Tabs>
    </div>
  );
};
