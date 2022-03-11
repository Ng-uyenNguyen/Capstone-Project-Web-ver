import { Button, Table, Typography } from "antd";
import React from "react";
import styles from "./ClassTimeTable.module.scss";
import { Link } from "react-router-dom";
export const ClassTimeTable = () => {
  const { Title } = Typography;
  return (
    <div className={styles.class_timetable}>
      <Title level={3}>
        <b>Time table of SE1402</b>
      </Title>
    </div>
  );
};
