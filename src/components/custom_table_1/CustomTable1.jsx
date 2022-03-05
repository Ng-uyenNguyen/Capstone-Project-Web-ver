import React from "react";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import "./CustomTable1.scss";
export const CustomTable1 = ({ dataSource, columns }) => {
  return (
    <div>
      <Table
        className="custom_table_1"
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              event.target.parentElement.style.backgroundColor = "#21bf73";
              event.target.parentElement.style.color = "white";
            }, // click row
          };
        }}
      />
    </div>
  );
};
