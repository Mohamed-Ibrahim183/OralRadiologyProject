import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ProfessorDB.css";
import "./professor.css";
import { Link, Navigate } from "react-router-dom"; 
import Modal2 from "./Modal2"; 
import axios from "axios";

const ProfessorDB = () => {
  const professorName = sessionStorage.getItem("Name") || "Professor";
  const professorImage = sessionStorage.getItem("PersonalImage");
  const storedUserId = sessionStorage.getItem("userId");

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [userId, setUserId] = useState(storedUserId);

  useEffect(() => {
    if (!storedUserId) {
      console.error("UserId not found in sessionStorage");
    } else {
      setUserId(storedUserId);
    }
    axios
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php/GetAll")
      .then((res) => {
        console.log(res.data);
        setAssignments(res.data);
      })
      .catch((error) => console.error(error));
  }, [storedUserId]);

  if (sessionStorage.getItem("Type") !== "Professor") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}></Modal>
      <Modal2 open={isModal2Open} onClose={() => setModal2Open(false)} />
      <div className="fullProfessorPage">
        <div className="upper">
          <div className="container AssignmentSection">
            <div className="BBBBBB">
              <h2 className="sectionTitle">My Assignments</h2>
              <button onClick={() => setModalOpen(true)}>
                Add Requirement
              </button>
            </div>
            <div className="cardAssignment">
              {assignments.map((assignment, i) => (
                <AssignmentCard
                  key={i}
                  userId={userId}
                  assignmentId={assignment.Id}
                  name={assignment.Name}
                  info={`${assignment.Topic}, April 30, 2024, 1:00 pm`}
                  toPage={`/Grading_Page?userId=${userId}&assignmentId=${assignment.Id}`}
                />
              ))}
            </div>
            <h5 className="seal">See all →</h5>
          </div>
          <div className="userProfile">
            <div className="TEXT">
              <img
                src={professorImage}
                alt="Professor Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "20px",
                  marginTop: "-20px",
                  marginBottom: "20px",
                }}
              />

              <h4>Welcome Back</h4>
              <h2>Dr. {professorName}</h2>
              <p>Welcome to our Oral Radiology system</p>
            </div>
            <Link to="/Profile" className="ProfileButton stdBtn">
              Go To Profile
            </Link>
          </div>
        </div>
        <div className="lower">
          <div className="cc1">
            <Chart className="chart1" />
          </div>
          <div className="calender">
            <h2>Calendar</h2>
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessorDB;
