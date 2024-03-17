import React from 'react';
import './StartCard.css'; 

function StatCard({ title, value, percentage, time,monem }) {
  let myString="stat-card ".concat(monem)
  return (
    <div className={myString} >
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="percentage">{percentage}% Increase in {time}</p>
    </div>
  );
}
export default StatCard;
