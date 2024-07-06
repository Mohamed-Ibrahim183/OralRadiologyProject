import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import AssignmentsFile from "./assignments.json";
import { useReactToPrint } from "react-to-print";
// import any from "../../Pages/AddProf/Dental_Xray-removebg-preview.jpg";
import "./image.css";
// import DarkMode from "./DarkMode/DarkMode";

const Cards = () => {
  const toPrint = useRef();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => setAssignments(Object.values(AssignmentsFile)), []);

  const content = assignments.map((assignment, index) => (
    <Card
      key={index}
      Name={assignment.Name}
      Features={assignment.Features}
      images={assignment.images}
      images2={assignment.images2}
    />
  ));
  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
    documentTitle: "ALL Assignments Report 236671",
  });
  useEffect(() => {
    return () =>
      document.querySelectorAll("img").forEach(
        (e) =>
          (e.onclick = function () {
            // console.log(e.parentElement);
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
        {content}
      </div>
    </>
  );
};

export default Cards;
