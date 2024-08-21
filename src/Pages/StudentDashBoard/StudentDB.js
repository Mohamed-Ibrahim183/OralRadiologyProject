import React, { useState, useEffect } from "react";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./student.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import UserProfile from "../../Components/UserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAssignmentsForUser,
  getSubmissionById,
} from "../../Slices/StudentSlice";

const StudentDB = () => {
  const studentName = sessionStorage["Name"] || "Student";
  const personalImage = sessionStorage["PersonalImage"];
  const UserId = sessionStorage["userId"];

  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortingType, setSortingType] = useState("Name");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [Error, setError] = useState("");

  useEffect(() => {
    getAssignmentsForUser({
      userId: UserId,
    }).then((res) =>
      res.msg["Err"] === 1
        ? setError("User is not in a Group. Please contact the Admin.")
        : setAssignments(res.msg)
    );
  }, [UserId]);

  useEffect(() => {
    getSubmissionById({
      userId: UserId,
    }).then((res) => {
      res.msg["Err"] === 1
        ? setError("User is not in a Group. Please contact the Admin.")
        : setSubmissions(res.msg);
    });
  }, [UserId]);

  useEffect(() => {
    const filterAndSortAssignments = () => {
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
            new Date(assignment.open) <= now &&
            new Date(assignment.close) >= now
        );
      } else if (filter === "Upcoming") {
        filtered = assignments.filter(
          (assignment) => new Date(assignment.open) > now
        );
      } else {
        filtered = assignments;
      }

      if (sortingType === "Name") {
        filtered.sort((a, b) => {
          if (a.Name < b.Name) return sortingOrder === "asc" ? -1 : 1;
          if (a.Name > b.Name) return sortingOrder === "asc" ? 1 : -1;
          return 0;
        });
      } else if (sortingType === "OpenDate") {
        filtered.sort((a, b) => {
          if (new Date(a.open) < new Date(b.open))
            return sortingOrder === "asc" ? -1 : 1;
          if (new Date(a.open) > new Date(b.open))
            return sortingOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      setFilteredAssignments(filtered);
    };
    filterAndSortAssignments();
  }, [assignments, filter, sortingType, sortingOrder]);

  const handleAssignmentClick = (assignmentId) => {
    sessionStorage.setItem("assignmentId", assignmentId);
  };

  const toggleSortingOrder = () => {
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  const getStatusProps = (assignment) => {
    const now = new Date();
    const openDate = new Date(assignment.open);
    const closeDate = new Date(assignment.close);

    if (openDate <= now && closeDate < now) {
      return { state: "closed", col: "red", remaining: 0 };
    } else if (openDate <= now && closeDate >= now) {
      let remainingTime = (closeDate - now) / 1000; // remaining time in seconds

      const days = Math.floor(remainingTime / (24 * 60 * 60));
      remainingTime %= 24 * 60 * 60;

      const hours = Math.floor(remainingTime / (60 * 60));
      remainingTime %= 60 * 60;

      const minutes = Math.floor(remainingTime / 60);
      const seconds = Math.floor(remainingTime % 60);

      let remaining;

      if (days > 0) {
        remaining = `${days} days`;
      } else if (hours > 0) {
        remaining = `${hours} hours, ${minutes} minutes`;
      } else if (minutes > 0) {
        remaining = `${minutes} minutes`;
      } else {
        remaining = `${seconds} seconds`;
      }

      return { state: "inprogress", col: "green", remaining };
    } else if (openDate > now) {
      return { state: "upcoming", col: "blue", remaining: null };
    }
    return { state: "unknown", col: "grey", remaining: null };
  };
  const putRemaininginSession = (assignment) => {
    const now = new Date();
    const openDate = new Date(assignment.open);
    const closeDate = new Date(assignment.close);
    if (openDate <= now && closeDate < now) {
      // Time since the task has closed
      let timeSinceClosed = (now - closeDate) / 1000; // time since closed in seconds

      const days = Math.floor(timeSinceClosed / (24 * 60 * 60));
      timeSinceClosed %= 24 * 60 * 60;

      const hours = Math.floor(timeSinceClosed / (60 * 60));
      timeSinceClosed %= 60 * 60;

      const minutes = Math.floor(timeSinceClosed / 60);
      const seconds = Math.floor(timeSinceClosed % 60);

      let closedTime;

      if (days > 0) {
        closedTime = `closed from ${days} days`;
      } else if (hours > 0) {
        closedTime = `closed from ${hours} hours, ${minutes} minutes`;
      } else if (minutes > 0) {
        closedTime = `closed from ${minutes} minutes`;
      } else {
        closedTime = `closed from ${seconds} seconds`;
      }

      sessionStorage.setItem("RemainingTime", closedTime);
    } else if (openDate <= now && closeDate > now) {
      let remainingTime = (closeDate - now) / 1000; // remaining time in seconds

      const days = Math.floor(remainingTime / (24 * 60 * 60));
      remainingTime %= 24 * 60 * 60;

      const hours = Math.floor(remainingTime / (60 * 60));
      remainingTime %= 60 * 60;

      const minutes = Math.floor(remainingTime / 60);
      const seconds = Math.floor(remainingTime % 60);

      let remaining;

      if (days > 0) {
        remaining = `${days} days`;
      } else if (hours > 0) {
        remaining = `${hours} hours, ${minutes} minutes`;
      } else if (minutes > 0) {
        remaining = `${minutes} minutes`;
      } else {
        remaining = `${seconds} seconds`;
      }
      sessionStorage.setItem("RemainingTime", remaining);
    } else {
      sessionStorage.setItem("RemainingTime", "Task is not yet due");
    }
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
              <div className="FilterandSorting">
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
                    Closed
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
                <div className="sortingOptions">
                  <FontAwesomeIcon
                    icon={
                      sortingType === "Name" && sortingOrder === "asc"
                        ? faSortAlphaDown
                        : faSortAlphaUp
                    }
                    className={`sortingOption ${
                      sortingType === "Name" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSortingType("Name");
                      toggleSortingOrder();
                    }}
                  />
                  <FontAwesomeIcon
                    icon={
                      sortingType === "OpenDate" && sortingOrder === "asc"
                        ? faSortNumericDown
                        : faSortNumericUp
                    }
                    className={`sortingOption ${
                      sortingType === "OpenDate" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSortingType("OpenDate");
                      toggleSortingOrder();
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="cardAssignment">
              {filteredAssignments.length > 0 &&
                Array.isArray(filteredAssignments) &&
                filteredAssignments.map((assignment, i) => {
                  const { state, col, remaining } = getStatusProps(assignment);
                  return (
                    <Link
                      key={i}
                      to={{
                        pathname: "/student/submit",
                        search: `?userId=${UserId}&assignmentId=${assignment.Id}`,
                      }}
                      onClick={() => {
                        handleAssignmentClick(assignment.Id);
                        sessionStorage.setItem("state", state);
                        putRemaininginSession(assignment);
                      }}
                    >
                      <AssignmentCard
                        name={assignment.Name}
                        info={`Topic: ${assignment.Topic}`}
                        col={col}
                        state={state}
                        remaining={remaining ? `${remaining}  remaining` : ""}
                      ></AssignmentCard>
                    </Link>
                  );
                })}
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
