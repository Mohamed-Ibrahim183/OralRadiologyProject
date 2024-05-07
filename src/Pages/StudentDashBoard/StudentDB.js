import React, { useState, useEffect } from "react";
import "./StudentDB.css";
import Navbar from "../../Components/Navbar/Navbar";
import AssignmentCard from "./AssignmentCard";
import Chart from "./Chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./studentttt.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const StudentDB = () => {
  const [studentName, setStudentName] = useState("");
  const [personalImage, setPersonalImage] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [UserId, setUserId] = useState();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
      setStudentName(sessionStorage["Name"]);
      setPersonalImage(
        "http://localhost/Projects/OralRadiology/" +
          sessionStorage["PersonalImage"]
      );
    }
    
    async function fetchAssignments() {
      try {
        const response = await axios.get('http://localhost/Projects/OralRadiology/getassignments.php');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    }

    fetchAssignments(); // Call the fetchAssignments function here
  }, []);
  const [assignmentId, setAssignmentId] = useState('');

  const handleAssignmentClick = (assignmentId) => {
    setAssignmentId(assignmentId);
    sessionStorage.setItem('assignmentId', assignmentId);  // Change this to 'assignmentId' to match your PHP
  };
  
  
  
  return (
    <>
      <Navbar />
      <div className="fullPage">
        <div className="upppperr">
          <div className="container AssignmentSection">
            <div className="BBBBBB">
              <h2 className="sectionTitle">My Assignments</h2>
              <h5 className="seeall">See all →</h5>
            </div>
            <div className="CARDSASSIGNMENT">
              {/* <AssignmentCard
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
              <AssignmentCard
                name="Assignment 1"
                state="not Graded"
                info="Topic Name, April 30, 2024, 1:00 pm"
                grade="--"
                col="green"
              ></AssignmentCard> */}
            {assignments.map((assignment, i)=> (
              <Link to={{ pathname: "/submit", search: `?userId=${UserId}?assignmentId=${assignment.Id}` }}
                  onClick={() => handleAssignmentClick(assignment.Id)}>
                  <AssignmentCard 
                      name={assignment.Name}
                      state="Good"
                      info={`${assignment.Topic}, April 30, 2024, 1:00 pm`}
                      grade="60"
                      col="#0082e6">
                  </AssignmentCard>
              </Link>


            ))}
            </div>
          </div>
          <div className="USERPROF">
            <div className="TEXT">
              <div className="Profilephoto">
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
            {/* <Calendarr year={2024} month={4} />  */}
            <h2>Calendar</h2>
            <Calendar></Calendar>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDB;
