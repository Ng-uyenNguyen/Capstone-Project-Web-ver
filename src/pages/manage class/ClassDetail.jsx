import React from "react";
import { Tabs } from "antd";

export const ClassDetail = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Students" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Courses" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Attendance log" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};
