import React from "react";
import { CurrentClassTable } from "./current_classes_table/CurrentClassTable";
import "./dashboard_styles.scss";
import { PillButton } from "./PillButton";
import { RightNav } from "./rightnav/RightNav";
import { Chart } from "./chart/Chart";
export const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <h3 className="dashboard_title">Overview</h3>
      <div className="dashboard_content">
        <div className="dashboard_left">
          <div className="pill_container">
            <PillButton
              title="Students"
              amount={1500}
              img_scr={require("../../assets/images/icon_student.png")}
            />
            <PillButton
              title="Teachers"
              amount={1500}
              img_scr={require("../../assets/images/icon_teacher.png")}
            />
            <PillButton
              title="Classes"
              amount={1500}
              img_scr={require("../../assets/images/icon_classes.png")}
            />
          </div>
          <div className="overview_chart dashboard-box-shadow">
            <Chart />
          </div>
          <div className="table_class dashboard-box-shadow">
            <CurrentClassTable />
          </div>
        </div>
        <RightNav />
      </div>
    </div>
  );
};
