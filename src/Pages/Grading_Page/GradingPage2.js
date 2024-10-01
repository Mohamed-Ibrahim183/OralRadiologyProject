import React, { useState, useEffect, useReducer } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "./ViewSubmissionsModal.css";
import "./Grading.css";
import { getSubmissionByAssignment } from "../../Slices/PorfessorSlice";
import { serverURL } from "../../Slices/GeneralSlice";
import {
  getSession,
  removeSessionKey,
  setSession,
  validArray,
} from "../Controller";
import { getAssignmentData } from "../../Slices/StudentSlice";
import ViewSubmissionsModal from "./ViewSubmissionsModal";
import { TableHeaderGradingPage, TableRowGradingPage } from "./table";

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

function GradingPage2() {
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

  const [searchParams] = useSearchParams(); // Removed unused setSearchParams
  const assignmentId = searchParams.get("assignmentId");

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!assignmentId) {
      console.error("AssignmentId or UserId not found in session Storage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }

    getSubmissionByAssignment(assignmentId).then((res) => {
      validArray(res.msg)
        ? dispatch({
            type: "setSubmissions",
            payload: res.msg.map((record) => {
              return { ...record, Comment: record.Comment ?? "" };
            }),
          })
        : dispatch({
            type: "setSubmissions",
            payload: [],
            Error: res.msg,
          });
    });

    return () => removeSessionKey("submissionData");
  }, [assignmentId, state.render]);

  useEffect(() => {
    getAssignmentData({ assignmentId }).then((res) =>
      dispatch({ type: "setAssignment", payload: res.msg })
    );
  }, [assignmentId]);

  const handleGradeChange = (studentId, newGrade) => {
    setData((prevData) =>
      prevData.map((record) =>
        record.MSAId === studentId ? { ...record, Grade: newGrade } : record
      )
    );
    updateSessionData(studentId, { grade: newGrade });
  };

  const handleCommentChange = (studentId, newComment) => {
    setData((prevData) =>
      prevData.map((record) =>
        record.MSAId === studentId ? { ...record, Comment: newComment } : record
      )
    );
    updateSessionData(studentId, { comment: newComment });
  };

  const updateSessionData = (studentId, newData) => {
    const sessionData = JSON.parse(getSession("submissionData")) || {};

    sessionData[studentId] = { ...sessionData[studentId], ...newData };

    setSession("submissionData", JSON.stringify(sessionData));
  };

  if (getSession("Type") !== "Professor") return <Navigate to="/" />;

  if (error) return <p>Error: {error}</p>;

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
          {validArray(state.submissions) ? (
            <table className="table">
              <TableHeaderGradingPage />
              <tbody>
                {validArray(state.submissions) &&
                  state.submissions.map((record, index) => (
                    <TableRowGradingPage
                      key={index}
                      record={{
                        profilePic: `${serverURL}${record.PersonalImage}`,
                        name: record.Name,
                        ID: record.Id,
                        IDD: record.MSAId,
                        email: record.Email,
                        status: record.Type,
                        Time: record.submitTime,
                        Grade: record.Grade,
                        Comment: record.Comment,
                        weekNum: record.weekNum,
                        openModal: () =>
                          dispatch({
                            type: "openViewSubmissionModal",
                            payload: record.submission,
                            fullSubmission: record,
                          }),
                        ...data,
                      }}
                      onGradeChange={handleGradeChange}
                      onCommentChange={handleCommentChange}
                    />
                  ))}
              </tbody>
            </table>
          ) : (
            <p>There Is No Submissions Yet</p>
          )}
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

export default GradingPage2;
