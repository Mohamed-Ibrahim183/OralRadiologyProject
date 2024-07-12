import React from "react";

const AssignmentCard = ({ col, name, info, state, grade, maxGrade }) => {
  const stateStyle = {
    backgroundColor: col,
  };
  const label = {
    borderLeft: `10px solid ${col}`,
  };
  return (
    <div className="AssCard" style={label}>
      <div className="info">
        <h3 className="name">{name}</h3>
        {info && <span className="Details">{info}</span>}
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
