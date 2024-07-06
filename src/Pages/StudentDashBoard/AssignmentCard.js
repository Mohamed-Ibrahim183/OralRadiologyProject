import React from "react";

const AssignmentCard = (props) => {
  const stateStyle = {
    backgroundColor: props.col,
  };
  const label = {
    borderLeft: `10px solid ${props.col}`,
  };
  return (
    <div className="AssCard" style={label}>
      <div className="info">
        <h3 className="name">{props.name}</h3>
        <span className="Details">{props.info}</span>
      </div>
      <div className="grade">{/* <span>{props.grade}/100</span> */}</div>
      <div className="state" style={stateStyle}>
        {/* {props.state} */}
      </div>
    </div>
  );
};

export default AssignmentCard;
