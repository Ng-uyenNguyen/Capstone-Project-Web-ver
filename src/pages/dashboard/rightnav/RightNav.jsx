import React from "react";
import { CalendarComponent } from "./calendar/CalendarComponent";
import { RecentOnline } from "./recent_online/RecentOnline";
import "./rightnav_styles.scss";
export const RightNav = () => {
  return (
    <div className="right-nav">
      <CalendarComponent />
      <RecentOnline />
    </div>
  );
};
