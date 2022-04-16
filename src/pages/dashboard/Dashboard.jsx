import React, { useEffect, useState } from "react";
import { CurrentClassTable } from "./current_classes_table/CurrentClassTable";
import "./dashboard_styles.scss";
import { PillButton } from "./PillButton";
import { RightNav } from "./rightnav/RightNav";
import axios from "axios";
import { apiStore } from "../../constant/apiStore";
export const Dashboard = () => {
  const [totalInfo, setTotalInfo] = useState({});
  useEffect(async () => {
    const res = await axios.get(apiStore.getTotalInfo);
    const data = await res.data;
    console.log(data);
    setTotalInfo({ ...data });
  }, []);

  return (
    <div className="dashboard_container">
      <h3 className="dashboard_title">Overview</h3>
      <div className="dashboard_content">
        <div className="dashboard_left">
          <div className="pill_container">
            <PillButton title="Students" amount={totalInfo.studentCount} img_scr={require("../../assets/images/icon_student.png")} />
            <PillButton title="Teachers" amount={totalInfo.teacherCount} img_scr={require("../../assets/images/icon_teacher.png")} />
            <PillButton title="Classes" amount={totalInfo.classCount} img_scr={require("../../assets/images/icon_classes.png")} />
          </div>
          {/* <div className="overview_chart dashboard-box-shadow">
            <Chart />
          </div> */}
          <div className="table_class dashboard-box-shadow">
            <CurrentClassTable />
          </div>
        </div>
        <RightNav />
      </div>
    </div>
  );
};
