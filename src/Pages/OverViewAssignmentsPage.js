import Cards from "../Components/Card/Cards";
import React, { useEffect, useState } from "react";
import { axiosMethods } from "./Controller";

const OverViewAssignmentsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    new axiosMethods()
      .get("http://localhost/Projects/OralRadiology/AssignmentLogic.php", {
        Action: "GetSubmissionForUserReport",
        StudentId: sessionStorage.getItem("userId"),
      })
      .then((res) => {
        setSubmissions(res.msg);
        console.log(res.msg);
      });
  }, []);
  if (submissions) console.log(submissions);
  return (
    <>
      <Cards submissions={submissions} />
    </>
  );
};

export default OverViewAssignmentsPage;
