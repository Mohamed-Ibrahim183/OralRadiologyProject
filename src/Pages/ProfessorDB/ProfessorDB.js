import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./ProfessorDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./professsor.css"
const ProfessorDB = () => {
  const [professorName, setProfessorName] = useState("");
  const [professorImage, setProfessorImage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setProfessorName(sessionStorage.getItem("Name")); // Changed sessionStorage["Name"] to sessionStorage.getItem("Name")
      setProfessorImage(
        "http://localhost/Projects/OralRadiology/" +
          sessionStorage.getItem("PersonalImage") // Changed sessionStorage["PersonalImage"] to sessionStorage.getItem("PersonalImage")
      );
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      </Modal> 
      <div className="fullProfessorPage">
        <div className="upppperr">
          <div className="container AssignmentSection">
            <div className="BBBBBB">
              <h2 className="sectionTitle">My Assignments</h2>
              <button className="" onClick={handleOpenModal}>Add Requirement</button> {/* Added onClick event handler */}
            </div>
            <div className="CARDSASSIGNMENT">
              <AssignmentCard
                name="Assignment 1"
                state="Visible"
                info="Topic Name, April 30, 2024, 1:00 pm"
                grade="60"
                col="lightgreen"
              ></AssignmentCard>
              <AssignmentCard
                name="Assignment 1"
                state="Hidden"
                info="Topic Name, April 30, 2024, 1:00 pm"
                grade="49"
                col="red"
                // col="#39444C"
              ></AssignmentCard>
              <AssignmentCard
                name="Assignment 1"
                state="Visible"
                info="Topic Name, April 30, 2024, 1:00 pm"
                grade="--"
                col="lightgreen"
              ></AssignmentCard>
              <AssignmentCard
                name="Assignment 1"
                state="Hidden"
                info="Topic Name, April 30, 2024, 1:00 pm"
                grade="--"
                col="red"
              ></AssignmentCard>
            </div>
            <h5 className="seeall">See all →</h5>
          </div>
          <div className="USERPROF">
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
            <button type="button" className="">
              Go To Profile
            </button>
          </div>
        </div>
        <div className="Loowwerr">
          <div className="cc1">
            <Chart className="chart1" />
          </div>
          <div className="Calenderrrr">
            <h2>Calendar</h2>
            <Calendar></Calendar>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessorDB;
