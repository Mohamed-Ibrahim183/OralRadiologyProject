import React from "react";
import image from "./imgs/Dental_Xray.jpg";
import "./submitAss.css";

const AssignmentSubmission = () => {
  return (
    <div className="container AssignmentSubmission">
      <h2 className="assignment-submission-text2">ASSIGNMENT SUBMISSION</h2>
      <div className="monem">
        <div className="header">
          <img src={image} alt="TeethImage" className="xray_iamge" />
          <p>The Maximum limit of photos is 5</p>
          <br />
          <p>The Grade of The Assignment Will Appear Here Once Evaluated</p>
        </div>
        <div className="assignment-info">
          <h2 className="assignment-submission-text">ASSIGNMENT SUBMISSION</h2>

          <label htmlFor="submission-status">SUBMISSION STATUS</label>
          <input type="text" id="submission-status" disabled />

          <label htmlFor="grading-status">GRADING STATUS</label>
          <input type="text" id="grading-status" disabled />

          <label htmlFor="time-remaining">TIME REMAINING</label>
          <input type="text" id="time-remaining" disabled />

          <label htmlFor="file-upload">UPLOAD FILM</label>
          <input type="file" id="file-upload" />
          <button className="button btnA" type="button">
            DELETE
          </button>
          <button className="button btnB" type="button">
            CONFIRM
          </button>
        </div>
      </div>

      <div className="feedback">
        <h3>FEEDBACK</h3>
        <label htmlFor="grade">GRADE</label>
        <input type="text" id="grade" disabled />

        <label htmlFor="grade-on">GRADE ON</label>
        <input type="text" id="grade-on" disabled />

        <label htmlFor="grade-by">GRADE BY</label>
        <input type="text" id="grade-by" disabled />
      </div>
    </div>
  );
};

export default AssignmentSubmission;
