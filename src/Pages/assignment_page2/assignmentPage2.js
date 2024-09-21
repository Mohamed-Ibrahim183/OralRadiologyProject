import React, { useState, useEffect, Navigate } from "react";
import CryptoJS from "crypto-js";
import {
  getAssignmentData,
  makeNewSubmission,
  uploadNewAssignmentImage,
} from "../../Slices/StudentSlice";
import {
  getSubmissionUserAssignment,
  getSubmissionUserAssignmentWeek,
} from "../../Slices/StudentSlice";
import AssignmentInfoSection from "./components/AssignmentInfoSection";
import "./assignmentPage2.css";
import CriteriaSection from "./components/CriteriaSection";
import TimeLeftSection from "./components/TimeLeftSection";
import CategoriesSection from "./components/CategoriesSection";
import Submissions from "./components/Submissions";

/////////////////////////////////////////////////////////////////////////
// Encrypt and decrypt functions
const SECRET_KEY = "Abo_el_Mana3eeeeeeeem343rfetvrfdncy54erncgfd";
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const AssignmentPage2 = ({ assignment }) => {
  // console.log(assignment);
  const [assignmentData, setAssignmentData] = useState(null);
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [state, setState] = useState("");
  const [update, setUpdate] = useState(0);

  const closeDate = assignmentData ? new Date(assignmentData.close) : null;
  const openDate = assignmentData ? new Date(assignmentData.open) : null;
  const assignmentId = assignmentData?.Id || "N/A";
  const studentId = sessionStorage.getItem("userId");
  const [submitted, setSubmitted] = useState(false);

  // Save assignment data to session storage in an encrypted way
  useEffect(() => {
    if (assignment) {
      const encryptedAssignment = encryptData(assignment);
      sessionStorage.setItem("AssignmentData", encryptedAssignment);
      setAssignmentData(assignment);
    }
  }, [assignment]);

  useEffect(() => {
    const encryptedAssignment = sessionStorage.getItem("AssignmentData");
    const savedState = sessionStorage.getItem("state");
    const isClosedStored = sessionStorage.getItem("isClosed") === "true";
    const submittedStored = sessionStorage.getItem("submitted") === "true";

    if (encryptedAssignment) {
      const decryptedAssignment = decryptData(encryptedAssignment);
      setAssignmentData(decryptedAssignment);
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

  useEffect(() => {
    if (!assignmentData) return;

    const timer = setInterval(() => {
      if (!submitted || state !== "submitted") {
        calculateTimeLeft();
        fetchSubmissionStatus();
        console.log("Ffffffff");
      }
    }, 3000);

    fetchAssignmentInfo();

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [assignmentData]);

  const fetchSubmissionStatus = async () => {
    try {
      const res = await getSubmissionUserAssignmentWeek({
        userId: sessionStorage.getItem("userId"),
        assignmentId: sessionStorage.getItem("assignmentId"),
        weekNum: assignmentData.week_num,
      });
      setSubmitted(res.msg);
      if (res.msg === true) {
        updateState("submitted");
        sessionStorage.setItem("state", "submitted");
      }
    } catch (err) {
      console.error("Error fetching assignment week submission:", err);
    }
  };

  const calculateTimeLeft = () => {
    if (!closeDate || !openDate) return;

    const now = new Date();

    if (now > closeDate) {
      const timePassed = (now - closeDate) / 1000;
      calculateRemainingTime(timePassed, true);
      if (!submitted) {
        updateState("closed");
      }
    } else if (now >= openDate && now <= closeDate) {
      const remainingTime = (closeDate - now) / 1000;
      calculateRemainingTime(remainingTime, false);
      if (!submitted) {
        updateState("inprogress");
      }
    } else if (now < openDate) {
      const timeToOpen = (openDate - now) / 1000;
      calculateRemainingTime(timeToOpen, false);
      if (!submitted) {
        updateState("upcoming");
      }
    }
  };

  const updateState = (newState) => {
    if (state !== newState || state !== "submitted" || !submitted) {
      setState(newState);
      sessionStorage.setItem("state", newState); // Update sessionStorage
    }
    if (newState === "submitted") {
      sessionStorage.setItem("submitted", "true");
      sessionStorage.setItem("state", "submitted");
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
      setCategories(res.msg.categories ? res.msg.categories : []);
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
      // Make a new submission
      const { msg: lastSubmission } = await makeNewSubmission({
        studentId,
        assignmentId,
        weekNum: assignmentData.week_num,
      });

      // Upload files
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

      // After successful submission, set the state to "submitted"
      updateState("submitted");
      sessionStorage.setItem("state", "submitted");

      sessionStorage.setItem("isClosed", true); // Store the isClosed state
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
        return {
          buttonLabel: "Submitted",
          isClosed: true,
        };
      default:
        return {
          buttonLabel: "Closed",
          isClosed: true,
          message: "Time since deadline",
        };
    }
  };

  const { buttonLabel, isClosed, message } = renderSubmissionState();
  /////////////////////////////////////////////////////////////////////////
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

          <CriteriaSection categories={categories} />
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
