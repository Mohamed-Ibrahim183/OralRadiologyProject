import React, { useState, useEffect } from "react";
// import "./StudentDB.css";

import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./student.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import UserProfile from "../../Components/UserProfile";
import { axiosMethods } from "../Controller";

const StudentDB = () => {
  const studentName = sessionStorage["Name"] || "Student";
  const personalImage = sessionStorage["PersonalImage"];
  const UserId = sessionStorage["userId"];

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [Error, setError] = useState("");

  useEffect(() => {
    new axiosMethods()
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php", {
        Action: "GetAssignmentsForUser",
        userId: UserId,
      })
      .then((res) => {
        // console.log("New Endpoint", res.msg);
        if (res.msg["Err"] === 1)
          setError("User is not in a Group Please contact to the Admin");
        else {
          setAssignments(res.msg);
        }
      });
  }, [UserId]);

  useEffect(() => {
    new axiosMethods()
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php", {
        Action: "GetSubmissionById",
        userId: UserId,
      })
      .then((res) => {
        // console.log("New Endpoint", res.msg);
        if (res.msg["Err"] === 1)
          setError("User is not in a Group Please contact to the Admin");
        else {
          setSubmissions(res.msg);
        }
      });
  }, [UserId]);

  const handleAssignmentClick = (assignmentId) => {
    sessionStorage.setItem("assignmentId", assignmentId); // Change this to 'assignmentId' to match your PHP
  };

  if (sessionStorage["Type"] !== "Student") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="fullPage">
        <div className="upper">
          <div className="container AssignmentSection">
            <div className="BBBBBB">
              <h2 className="sectionTitle">My Assignments</h2>
            </div>
            <div className="cardAssignment">
              {assignments.length > 0 &&
                Array.isArray(assignments) &&
                assignments.map((assignment, i) => (
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
                      // state="Good"
                      // grade="60"
                      info={`Topic: ${assignment.Topic}`}
                      col="#0082e6"
                    ></AssignmentCard>
                  </Link>
                ))}
              {Error !== "" && <p>{Error}</p>}
              {Error === "" && assignments.length === 0 && (
                <p>There is no assignments yet</p>
              )}
            </div>
          </div>

          <UserProfile
            professorImage={personalImage}
            professorName={studentName}
          />
        </div>
        <div>
          <div className="cc1">
            <Chart
              className="chart1"
              userID={UserId}
              Assignments={assignments}
            />
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
