import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import TableHeader_grading_page from "./TableHeader_grading_page";
import TableRow_Grading_Page from "./TableRow_Grading_Page";
import ViewSubmissionsModal from "./ViewSubmissionsModal";
import "./Grading.css";
import { axiosMethods } from "../Controller";

function GradingPage() {
  const assignmentId = sessionStorage.getItem("assignmentId");
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);

  useEffect(() => {
    if (!assignmentId || !userId) {
      console.error("AssignmentId or UserId not found in sessionStorage");
      setError("Assignment ID or User ID missing in session storage.");
      return;
    }
    const dataSending = {
      assignmentId: assignmentId,
      userId: userId,
    };

    new axiosMethods()
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetSubmissionAssignment",
        dataSending
      )
      .then((res) => {
        if (res.msg) {
          // success
          const responseData = Array.isArray(res.msg) ? res.msg : [];
          setData(responseData);
          sessionStorage.setItem("ProfileImgs", responseData.PersonalImage);
        } else {
          // fail
          setError(res.error);
        }
      });
  }, [assignmentId, userId]);

  const handleOpenModal = (studentId) => {
    setCurrentStudentId(studentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (sessionStorage["Type"] !== "Professor") {
    return <Navigate to="/" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Navbar />
      <div className="monem2_admin">
        <h1>Assignment 1</h1>
        <hr />
        <div>
          <h2>Submissions</h2>
          <button type="submit">Download Report</button>
        </div>
        <input type="search" id="searchh" />
        <div className="table-responsive">
          <table className="table">
            <TableHeader_grading_page />
            <tbody>
              {data.map((record, index) => (
                <TableRow_Grading_Page
                  key={index}
                  record={{
                    profilePic: `http://localhost/Projects/OralRadiology/${record.PersonalImage}`,

                    //     profilePic: record.PersonalImage,
                    name: record.Name,
                    IDD: record.MSAId,
                    email: record.Email,
                    status: record.Type,
                    joiningDate: record.submitTime,
                    openModal: () => handleOpenModal(record.Id),
                  }}
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
