import React, { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import {
    getAssignmentData,
    getSubmissionUserAssignment,
    makeNewSubmission,
    uploadNewAssignmentImage,
  } from "../../Slices/StudentSlice";
import './assignmentPage2.css';

const AssignmentPage2 = () => {
    const [assignmentInfo, setAssignmentInfo] = useState({});

    useEffect(() => {
        const fetchAssignmentInfo = async () => {
          const assignmentId = sessionStorage.getItem("assignmentId");
          if (!assignmentId) {
            console.error("Assignment ID is not set in session storage.");
            return;
          }
          await getAssignmentData({
            assignmentId: assignmentId,
          }).then((res) => setAssignmentInfo(res.msg));
        };
    
        fetchAssignmentInfo();
      }, []);
     //  console.log(assignmentInfo);
     if (sessionStorage["Type"] !== "Student") {
        return <Navigate to="/" />;
      }
  return (
    <div className="AssignmentPage2-container">
      <div className="assignment-header">
        <div className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
      </div>
      <h1 className="assignment-title">{assignmentInfo.Name}</h1>
      <p className="assignment-deadline">
        You have 3 days left to submit this assignment. After that, it will be marked as late.
      </p>

      <h2 className="assignment-section-title">Criteria</h2>
      <div className="assignment-criteria">
        <label className="criteria-item">
          <input type="checkbox" className="criteria-checkbox" disabled />
          <p className="criteria-text">Upload a photo of the Upper Interior</p>
        </label>
        <label className="criteria-item">
          <input type="checkbox" className="criteria-checkbox" disabled  />
          <p className="criteria-text">Upload a photo of the Lower Interior</p>
        </label>
      </div>

      <h2 className="assignment-section-title">Time Left</h2>
      <div className="time-left">
        <div className="time-unit">
          <div className="time-value">03</div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-unit">
          <div className="time-value">12</div>
          <div className="time-label">Hours</div>
        </div>
        <div className="time-unit">
          <div className="time-value">41</div>
          <div className="time-label">Minutes</div>
        </div>
      </div>

      <h2 className="assignment-section-title">Categories</h2>
      <div className="category-item">
        <div className="category-info">
          <p className="category-title">Upper Interior</p>
          <p className="category-deadline">Due in 3 days</p>
        </div>
        {/* <input type='file' ></input> */}
        <button className="upload-button">Upload</button>
      </div>
      <div className="category-item">
        <div className="category-info">
          <p className="category-title">Lower Interior</p>
          <p className="category-deadline">Due in 3 days</p>
        </div>
        {/* <input type='file' ></input> */}

        <button className="upload-button">Upload</button>
      </div>
      <div class="GradeContainer">
      <h2 className="assignment-section-title">Grade</h2>
      <p className="assignment-grade">Your grade: A</p>

      <h2 className="assignment-section-title">Doctor's Comment</h2>
      <p className="doctor-comment">
        Great job on your assignment! Your photos were clear and well-labeled. Keep up the good work.
      </p>
      </div>
      <div className="submit-section">
        <button className="submit-button">Submit All</button>
      </div>
    </div>
  );
};

export default AssignmentPage2;
