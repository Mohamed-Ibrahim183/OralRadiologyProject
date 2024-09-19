import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  getAssignmentData,
  makeNewSubmission,
  uploadNewAssignmentImage,
  getSubmissionUserAssignment,
} from "../../Slices/StudentSlice";
import "./assignmentPage2.css";
import AssignmentCard from "../StudentDashBoard/AssignmentCard";
import CriteriaSection from "./components/CriteriaSection";
import TimeLeftSection from "./components/TimeLeftSection";
import CategoriesSection from "./components/CategoriesSection";
import Submissions from "./components/Submissions";

const AssignmentPage2 = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [state, setState] = useState(""); // Manage state from open/close dates
  const [update, setUpdate] = useState(0);

  const closeDate = new Date(sessionStorage.getItem("closeDate"));
  const openDate = new Date(sessionStorage.getItem("openDate"));
  const assignmentId = sessionStorage.getItem("assignmentId");
  const studentId = sessionStorage.getItem("userId");

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    fetchAssignmentInfo();

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();

    if (now > closeDate) {
      const timePassed = (now - closeDate) / 1000;
      calculateRemainingTime(timePassed, true);
      updateState("closed");
    } else if (now >= openDate && now <= closeDate) {
      const remainingTime = (closeDate - now) / 1000;
      calculateRemainingTime(remainingTime, false);
      updateState("inprogress");
    } else if (now < openDate) {
      const timeToOpen = (openDate - now) / 1000;
      calculateRemainingTime(timeToOpen, false);
      updateState("upcoming");
    }
  };
  const updateState = (newState) => {
    if (state !== newState) {
      setState(newState);
      sessionStorage.setItem("state", newState); // Update sessionStorage when state changes
    }
  };

  const calculateRemainingTime = (time, isClosed) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    setTimeLeft({ days, hours, minutes, seconds });

    if (isClosed) {
      setTimeLeft((prevTime) => ({
        ...prevTime,
        days: -prevTime.days,
        hours: -prevTime.hours,
        minutes: -prevTime.minutes,
        seconds: -prevTime.seconds,
      }));
    }
  };

  const fetchAssignmentInfo = async () => {
    try {
      const res = await getAssignmentData({ assignmentId });
      setAssignmentInfo(res.msg);
      setCategories(
        Array.isArray(res.msg.categories) ? res.msg.categories : []
      );
    } catch (error) {
      console.error("Failed to fetch assignment data:", error);
    }
  };

  const handleFileUpload = (event, categoryId, categoryName) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        const existingFileIndex = prevFiles.findIndex(
          (fileObj) => fileObj.categoryId === categoryId
        );
        if (existingFileIndex >= 0) {
          updatedFiles[existingFileIndex] = { file, categoryId, categoryName };
        } else {
          updatedFiles.push({ file, categoryId, categoryName });
        }
        return updatedFiles;
      });

      document.querySelector(`#criteria${categoryId} input`).checked = true;
    }
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload files for all categories.");
      return;
    }

    try {
      const { msg: lastSubmission } = await makeNewSubmission({
        studentId,
        assignmentId,
      });

      await Promise.all(
        uploadedFiles.map((fileObj) =>
          uploadNewAssignmentImage({
            assignmentId,
            StudentId: studentId,
            file: fileObj.file,
            category: fileObj.categoryName,
            submission: lastSubmission,
          })
        )
      );

      alert("Files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  if (sessionStorage.getItem("Type") !== "Student") {
    return <Navigate to="/" />;
  }

  const renderSubmissionState = () => {
    switch (state) {
      case "inprogress":
        return { buttonLabel: "Upload", isClosed: false, message: "Time left" };
      case "upcoming":
        return {
          buttonLabel: "Upcoming",
          isClosed: true,
          message: "Time left until open",
        };
      case "submitted":
        return { buttonLabel: "Submitted", isClosed: true };
      default:
        return {
          buttonLabel: "Closed",
          isClosed: true,
          message: "Time since deadline",
        };
    }
  };

  const { buttonLabel, isClosed, message } = renderSubmissionState();

  return (
    <div className="AssignmentPage2-container">
      <div className="AssignmentPage2Wrapper">
        <section className="grade-section">
          <h2 className="assignment-section-title">Grade</h2>
          <p className="assignment-grade">Your grade: A</p>

          <h2 className="assignment-section-title">Doctor's Comment</h2>
          <p className="doctor-comment">
            Great job on your assignment! Keep up the good work.
          </p>
        </section>

        <h1 className="assignment-title">{assignmentInfo.Name}</h1>
        <span className="assignment-deadline">
          {isClosed
            ? message
            : `Time left: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
        </span>

        <CriteriaSection categories={categories} />
        <TimeLeftSection
          timeLeft={timeLeft}
          isClosed={isClosed}
          timeLeftMessage={message}
          state={state}
        />
        <CategoriesSection
          categories={categories}
          handleFileUpload={handleFileUpload}
          isClosed={isClosed}
          buttonLabel={buttonLabel}
        />
        <div className="submit-section">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isClosed}
          >
            {buttonLabel}
          </button>
        </div>
        <Submissions assignment={assignmentInfo} update={update} />
      </div>
    </div>
  );
};

export default AssignmentPage2;
