import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import TableHeader_grading_page from "./TableHeader_grading_page";
import TableRow_Grading_Page from "./TableRow_Grading_Page";
import './Grading.css'

function GradingPage() {
  const assignmentId = sessionStorage.getItem("assignmentId");
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState({ images: [], user: {} });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      console.error("UserId not found in sessionStorage");
      setError("User ID missing in session storage.");
      return; // Early return if no userId
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
  }, [assignmentId, userId]); // Ensure dependencies are correct for the useEffect hook

  if (sessionStorage["Type"] !== "Professor") {
    return <Navigate to="/" />;
  }

  if (error) {
 //   return <p>Error: {error}</p>; // Display error if it exists
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
            {data.images.map((record, index) => (
              <TableRow_Grading_Page key={index} record={{
                profilePic: record.user.profilePic,
                name: record.user.name,
                IDD: record.user.IDD,
                email: record.user.email,
                status: record.user.status,
                joiningDate: "s"
              }} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default GradingPage;
