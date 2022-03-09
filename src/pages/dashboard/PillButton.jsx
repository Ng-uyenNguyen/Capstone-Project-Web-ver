export const PillButton = ({ title, amount, img_scr }) => (
  <div className="overview_pill dashboard-box-shadow">
    <div className="pill_icon_container">
      <img src={img_scr} alt="student" />
    </div>
    <div className="pill_detail">
      <p>{title}</p>
      <strong>{amount}</strong>
    </div>
  </div>
);
