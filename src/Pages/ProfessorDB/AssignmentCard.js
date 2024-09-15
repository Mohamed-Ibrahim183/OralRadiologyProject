// AssignmentCard.js
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Delete, Edit } from "@mui/icons-material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
const AssignmentCard = (props) => {
  // props.assignmentId
  const label = {
    borderLeft: `8px solid ${props.col || "#1976D2"}`,
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
        {/* <Button
          sx={{ color: "white" }}
          variant="contained"
          color="primary"
          onClick={() => {
            sessionStorage.setItem("editAssignment", props.assignmentId);
          }}
          endIcon={<Edit />}
        >
          Edit Assignment
        </Button> */}
        {/* <Modal2
          open={isModal2Open}
          onClose={handleCloseModal2}
          AssignmentId={props.assignmentId}
        /> */}
        <Link to="/professor/EditAssignment">
          <Button
            sx={{ colo: "white" }}
            variant="contained"
            color="primary"
            endIcon={<EditIcon />}
            onClick={() => {
              sessionStorage.setItem("editAssignment", props.assignmentId);
            }}
          >
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
