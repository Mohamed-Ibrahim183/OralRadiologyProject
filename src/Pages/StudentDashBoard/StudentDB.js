import React, { useState, useEffect } from "react";
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
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [Error, setError] = useState("");

  useEffect(() => {
    new axiosMethods()
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php", {
        Action: "GetAssignmentsForUser",
        userId: UserId,
      })
      .then((res) => {
        if (res.msg["Err"] === 1)
          setError("User is not in a Group. Please contact the Admin.");
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
        if (res.msg["Err"] === 1)
          setError("User is not in a Group. Please contact the Admin.");
        else {
          setSubmissions(res.msg);
        }
      });
  }, [UserId]);

  useEffect(() => {
    filterAssignments();
  }, [assignments, filter]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (userId) {
      new axiosMethods()

        .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php", {
          params: {
            Action: "GetSubmissionByUser",
            userId: userId,
          },
        })
        .then((res) => {
          console.log("Response data:", res.data); // Log the entire response
          if (res.data) {
            setSubmissions(res.data);
            alert("Submissions fetched successfully!");
          } else {
            console.error("Response data is undefined or empty.");
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the submissions!", error);
        });
    } else {
      console.error("User ID is null!");
    }
  }, []);

  const filterAssignments = () => {
    const now = new Date();
    let filtered = [];

    if (filter === "Completed") {
      filtered = assignments.filter(
        (assignment) =>
          new Date(assignment.open) <= now && new Date(assignment.close) < now
      );
    } else if (filter === "Inprogress") {
      filtered = assignments.filter(
        (assignment) =>
          new Date(assignment.open) <= now && new Date(assignment.close) >= now
      );
    } else if (filter === "Upcoming") {
      filtered = assignments.filter(
        (assignment) => new Date(assignment.open) > now
      );
    } else {
      filtered = assignments;
    }

    setFilteredAssignments(filtered);
  };

  const handleAssignmentClick = (assignmentId) => {
    sessionStorage.setItem("assignmentId", assignmentId);
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
              <div className="filterOptions">
                <span
                  className={`Filteroption ${
                    filter === "All" ? "selected" : ""
                  }`}
                  onClick={() => setFilter("All")}
                >
                  All
                </span>
                <span
                  className={`Filteroption ${
                    filter === "Completed" ? "selected" : ""
                  }`}
                  onClick={() => setFilter("Completed")}
                >
                  Completed
                </span>
                <span
                  className={`Filteroption ${
                    filter === "Inprogress" ? "selected" : ""
                  }`}
                  onClick={() => setFilter("Inprogress")}
                >
                  Inprogress
                </span>
                <span
                  className={`Filteroption ${
                    filter === "Upcoming" ? "selected" : ""
                  }`}
                  onClick={() => setFilter("Upcoming")}
                >
                  Upcoming
                </span>
              </div>
            </div>
            <div className="cardAssignment">
              {filteredAssignments.length > 0 &&
                Array.isArray(filteredAssignments) &&
                filteredAssignments.map((assignment, i) => (
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
                      info={`Topic: ${assignment.Topic}`}
                      col="#0082e6"
                    ></AssignmentCard>
                  </Link>
                ))}
              {Error !== "" && <p>{Error}</p>}
              {Error === "" && filteredAssignments.length === 0 && (
                <p>There are no assignments yet</p>
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
