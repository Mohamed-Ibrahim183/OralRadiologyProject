import React from "react";
import "./StudentDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendarr from "./Calender";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const StudentDB = () => {
  return (
    <>
      <Navbar />
      <div className="fullPage">
        <div className="upppperr">
        <div className="container AssignmentSection">
          <h2 className="sectionTitle">My Assignments</h2>
          <h5 className="seeall">See all</h5>
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
        <div className="USERPROF">
          <div className="TEXT">
          <h4>Welcome Back</h4>
          <h2>Abdelmonem Hatem</h2>
          <p>Welcome to our Oral Radiology system</p>
          </div>
          <button type="button" className="">Go To Profile</button>
        </div>
        </div>
        <div className="cc1" >
        <Chart className="chart1" />
        </div>
        <div className="Calenderrrr">
        {/* <Calendarr year={2024} month={4} />  */}
        <h2>Calendar</h2>
        <Calendar ></Calendar>
        </div>
      </div>
    </>
  );
};

export default StudentDB;
