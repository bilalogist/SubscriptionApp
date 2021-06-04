import React from "react";
import styles from "./DashboardRouteCard.module.css";

const DashboardRouteCard = ({ icon: Icon, heading, description, onClick }) => {
  return (
    <div className={styles.route_card} onClick={onClick}>
      <div style={{ flex: 0.2, alignSelf: "center" }}>
        {React.cloneElement(Icon, {
          color: "royalblue",
          size: 35,
        })}
      </div>
      <div className={styles.route_card_col}>
        <h3 className={styles.route_card_heading}>{heading}</h3>
        <p className={styles.route_card_p}>{description}</p>
      </div>
    </div>
  );
};
export default DashboardRouteCard;
