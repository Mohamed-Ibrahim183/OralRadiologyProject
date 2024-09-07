import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import {
  getAssignmentData,
  getSubmissionUserAssignment,
  makeNewSubmission,
  uploadNewAssignmentImage,
} from "../../Slices/StudentSlice";
import { getAllCategoriesData } from "../../Slices/PorfessorSlice";

import "./assignmentPage2.css";

const AssignmentPage2 = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategoriesData();
      setCategories(res.msg);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAssignmentInfo = async () => {
      const assignmentId = sessionStorage.getItem("assignmentId");
      if (!assignmentId) {
        console.error("Assignment ID is not set in session storage.");
        return;
      }
      const res = await getAssignmentData({ assignmentId });
      setAssignmentInfo(res.msg);
    };
    fetchAssignmentInfo();
  }, []);

  const handleUpload = (event, categoryId, categoryName) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => {
        const existingIndex = prevFiles.findIndex(
          (fileObj) =>
            fileObj.categoryId === categoryId &&
            fileObj.categoryName === categoryName
        );
        const newFiles = [...prevFiles];
        if (existingIndex >= 0) {
          newFiles[existingIndex] = { file, categoryId, categoryName };
        } else {
          newFiles.push({ file, categoryId, categoryName });
        }
        return newFiles;
      });

      const categoryCriteria = document.querySelector(
        `#criteria${categoryId} input`
      );
      if (categoryCriteria) {
        categoryCriteria.checked = true;
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload files for all categories.");
    } else {
      // Submit All
    }
  };

  if (sessionStorage.getItem("Type") !== "Student") {
    return <Navigate to="/" />;
  }

  const remainingDays = sessionStorage.getItem("days") || 0;
  const remainingHours = sessionStorage.getItem("hours") || 0;
  const remainingMinutes = sessionStorage.getItem("minutes") || 0;
  const isClosed = sessionStorage.getItem("state").includes("closed");

  const getDeadlineMessage = () => {
    if (isClosed) {
      return "The deadline has passed. This assignment is now closed.";
    } else
      return (
        <>
          You have <strong>{remainingDays} days</strong>,{" "}
          <strong>{remainingHours} hours </strong>, and{" "}
          <strong>{remainingMinutes} minutes </strong> left to submit this
          assignment. After that, it will be <strong>Closed</strong>.
        </>
      );
  };

  return (
    <div className="AssignmentPage2-container">
      <div className="AssignmentPage2Wrapper">
        <section className="grade-section">
          <h2 className="assignment-section-title">Grade</h2>
          <p className="assignment-grade">Your grade: A</p>

          <h2 className="assignment-section-title">Doctor's Comment</h2>
          <p className="doctor-comment">
            Great job on your assignment! Your photos were clear and
            well-labeled. Keep up the good work.
          </p>
        </section>

        <h1 className="assignment-title">{assignmentInfo.Name}</h1>
        <span className="assignment-deadline">{getDeadlineMessage()}</span>

        <section className="criteria-section">
          <h2 className="assignment-section-title">Criteria</h2>
          <div className="assignment-criteria">
            {categories.map((cat) => (
              <label
                className="criteria-item"
                id={`criteria${cat.Id}`}
                key={cat.Id}
              >
                <input type="checkbox" className="criteria-checkbox" disabled />
                <p className="criteria-text">
                  Upload a photo of the {cat.Name}
                </p>
              </label>
            ))}
          </div>
        </section>

        <section className="time-left-section">
          <h2 className="assignment-section-title">
            Time Left
            {isClosed && <span className="closed-indicator"> CLOSED</span>}
          </h2>
          <div className="time-left">
            {["days", "hours", "minutes"].map((unit) => (
              <div className="time-unit" key={unit}>
                <div className="time-value">
                  {isClosed ? "0" : sessionStorage.getItem(unit)}
                </div>
                <div className="time-label">
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="categories-section">
          <h2 className="assignment-section-title">Categories</h2>
          {categories.map((cat) => (
            <div className="category-item" key={cat.Id}>
              <div className="category-info">
                <p className="category-title">{cat.Name}</p>
                <p className="category-deadline">
                  Due in {remainingDays} days, {remainingHours} hours,{" "}
                  {remainingMinutes} minutes
                </p>
              </div>
              <input
                type="file"
                id={`file-upload-${cat.Id}`}
                className="file-input"
                onChange={(event) => handleUpload(event, cat.Id, cat.Name)}
              />
              <button
                className="upload-button"
                onClick={() => {
                  if (!isClosed) {
                    document.getElementById(`file-upload-${cat.Id}`)?.click();
                  }
                }}
                style={{ backgroundColor: isClosed ? "red" : "" }}
                disabled={isClosed}
              >
                {isClosed ? "Closed" : "Upload"}
              </button>
            </div>
          ))}
        </section>

        <div className="submit-section">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isClosed}
            style={{ backgroundColor: isClosed ? "gray" : "#1980e6" }}
          >
            {isClosed ? "Closed" : "Submit All"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage2;
