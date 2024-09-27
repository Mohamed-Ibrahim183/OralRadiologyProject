import React, { useEffect, useState } from "react";
import "./Submissions.css";
import { getSubmissionUserAssignment } from "../../../Slices/StudentSlice";
import { getSession } from "../../Controller";

const Submissions = ({ assignment, update }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await getSubmissionUserAssignment({
        userId: getSession("userId"),
        assignmentId: getSession("assignmentId"),
      });
      setSubmissions(res.msg);
      console.log(res.msg);
    };

    fetchSubmissions();
  }, [update]);

  return (
    <div className="Submissions-section">
      {submissions.length > 0 ? (
        <div className="submissions-container">
          <h2 className="assignment-section-title">Submissions Grade</h2>

          {Array.isArray(submissions) &&
            submissions.map((sub, index) => (
              <div className="submission-item" key={index}>
                <div className="upperPart">
                  <div className="submission-name">
                    {assignment?.Name || "Assignment Name"}
                  </div>
                  <div className="submission-grade">
                    <span>Grade:</span> {sub.Grade?.Total || 0} /{" "}
                    {(sub.Grade?.count || 1) * 10}
                  </div>
                </div>
                <div className="lowerPart">
                  <div className="weekNum">Submission week: {sub.weekNum}</div>
                  <div className="submission-date">
                    submitted on: <b>{sub.submitTime}</b>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No submissions available</p>
      )}
    </div>
  );
};

export default Submissions;
