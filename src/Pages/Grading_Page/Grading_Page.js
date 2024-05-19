import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import TableHeader_grading_page from "./TableHeader_grading_page";
import TableRow_Grading_Page from "./TableRow_Grading_Page";
import './Grading.css';

function GradingPage() {
  const assignmentId = sessionStorage.getItem("assignmentId");
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState({ images: [] });
  const [error, setError] = useState("");

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
      setData(response.data);
    })
    .catch(error => {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    });
  }, [assignmentId, userId]);

  if (sessionStorage["Type"] !== "Professor") {
    return <Navigate to="/" />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Ensure data.images is initialized before mapping
  const images = data.images || [];

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
            {images.map((record, index) => (
              <TableRow_Grading_Page key={index} record={{
                profilePic: record.PersonalImage,
                name: record.Name,
                IDD: record.MSAId,
                email: record.Email,
                status: record.Type,
                joiningDate: record.submitTime 
              }} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default GradingPage;
