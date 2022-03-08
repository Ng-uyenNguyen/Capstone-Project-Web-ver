import { Table } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import "./CustomTable1.scss";
export const CustomTable1 = ({ dataSource, columns }) => {
  const [activeRow, setActiveRow] = useState(0);

  return (
    <div>
      <Table
        className="custom_table_1"
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              const rows = document.getElementsByClassName("ant-table-row");
              setActiveRow((prev) => {
                rows[[prev]].classList.remove("active");
                return rowIndex;
              });
              event.target.parentElement.classList.add("active");
            },
          };
        }}
      />
    </div>
  );
};
