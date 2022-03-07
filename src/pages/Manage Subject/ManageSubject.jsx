import React from "react";
import { Tag, Typography } from 'antd';
import { CustomTable1 } from "../../components/custom_table_1/CustomTable1";
import { SubjectDetail } from './SubjectDetail'
import './StyleSubject.scss'
export const ManageSubject = () => {
  const { Title } = Typography;
  const dataSource = [
    {
      no: "01",
      nameCode: "DBW301",
      name: "Data Warehouse",
      specializations: ['IS ', 'JS'],
    },
    {
      no: "02",
      nameCode: "WEB201c",
      name: "Web Design",
      specializations: ['IS'],
    },
    {
      no: "03",
      nameCode: "ACC101",
      name: "Accounting Principles",
      specializations: ['IS ', 'BA'],
    },
    {
      no: "01",
      nameCode: "DBW301",
      name: "Data Warehouse",
      specializations: ['IS ', 'JS'],
    },
    {
      no: "02",
      nameCode: "WEB201c",
      name: "Web Design",
      specializations: ['IS'],
    },
    {
      no: "03",
      nameCode: "ACC101",
      name: "Accounting Principles",
      specializations: ['IS ', 'BA'],
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name  Code",
      dataIndex: "nameCode",
      key: "nameCode",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specializations",
      key: "specializations",
      render: specializations => (
        <>
          {specializations.map(specialization => {
            return (
              <Tag key={specialization} className='subject-tag'>{specialization.toUpperCase()}</Tag>
            );
          })}
        </>
      ),
    },
  ];
  return (
    <div>
      <Title title={3}>Manage Subject</Title>
      <div className='manage-subject'>
        <CustomTable1 dataSource={dataSource} columns={columns} />
        <SubjectDetail />
      </div>
    </div>
  )
};
