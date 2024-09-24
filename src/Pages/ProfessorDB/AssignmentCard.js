// AssignmentCard.js
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Delete, Edit, Grade, Grading } from "@mui/icons-material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { encryptData } from "../Controller";
const AssignmentCard = (props) => {
  // props.assignmentId
  const label = {
    borderLeft: `8px solid ${props.col || "#1976D2"}`,
  };

  const handleClick = () => {
    sessionStorage.setItem("userId", encryptData(props.userId));
    sessionStorage.setItem("assignmentId", encryptData(props.assignmentId)); // Lowercase "a"
  };
  return (
    <div className="AssCard" style={label}>
      <div className="info">
        <h3 className="name">{props.name}</h3>
        <span className="Details">{props.info}</span>
      </div>
      <Link to={props.toPage} onClick={handleClick}>
        <Button
          variant="contained"
          color="success"
          className="assignmentCardBtns"
        >
          <div className="assignmentCardBtnsText">Grade</div>
          <Grading />
        </Button>
      </Link>

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
            className="assignmentCardBtns"
            onClick={() => {
              sessionStorage.setItem(
                "editAssignment",
                encryptData(props.assignmentId)
              );
            }}
          >
            <div className="assignmentCardBtnsText">Edit</div>
            <EditIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
