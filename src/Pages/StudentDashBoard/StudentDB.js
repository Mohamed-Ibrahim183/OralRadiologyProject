import React, { useState, useEffect } from "react";
import "./StudentDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./student.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const StudentDB = () => {
  const studentName = sessionStorage["Name"] || "Student";
  const personalImage = sessionStorage["PersonalImage"];
  const UserId = sessionStorage["userId"];

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const url =
      "http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetAll";
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        res.data ? setAssignments(res.data) : setAssignments(null);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAssignmentClick = (assignmentId) => {
    sessionStorage.setItem("assignmentId", assignmentId); // Change this to 'assignmentId' to match your PHP
  };
  if (sessionStorage["Type"] !== "Student") {
    return <Navigate to="/" />;
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="fullPage">
        <div className="upper">
          <div className="container AssignmentSection">
            <div className="BBBBBB">
              <h2 className="sectionTitle">My Assignments</h2>
              <h5 className="seal">See all →</h5>
            </div>
            <div className="cardAssignment">
              {assignments.map((assignment, i) => (
                <Link
                  key={i}
                  to={{
                    pathname: "/student/submit",
                    search: `?userId=${UserId}&assignmentId=${assignment.Id}`,
                  }}
                  onClick={() => handleAssignmentClick(assignment.Id)}
                >
                  <AssignmentCard
                    name={assignment.Name}
                    state="Good"
                    info={`${assignment.Topic}, April 30, 2024, 1:00 pm`}
                    grade="60"
                    col="#0082e6"
                  ></AssignmentCard>
                </Link>
              ))}
            </div>
          </div>
          <div className="userProf">
            <div className="TEXT">
              <div>
                <img
                  src={personalImage}
                  alt="Student Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    marginTop: "-20px",
                    marginBottom: "20px",
                  }}
                />
              </div>
              <h4>Welcome Back</h4>
              <h2>{studentName}</h2>
              <p>Welcome to our Oral Radiology system</p>
            </div>
            <button type="button">
              <Link to="/Profile">Go To Profile</Link>
            </button>
          </div>
        </div>
        <div>
          <div className="cc1">
            <Chart className="chart1" userID={sessionStorage["userId"] || 1} />
          </div>
          <div className="Calender">
            <h2>Calendar</h2>
            <Calendar></Calendar>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDB;
