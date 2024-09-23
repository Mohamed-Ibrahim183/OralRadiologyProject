import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  getAssignmentData,
  makeNewSubmission,
  uploadNewAssignmentImage,
  getSubmittedAssignmentCategories,
  getSubmissionUserAssignmentWeek,
} from "../../Slices/StudentSlice";
import AssignmentInfoSection from "./components/AssignmentInfoSection";
import CriteriaSection from "./components/CriteriaSection";
import TimeLeftSection from "./components/TimeLeftSection";
import CategoriesSection from "./components/CategoriesSection";
import Submissions from "./components/Submissions";
import "./assignmentPage2.css";
import { decryptData, encryptData } from "../Controller";

const AssignmentPage2 = ({ assignment }) => {
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [submittedCategories, setSubmittedCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [update, setUpdate] = useState(0);

  const studentId = sessionStorage.getItem("userId");
  const closeDate = assignmentData ? new Date(assignmentData.close) : null;
  const openDate = assignmentData ? new Date(assignmentData.open) : null;
  const assignmentId = assignmentData?.Id || "N/A";

  // Store assignment data securely in session storage

  useEffect(() => {
    if (assignment) {
      const encryptedAssignment = encryptData(assignment);
      sessionStorage.setItem("AssignmentData", encryptedAssignment);
      setAssignmentData(assignment);
    }
    return () => sessionStorage.removeItem("AssignmentData");
  }, [assignment]);

  // Load encrypted data and states from session storage
  useEffect(() => {
    const encryptedAssignment = sessionStorage.getItem("AssignmentData");
    const savedState = sessionStorage.getItem("state");
    const isClosedStored = sessionStorage.getItem("isClosed") === "true";
    const submittedStored = sessionStorage.getItem("submitted") === "true";

    if (encryptedAssignment) {
      setAssignmentData(decryptData(encryptedAssignment));
    }
    if (savedState) {
      setState(savedState);
    }
    if (submittedStored) {
      setSubmitted(true);
    }
    if (isClosedStored) {
      setUpdate((prev) => prev + 1);
    }
  }, []);

  // Periodically check for submission status and assignment info
  useEffect(() => {
    if (!assignmentData) return;

    const timer = setInterval(() => {
      if (!submitted || state !== "submitted") {
        calculateTimeLeft();
        fetchSubmissionStatus();
      } else {
        fetchSubmittedCategories();
      }
    }, 3000);

    fetchAssignmentInfo();
    fetchSubmittedCategories();

    return () => clearInterval(timer);
  }, [assignmentData, submitted, state]);

  // Fetch submission status for the current assignment week
  const fetchSubmissionStatus = async () => {
    try {
      const res = await getSubmissionUserAssignmentWeek({
        userId: studentId,
        assignmentId,
        weekNum: assignmentData.week_num,
      });
      setSubmitted(res.msg);
      if (res.msg) {
        updateState("submitted");
      }
    } catch (err) {
      console.error("Error fetching submission status:", err);
    }
  };
  // Fetch categories that the user has already submitted for this assignment
  const fetchSubmittedCategories = async () => {
    try {
      const res = await getSubmittedAssignmentCategories({
        userId: studentId,
        assignmentId,
        weekNum: assignmentData.week_num,
      });
      setSubmittedCategories(res.msg);
      for (let i = 0; i < res.msg.length; i++) {
        if (document.querySelector(`#criteria${res.msg[i]}`)) {
          document.querySelector(`#criteria${res.msg[i]} input`).checked = true;
        }
      }
    } catch (err) {
      console.error("Error fetching submitted categories:", err);
    }
  };
  // Calculate remaining time until close or open
  const calculateTimeLeft = () => {
    const now = new Date();

    if (now > closeDate) {
      calculateRemainingTime((now - closeDate) / 1000, true);
      if (!submitted) {
        updateState("closed");
      }
    } else if (now >= openDate && now <= closeDate) {
      calculateRemainingTime((closeDate - now) / 1000, false);
      if (!submitted) {
        updateState("inprogress");
      }
    } else if (now < openDate) {
      calculateRemainingTime((openDate - now) / 1000, false);
      if (!submitted) {
        updateState("upcoming");
      }
    }
  };

  // Helper to update state and session storage based on submission status
  const updateState = (newState) => {
    if (state !== newState || (state !== "submitted" && !submitted)) {
      setState(newState);
      sessionStorage.setItem("state", newState);
      if (newState === "submitted") {
        sessionStorage.setItem("submitted", "true");
      }
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
      setCategories(res.msg.categories || []);
    } catch (error) {
      console.error("Failed to fetch assignment info:", error);
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
        weekNum: assignmentData.week_num,
      });

      await Promise.all(
        uploadedFiles.map((fileObj) =>
          uploadNewAssignmentImage({
            assignmentId,
            StudentId: studentId,
            file: fileObj.file,
            category: fileObj.categoryName,
            submission: lastSubmission,
            weekNum: assignmentData.week_num,
          })
        )
      );

      updateState("submitted");
      sessionStorage.setItem("isClosed", true);
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
      {assignmentData ? (
        <div className="AssignmentPage2Wrapper">
          <AssignmentInfoSection
            timeLeft={timeLeft}
            isClosed={isClosed}
            message={message}
            assignmentInfo={assignmentInfo}
          />
          <CriteriaSection
            categories={categories}
            submittedCategories={submittedCategories}
          />
          {!submitted && (
            <TimeLeftSection
              timeLeft={timeLeft}
              isClosed={isClosed}
              timeLeftMessage={message}
              state={state}
            />
          )}
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
      ) : (
        <p>Loading assignment data...</p>
      )}
    </div>
  );
};

export default AssignmentPage2;
