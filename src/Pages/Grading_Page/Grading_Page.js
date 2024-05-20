import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import TableHeader_grading_page from "./TableHeader_grading_page";
import TableRow_Grading_Page from "./TableRow_Grading_Page";
import ViewSubmissionsModal from "./ViewSubmissionsModal"; 
import './Grading.css';

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

    axios.get(`http://localhost/Projects/OralRadiology/monem.php`, {
      params: { assignmentId, userId }
    })
    .then(response => {
      console.log("API response data:", response.data);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const responseData = Array.isArray(response.data) ? response.data : [];
        setData(responseData);
      }
    })
    .catch(error => {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    });
  }, [assignmentId, userId]);

  const handleOpenModal = (studentId) => {
    sessionStorage.setItem("StudentId", studentId);
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
                    profilePic: record.PersonalImage,
                    name: record.Name,
                    IDD: record.MSAId,
                    email: record.Email,
                    status: record.Type,
                    joiningDate: record.submitTime,
                    openModal: () => handleOpenModal(record.Id)
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
