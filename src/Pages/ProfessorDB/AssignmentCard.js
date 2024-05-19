import React, { useState } from "react";
import Modal2 from "./Modal2";
import { Link, useNavigate } from "react-router-dom";

const AssignmentCard = (props) => {
  const label = {
    borderLeft: `10px solid ${props.col}`,
  };

  const [isModal2Open, setModal2Open] = useState(false);

  const handleOpenModal2 = () => {
    setModal2Open(true);
  };

  const handleCloseModal2 = () => {
    setModal2Open(false);
  };

  const handleClick = () => {
    sessionStorage.setItem("userId", props.userId);
    sessionStorage.setItem("assignmentId", props.AssignmentId);
  };

  return (
    <div className="AssCard" style={label}>
      <Link to={props.toPage} onClick={handleClick}>
        <div className="info">
          <h3 className="name">{props.name}</h3>
          <span className="Details">{props.info}</span>
        </div>
      </Link>
      <div className="grade">
        <Modal2
          open={isModal2Open}
          onClose={handleCloseModal2}
          AssignmentId={props.AssignmentId}
        />
        <button onClick={handleOpenModal2}>Add Group Slots</button>
      </div>
    </div>
  );
};

export default AssignmentCard;
