import React, { useState } from "react";
import image from "./Dental_Xray.jpg";
import "./assignmentpage.css";
import Navbar from "../../Components/Navbar/Navbar";
// Header component
const Header = () => {
  return (
    <div className="header">
      <img src={image} alt="Teeth image" className="xray_iamge" />
      <p>The Maximum limit of photos is 5</p>
      <br />
      <p>The Grade of The Assignment Will Appear Here Once Evaluated</p>
    </div>
  );
};
// Assignment info component
const AssignmentInfo = () => {
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = files.concat(selectedFiles).slice(0, 5);
    setFiles(newFiles);
  };
  const deleteFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };
  const deleteLastFile = () => {
    if (files.length > 0) {
      setFiles(files.slice(0, files.length - 1));
    }
  };
  return (
    <>
      <div className="assignment-info">
        <h2 className="assignment-submission-text">ASSIGNMENT SUBMISSION</h2>

        <label htmlFor="submission-status">SUBMISSION STATUS</label>
        <input type="text" id="submission-status" disabled />

        <label htmlFor="grading-status">GRADING STATUS</label>
        <input type="text" id="grading-status" disabled />

        <label htmlFor="time-remaining">TIME REMAINING</label>
        <input type="text" id="time-remaining" disabled />

        <label htmlFor="file-upload">UPLOAD FILM</label>
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileChange}
        />
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              {file.name}{" "}
              <button onClick={() => deleteFile(index)}>Delete</button>
            </li>
          ))}
        </ul>

        <button className="button btnA" type="button" onClick={deleteLastFile}>
          DELETE
        </button>
        <button className="button btnB" type="button">
          CONFIRM
        </button>
      </div>
    </>
  );
};

// Feedback component
const Feedback = () => {
  return (
    <div className="feedback">
      <h3>FEEDBACK</h3>
      <label htmlFor="grade">GRADE</label>
      <input type="text" id="grade" disabled />

      <label htmlFor="grade-on">GRADE ON</label>
      <input type="text" id="grade-on" disabled />

      <label htmlFor="grade-by">GRADE BY</label>
      <input type="text" id="grade-by" disabled />
    </div>
  );
};
// Assignment Submission component
const AssignmentSubmission = () => {
  return (
    <>
      <Navbar />
      <div className="container monemm">
        <div className="monem">
          <h2 className="assignment-submission-text2">ASSIGNMENT SUBMISSION</h2>
          <Header />
          <AssignmentInfo />
        </div>
        <Feedback />
      </div>
    </>
  );
};
export default AssignmentSubmission;
