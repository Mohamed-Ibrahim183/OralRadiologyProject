import React from "react";
import "./StartCard.css";

function StatCard({ title, value, percentage, time, Index }) {
  const classIndex = `stat-card ${Index}`;
  return (
    <div className={classIndex}>
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="percentage">
        {percentage}% Increase in {time}
      </p>
    </div>
  );
}
export default StatCard;
