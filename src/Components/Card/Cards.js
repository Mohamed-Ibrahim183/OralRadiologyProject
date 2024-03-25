import React, { useEffect, useState } from "react";
import Card from "./Card";
import AssignmentsFile from "./assignments.json";
// import DarkMode from "./DarkMode/DarkMode";

const Cards = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => setAssignments(Object.values(AssignmentsFile)), []);

  const content = assignments.map((assignment, index) => (
    <Card
      key={index}
      Name={assignment.Name}
      Features={assignment.Features}
      images={assignment.images}
    />
  ));
  // /////////////////////
  // const setDarkMode = () => {
  //   document.querySelector("body").setAttribute("Theme", "Dark");
  //   localStorage.setItem("Theme", "Dark");
  // };
  // const setLightMode = () => {
  //   document.querySelector("body").setAttribute("Theme", "Light");
  //   localStorage.setItem("Theme", "Light");
  // };
  // /////////////////////

  return (
    <div className="Assignments ">
      {/* <button className="ToggleDarkMode">Toggle Dark Mode</button> */}
      {/* <DarkMode /> */}
      {content}
    </div>
  );
};

export default Cards;
