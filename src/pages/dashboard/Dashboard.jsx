import React from "react";
import { CurrentClassTable } from "./current_classes_table/CurrentClassTable";
import "./dashboard_styles.scss";
import { PillButton } from "./PillButton";
export const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <h3 className="dashboard_title">Overview</h3>
      <div className="dashboard_content">
        <div className="dashboard_left">
          <div className="pill_container">
            <PillButton title="Student" amount={1500} img_scr={require("../../assets/images/icon_student.png")} />
            <PillButton title="Student" amount={1500} img_scr={require("../../assets/images/icon_teacher.png")} />
            <PillButton title="Student" amount={1500} img_scr={require("../../assets/images/icon_classes.png")} />
          </div>
          <div className="overview_chart dashboard-box-shadow"></div>
          <div className="table_class dashboard-box-shadow">
            <CurrentClassTable />
          </div>
        </div>
        <div className="dashboard_right">
          <h1>calendar</h1>
        </div>
      </div>
    </div>
  );
};
