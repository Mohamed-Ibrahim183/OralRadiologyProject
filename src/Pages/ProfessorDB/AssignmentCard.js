// AssignmentCard.js
import React, { useState } from "react";
import Modal2 from "./Modal2";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Delete } from "@mui/icons-material";

const AssignmentCard = (props) => {
  // props.assignmentId
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
    sessionStorage.setItem("assignmentId", props.assignmentId); // Lowercase "a"
  };

  return (
    <div className="AssCard" style={label}>
      <Link to={props.toPage} onClick={handleClick}>
        <div className="info">
          <h3 className="name">{props.name}</h3>
          <span className="Details">{props.info}</span>
        </div>
      </Link>
      <Button
        variant="outlined"
        color="error"
        onClick={() => props.onDelete(props.assignmentId)}
      >
        Delete <Delete />
      </Button>
      <div className="grade">
        <Modal2
          open={isModal2Open}
          onClose={handleCloseModal2}
          AssignmentId={props.assignmentId}
        />
        <Button
          sx={{ colo: "white" }}
          variant="contained"
          color="primary"
          onClick={handleOpenModal2}
          endIcon={<AddCircleOutlineIcon />}
        >
          Add Group Slots
        </Button>
      </div>
    </div>
  );
};

export default AssignmentCard;
