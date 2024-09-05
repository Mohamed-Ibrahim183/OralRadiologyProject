import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import AssignmentsFile from "./assignments.json";
import { useReactToPrint } from "react-to-print";
import "./image.css";

const Cards = ({ submissions }) => {
  const toPrint = useRef();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => setAssignments(Object.values(AssignmentsFile)), []);

  // const content = assignments.map((assignment, index) => (
  //   <Card
  //     // key={index}
  //     // Name={assignment.Name}
  //     // Features={assignment.Features}
  //     // images={assignment.images}
  //     // images2={assignment.images2}

  //   />
  // ));
  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
    documentTitle: "ALL Assignments Report 236671",
  });
  useEffect(() => {
    return () =>
      document.querySelectorAll("img").forEach(
        (e) =>
          (e.onclick = function () {
            e.parentElement.classList.toggle("popupImage");
          })
      );
  });
  return (
    <>
      <button
        style={{ backgroundColor: "#418C83" }}
        className="MainBtn print"
        onClick={handlePrint}
      >
        Print Report
      </button>
      <div className="Assignments" ref={toPrint}>
        {submissions.length > 0 &&
          Array.isArray(submissions) &&
          submissions.map((sub) => {
            return (
              <Card
                key={sub.Id}
                images={sub.images}
                assignmentName={sub.assignmentName}
                Features={{
                  submitTime: sub.submitTime,
                  Grade: `${sub.Grade["Total"]}/${sub.Grade["count"] * 10}`,
                  DoctorComment: sub.DoctorsNote,
                }}
                // DoctorsComment={sub.DoctorsNote}
                // submitTime={sub.submitTime}
                // Grade={`${sub.Grade["Total"]}/${sub.Grade["count"] * 100}`}
              />
            );
          })}
      </div>
    </>
  );
};

export default Cards;
