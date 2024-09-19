import React from "react";
import { useEffect, useState } from "react";
import AssignmentCard from "../../StudentDashBoard/AssignmentCard";
import { getSubmissionUserAssignment } from "../../../Slices/StudentSlice";
import "./Submissions.css";
const Submissions = ({ assignment, update }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await getSubmissionUserAssignment({
        userId: sessionStorage.getItem("userId"),
        assignmentId: sessionStorage.getItem("assignmentId"),
      });
      setSubmissions(res.msg);
    };

    fetchSubmissions();
  }, [update]);

  return (
    <div className="Submissions-section">
      {submissions.map((sub) => (
        // <AssignmentCard
        //   key={`${sub.Id}${sub.studentId}${sub.assignmentId}${sub.submitTime}`}
        //   name={assignment.Name || "Assignment Name"}
        //   grade={
        //     `${sub.Grade["Total"]} / ${sub.Grade["count"] * 10}` || "Grade"
        //   }
        //   info={`Topic: ${assignment.Topic} | SubmitTime: ${sub.submitTime}`}
        //   col="#0082e6"
        // />
        <></>
      ))}
      {submissions.length > 0 && (
        <div className="submissions-container">
          <h2 className="assignment-section-title">Submissions Grade</h2>
          {submissions.map((sub, index) => (
            <div className="submission-item" key={index}>
              <div className="upperPart">
                <div className="submission-name">{assignment.Name}</div>
                <div className="submission-grade">
                  <span>Grade:</span> {sub.Grade["Total"]} /{" "}
                  {sub.Grade["count"] * 10}
                </div>
              </div>
              <div className="lowerPart">
                {" "}
                <div className="submission-date">
                  submitted on: <b>{sub.submitTime}</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Submissions;
