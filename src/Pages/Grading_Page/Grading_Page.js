import React, { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import TableHeaderGradingPage from "./TableHeader_grading_page";
import TableRowGradingPage from "./TableRow_Grading_Page";
import ViewSubmissionsModal from "./ViewSubmissionsModal";
import "./Grading.css";
import { getSubmissionByAssignment } from "../../Slices/PorfessorSlice";

function GradingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignmentId");

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    if (!assignmentId) {
      console.error("AssignmentId or UserId not found in sessionStorage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }

    getSubmissionByAssignment({
      assignmentId: assignmentId,
    }).then((res) => {
      if (res.msg) {
        // Success
        const responseData = Array.isArray(res.msg) ? res.msg : [];
        // Initialize data from response
        const initializedData = responseData.map((record) => ({
          ...record,
          Comment: record.Comment ?? "", // Default to empty string if Comment is null or undefined
        }));
        setData(initializedData);
      }
      // Fail
      else setError(res.error);
    });

    return () => sessionStorage.removeItem("submissionData");
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

  const handleOpenModal = (submission) => {
    // setCurrentStudentId(studentId);
    setSubmission(submission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (sessionStorage["Type"] !== "Professor") return <Navigate to="/" />;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="monem2_admin">
        <h1>Grading Assignment</h1>
        <hr />
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
                    ID: record.Id,
                    IDD: record.MSAId,
                    email: record.Email,
                    status: record.Type,
                    Time: record.submitTime,
                    Grade: record.Grade,
                    Comment: record.Comment,
                    openModal: () => handleOpenModal(record.submission),
                    ...data,
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
        // studentId={currentStudentId}
        submission={submission}
        assignmentId={assignmentId}
      />
    </>
  );
}

export default GradingPage;
