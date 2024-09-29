//with dataGrid
import React, { useState, useEffect, useReducer } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "./ViewSubmissionsModal.css";
import Button from "@mui/material/Button";
import BasicModalComp from "../../Components/BasicModal/BasicModalComp";
import {
  evaluateAssignmentImage,
  getAssignmentImages,
} from "../../Slices/PorfessorSlice";
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
import toast from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
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
  useEffect(() => {
    if (!assignmentId) {
      console.error("AssignmentId or UserId not found in session Storage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }

    getSubmissionByAssignment(assignmentId).then((res) => {
      if (validArray(res.msg)) {
        console.log(res.msg);

        const mappedRows = res.msg.map((record) => ({
          personalImage: serverURL + record.PersonalImage, // Change to personalImage for consistency
          name: record.Name,
          id: record.MSAId,
          email: record.Email,
          grade: `${record.Grade.Total}/${record.Grade.count * 10}`,
          submissionTime: timeAgo(record.submitTime),
          weekNumber: record.weekNum,
          comment: record.Comment ?? "",
          openModal: () =>
            dispatch({
              type: "openViewSubmissionModal",
              payload: record.submission,
              fullSubmission: record,
            }),
        }));

        setrows(mappedRows); // Update the rows state

        dispatch({
          type: "setSubmissions",
          payload: mappedRows, // Use mappedRows directly instead of rows
        });
      } else {
        dispatch({
          type: "setSubmissions",
          payload: [],
          Error: res.msg,
        });
      }
    });

    console.log(rows);
    return () => removeSessionKey("submissionData");
  }, [assignmentId]);
  function timeAgo(inputTime) {
    const now = new Date(); // Current time
    const past = new Date(inputTime); // Input time
    const diffInMs = now - past; // Difference in milliseconds

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
  }
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
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={true}
            getRowId={(row) => `${row.Id}-${row.weekNum}`} // Concatenating ID and WeekNum to form a unique ID
          />

          {/* {validArray(state.submissions) ? (
            <DataGrid rows={rows} columns={columns} />
          ) : (
            <p>There Is No Submissions Yet</p>
          )} */}
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

const columns = [
  {
    field: "personalImage", // Update this to match the property in the rows
    headerName: "Profile",
    renderCell: (params) => (
      <img
        src={params.row.personalImage}
        alt="Profile"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }} // Example styling
      />
    ),
  },
  { field: "name", headerName: "Name" },
  { field: "id", headerName: "ID" },
  { field: "email", headerName: "Email" },
  { field: "grade", headerName: "Grade" },
  { field: "submissionTime", headerName: "Submission Time" },
  { field: "weekNumber", headerName: "Week Number" },
  { field: "fileSubmissions", headerName: "File Submissions" },
];

function ViewSubmissionsModal({
  show,
  handleClose,
  submission,
  fullSubmission,
}) {
  const [images, setImages] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("fullSubmission:", fullSubmission);

  useEffect(() => {
    if (!submission) return;
    getAssignmentImages({ submission: submission }).then((res) => {
      setImages(res.msg);
    });
  }, [submission]);

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
  };

  const closeImageViewer = () => {
    setOpenImageModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  function EvaluateImage() {
    evaluateAssignmentImage({
      ImageId: images[currentImageIndex].Id,
      Grade: images[currentImageIndex].Grade,
    });
    toast.success("Image Evaluated Successfully");
  }

  if (!show) {
    return null;
  }

  return (
    <BasicModalComp openModal={show} closeModal={handleClose}>
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>
            Submissions for {fullSubmission.Name} MSAId:{fullSubmission.MSAId}{" "}
            Week:{fullSubmission.weekNum}
          </h2>
          <div className="image-container">
            {validArray(images) ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={`${serverURL}${img.Path}`}
                  alt={`Submission ${index + 1}`}
                  className="submission-image"
                  onClick={() => openImageViewer(index)}
                />
              ))
            ) : (
              <p>No Films available</p>
            )}
          </div>
          <button onClick={handleClose}>Close</button>

          {openImageModal && (
            <BasicModalComp
              openModal={openImageModal}
              closeModal={closeImageViewer}
            >
              <div className="image-slider1">
                <button
                  className="closeButton"
                  onClick={closeImageViewer}
                  style={{ marginTop: "-50px" }}
                >
                  &#10005;
                </button>
                <button className="prev-button" onClick={prevImage}>
                  &#10094;
                </button>

                <img
                  src={`${serverURL}${images[currentImageIndex].Path}`}
                  alt={`Submission ${currentImageIndex + 1}`}
                  className="large-image"
                />
                <button className="next-button" onClick={nextImage}>
                  &#10095;
                </button>
                <div
                  className="grading"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <input
                    style={{
                      width: "200px",
                      padding: "8px",
                      borderRadius: "16px",
                    }}
                    type="number"
                    max={100}
                    min={0}
                    placeholder="Enter Grade of the Film"
                    value={images[currentImageIndex].Grade}
                    onChange={(event) => {
                      setImages((prev) => {
                        return prev.map((image) => {
                          if (image.Id === images[currentImageIndex].Id) {
                            return { ...image, Grade: event.target.value };
                          } else {
                            return image;
                          }
                        });
                      });
                    }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={EvaluateImage}
                  >
                    Grade
                  </Button>
                  <p>{images[currentImageIndex].CategoryName}</p>
                </div>
              </div>
            </BasicModalComp>
          )}
        </div>
      </div>
    </BasicModalComp>
  );
}
export default GradingPage;
