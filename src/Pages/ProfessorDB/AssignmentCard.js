import React, { useState } from "react"; 
import Modal2 from "./Modal2";

const AssignmentCard = (props) => {
  const stateStyle = {
    backgroundColor: props.col, 
  };

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

  return (
    <div className="AssCard" style={label}>
      <div className="info">
        <h3 className="name">{props.name}</h3>
        <span className="Details">{props.info}</span>
      </div>
      <div className="grade">
        <Modal2 open={isModal2Open} onClose={handleCloseModal2} />
        <button onClick={handleOpenModal2}>
          Add Group Slots
        </button>
      </div>
      <div className="state" style={stateStyle}>
        {props.state}
      </div>
    </div>
  );
};

export default AssignmentCard;
