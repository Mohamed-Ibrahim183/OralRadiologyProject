import React from "react";
import "./ProfessorDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ProfessorDB = () => {
  return (
    <>
      <Navbar />
      <div className="fullProfessorPage">
        <div className="upppperr">
            <div className="container AssignmentSection">
              <div className="BBBBBB">
                  <h2 className="sectionTitle">My Assignments</h2>
                  <button className="" >Add Requirement</button>
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
              <h4>Welcome Back</h4>
              <h2>Dr. Abdelmonem Hatem</h2>
              <p>Welcome to our Oral Radiology system</p>
              </div>
              <button type="button" className="">Go To Profile</button>
            </div>
        </div>
        <div className="Loowwerr">
            <div className="cc1" >
            <Chart className="chart1" />
            </div>
            <div className="Calenderrrr">
            {/* <Calendarr year={2024} month={4} />  */}
            <h2>Calendar</h2>
            <Calendar ></Calendar>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProfessorDB;
