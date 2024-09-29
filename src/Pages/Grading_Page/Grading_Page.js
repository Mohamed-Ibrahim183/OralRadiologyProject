import React, { useState, useEffect, useReducer } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "./ViewSubmissionsModal.css";
import Button from "@mui/material/Button";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";

import { getSubmissionByAssignment } from "../../Slices/PorfessorSlice";
import { serverURL } from "../../Slices/GeneralSlice";
import { getSession, removeSessionKey, validArray } from "../Controller";
import ViewSubmissionsModal from "./ViewSubmissionsModal";
import { getAssignmentData } from "../../Slices/StudentSlice";
import { DataGrid } from "@mui/x-data-grid";
import "./Grading.css";
import "../DataGrid.css";

const initialState = {
  submissions: [],
  assignmentData: {},
  assignment: {},
  render: 0,
  Error: "",
  submissionForModal: {},
  viewSubmissionModal: false,
  fullSubmissionData: {},
};
function GradingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "setSubmissions":
        if (action.payload.length > 0)
          return { ...state, submissions: action.payload };
        else
          return { ...state, submissions: action.payload, Error: action.Error };
      case "openViewSubmissionModal":
        return {
          ...state,
          submissionForModal: action.payload,
          viewSubmissionModal: true,
          fullSubmissionData: action.fullSubmission,
        };
      case "closeViewSubmissionModal":
        return {
          ...state,
          submissionForModal: {},
          viewSubmissionModal: false,
          fullSubmissionData: {},
          render: state.render + 1,
        };
      case "setAssignment":
        return { ...state, assignmentData: action.payload };
      case "Error":
        return { ...state, Error: action.payload };
      case "render":
        return { ...state, render: state.render + 1 };
      default:
        return { ...state };
    }
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [rows, setrows] = useState([]);
  const [fullrows, setfullrows] = useState([]);

  useEffect(() => {
    if (!assignmentId) {
      console.error("AssignmentId or UserId not found in session Storage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }

    getSubmissionByAssignment(assignmentId).then((res) => {
      setfullrows(res.msg);
      console.log(res.msg);
      if (validArray(res.msg)) {
        const mappedRows = res.msg.map((record) => ({
          personalImage: serverURL + record.PersonalImage,
          name: record.Name,
          id: record.MSAId,
          email: record.Email,
          grade: `${record.Grade.Total}/${record.Grade.count * 10}`,
          submissionTime: timeAgo(record.submitTime),
          weekNumber: record.weekNum,
          comment: record.Comment ?? "",
          submission: record.submission,
        }));

        setrows(mappedRows);

        dispatch({
          type: "setSubmissions",
          payload: mappedRows,
        });
      } else {
        dispatch({
          type: "setSubmissions",
          payload: [],
          Error: res.msg,
        });
      }
    });

    return () => removeSessionKey("submissionData");
  }, [assignmentId]);

  const timeAgo = (inputTime) => {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} seconds ago`;
    else if (minutes < 60) return `${minutes} minutes ago`;
    else if (hours < 24) return `${hours} hours ago`;
    else if (days < 7) return `${days} days ago`;
    else if (weeks < 4) return `${weeks} weeks ago`;
    else if (months < 12) return `${months} months ago`;
    else return `${years} years ago`;
  };

  useEffect(() => {
    getAssignmentData({ assignmentId }).then((res) => {
      dispatch({ type: "setAssignment", payload: res.msg });
    });
  }, [assignmentId]);

  if (getSession("Type") !== "Professor") return <Navigate to="/" />;

  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      field: "personalImage",
      headerName: "Profile",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img
          src={params.row.personalImage}
          alt="Profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
      width: 120, // Fixed width for image
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      width: 150, // Fixed width
    },
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 100, // Fixed width
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200, // Fixed width
    },
    {
      field: "grade",
      headerName: "Grade",
      headerAlign: "center",
      align: "center",
      width: 120, // Fixed width
    },
    {
      field: "submissionTime",
      headerName: "Submission Time",
      headerAlign: "center",
      align: "center",
      width: 185, // Fixed width
    },
    {
      field: "weekNumber",
      headerName: "Week Number",
      headerAlign: "center",
      align: "center",
      width: 150, // Fixed width
    },
    {
      field: "fileSubmissions",
      headerName: "File Submissions",
      headerAlign: "center",
      align: "center",
      width: 200, // Fixed width
      renderCell: (params) => {
        const fullSubmission = fullrows.find(
          (fullrow) => fullrow.submission === params.row.submission
        );

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              dispatch({
                type: "openViewSubmissionModal",
                payload: fullSubmission.submission,
                fullSubmission: fullSubmission, // Send the full submission data
              })
            }
          >
            View Submissions
          </Button>
        );
      },
    },
    {
      field: "comment",
      headerName: "Comment",
      headerAlign: "center",
      align: "center",
      width: 200, // Fixed width
      renderCell: (params) => {
        return (
          <input
            type="text"
            style={{ width: "100%", padding: "10px" }}
            onChange={(e) => {
              params.row.comment = e.target.value;
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="monem2_admin">
        <h1>
          {state.assignmentData.Name
            ? `Grading ${state.assignmentData.Name}`
            : "Grading Assignment"}
        </h1>
        <hr />
        <div className="table-responsive">
          {console.log("mappedRows")}
          {console.log(rows)}
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={true}
            getRowId={(row) => row.submission}
            disableSelectionOnClick
          />
        </div>
      </div>
      <ViewSubmissionsModal
        show={state.viewSubmissionModal}
        fullSubmission={state.fullSubmissionData}
        handleClose={() => dispatch({ type: "closeViewSubmissionModal" })}
        submission={state.submissionForModal}
        assignmentId={assignmentId}
      />
    </>
  );
}

export default GradingPage;
