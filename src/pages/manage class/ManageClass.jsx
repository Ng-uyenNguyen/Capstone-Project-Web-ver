import { Button, Table, Typography } from "antd";
import React from "react";
import "./ManageClass.scss";
import "../../components/custom_table_1/CustomTable1.scss";
import { Link } from "react-router-dom";
export const ManageClass = () => {
  const { Title } = Typography;
  const dataSource = [
    {
      key: "1",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Link to="/classDetail">Detail</Link>,
    },
    {
      key: "2",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "3",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "4",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "5",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
    {
      key: "6",
      classID: "SE1401",
      specilization: "Software Engineering",
      totalStudent: 30,
      timeTable: <Button type="link">View</Button>,
      detail: <Button type="link">Detail</Button>,
    },
  ];

  const columns = [
    {
      title: <b>Class ID</b>,
      dataIndex: "classID",
      key: "classID",
      align: "left",
    },
    {
      title: <b>Specilization</b>,
      dataIndex: "specilization",
      key: "specilization",
    },
    {
      title: <b>Total Student</b>,
      dataIndex: "totalStudent",
      key: "totalStudent",
      align: "center",
    },
    {
      title: <b>Time table</b>,
      dataIndex: "timeTable",
      key: "timeTable",
      align: "center",
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      align: "center",
    },
  ];
  return (
    <div className="class_management">
      <Title level={3}>Manage Class</Title>
      <div className="year-course">
        <div className="year-course__divider">
          <Title level={4}>K14</Title>
          <div className="center-divider" />
          <Button type="primary" className="add-button">
            + New Class
          </Button>
        </div>
        <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
      </div>
      <div className="year-course">
        <div className="year-course__divider">
          <Title level={4}>K15</Title>
          <div className="center-divider" />
          <Button type="primary" className="add-button">
            + New Class
          </Button>
        </div>
        <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
      </div>
      <div className="year-course">
        <div className="year-course__divider">
          <Title level={4}>K16</Title>
          <div className="center-divider" />
          <Button type="primary" className="add-button">
            + New Class
          </Button>
        </div>
        <Table className="custom_table_1" dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};
