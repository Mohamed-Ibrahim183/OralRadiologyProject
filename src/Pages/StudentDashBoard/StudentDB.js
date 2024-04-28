import React from "react";
import "./StudentDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
const StudentDB = () => {
  return (
    <>
      <Navbar />
      <div className="fullPage">
        <div className="container AssignmentSection">
          <h2 className="sectionTitle">My Assignments</h2>
          <AssignmentCard
            name="Assignment 1"
            state="Good"
            info="Topic Name, April 30, 2024, 1:00 pm"
            grade="60"
            col="#0082e6"
          ></AssignmentCard>
          <AssignmentCard
            name="Assignment 1"
            state="Fail"
            info="Topic Name, April 30, 2024, 1:00 pm"
            grade="49"
            col="red"
            // col="#39444C"
          ></AssignmentCard>
          <AssignmentCard
            name="Assignment 1"
            state="not Graded"
            info="Topic Name, April 30, 2024, 1:00 pm"
            grade="--"
            col="#FFD269"
          ></AssignmentCard>
        </div>
        <Chart className="chart1" />
      </div>
    </>
  );
};

export default StudentDB;
