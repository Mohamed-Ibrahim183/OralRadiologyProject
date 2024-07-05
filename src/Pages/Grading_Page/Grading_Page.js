import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate, useSearchParams } from "react-router-dom";
import TableHeaderGradingPage from "./TableHeader_grading_page";
import TableRowGradingPage from "./TableRow_Grading_Page";
import ViewSubmissionsModal from "./ViewSubmissionsModal";
import "./Grading.css";
import { axiosMethods } from "../Controller";

function GradingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");
  const [assignmentName, setAssignmentName] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    if (!assignmentId) {
      console.error("AssignmentId or UserId not found in sessionStorage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }

    const fetchData = () => {
      const dataSending = {
        assignmentId: assignmentId,
      };

      new axiosMethods()
        .get(
          "http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetSubmissionAssignment",
          dataSending
        )
        .then((res) => {
          console.log("res.msg:", res.msg);
          if (res.msg) {
            // Success
            const responseData = Array.isArray(res.msg) ? res.msg : [];
            // Initialize data from response
            const initializedData = responseData.map((record) => ({
              ...record,
              Grade: record.Grade ?? 0, // Default to 0 if Grade is null or undefined
              Comment: record.Comment ?? "", // Default to empty string if Comment is null or undefined
            }));
            setData(initializedData);
            console.log("initializedData:", initializedData);
            // sessionStorage.setItem("ProfileImgs", responseData.PersonalImage);
          } else {
            // Fail
            setError(res.error);
          }
        })
        .catch((err) => console.error(err));
        
    };
    fetchData();

    // Cleanup function
    return () => {
      sessionStorage.removeItem("submissionData");
    };
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
    const sessionData =
      JSON.parse(sessionStorage.getItem("submissionData")) || {};
    sessionData[studentId] = { ...sessionData[studentId], ...newData };
    sessionStorage.setItem("submissionData", JSON.stringify(sessionData));
  };

  const handleOpenModal = (studentId) => {
    setCurrentStudentId(studentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveAll = () => {
    const submissionData =
      JSON.parse(sessionStorage.getItem("submissionData")) || {};
    const dataToSend = Object.entries(submissionData).map(
      ([studentId, { grade, comment }]) => ({
        assignmentId: assignmentId,
        studentId: studentId,
        grade: grade,
        comment: comment,
      })
    );

    new axiosMethods()
      .post(
        "http://localhost/Projects/OralRadiology/UpdateSubmission.php",
        submissionData
      )
      .then((res) => {
        if (res && res.data && res.data.success) {
          alert("Submissions saved successfully!");
        } else {
          console.error("Error response from server:", res); // Log the error response
          alert("Failed to save submissions. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error saving submissions:", error);
        alert("An error occurred while saving submissions.");
      });
  };

  if (sessionStorage["Type"] !== "Professor") {
    return <Navigate to="/" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="monem2_admin">
        <h1>Assignment 1</h1>
        <hr />
        <div>
          <h2>Submissions</h2>
          <button type="button" onClick={handleSaveAll}>
            Save All
          </button>
          <button type="submit">Download Report</button>
        </div>
        <input type="search" id="searchh" />
        <div className="table-responsive">
          <table className="table">
            <TableHeaderGradingPage />
            <tbody>
              {data.map((record, index) => (
                <TableRowGradingPage
                  key={index}
                  record={{
                    profilePic: `http://localhost/Projects/OralRadiology/${record.PersonalImage}`,
                    name: record.Name,
                    IDD: record.MSAId,
                    email: record.Email,
                    status: record.Type,
                    joiningDate: record.submitTime,
                    Grade: record.Grade,
                    Comment: record.Comment,
                    openModal: () => handleOpenModal(record.Id),
                  }}
                  onGradeChange={handleGradeChange}
                  onCommentChange={handleCommentChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ViewSubmissionsModal
        show={showModal}
        handleClose={handleCloseModal}
        studentId={currentStudentId}
        assignmentId={assignmentId}
      />
    </>
  );
}

export default GradingPage;
