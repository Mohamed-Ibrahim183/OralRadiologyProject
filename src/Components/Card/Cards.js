import React, { useEffect, useState } from "react";
import Card from "./Card";
import AssignmentsFile from "./assignments.json";

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

  return <>{content}</>;
};

export default Cards;
