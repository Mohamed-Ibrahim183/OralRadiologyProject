import { Dns, Padding } from "@mui/icons-material";
import React from "react";

const AssignmentCard = ({
  col,
  name,
  info,
  state,
  grade,
  maxGrade,
  remaining,
}) => {
  const stateStyle = {
    backgroundColor: col,
  };
  const label = {
    borderLeft: `10px solid ${col}`,
  };
  return (
    <div className="AssCard" style={label}>
      <div className="info">
        <div className="infoUp">
          <h3 className="name">{name}</h3>
        </div>
        <div className="infoDown">
          {info && <span className="Details">{info}</span>}
          <span className="openTime" style={{ marginLeft: "15px" }}>
            {remaining}
          </span>
        </div>
      </div>
      {grade && (
        <div className="grade">
          <span>{grade}</span>
        </div>
      )}
      {state && (
        <div className="state" style={stateStyle}>
          {state}
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
