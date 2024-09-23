import Cards from "../Components/Card/Cards";
import React, { useEffect, useState } from "react";
// import { axiosMethods } from "./Controller";
import { getSubmissionForUserReport } from "../Slices/StudentSlice";

const OverViewAssignmentsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    getSubmissionForUserReport(sessionStorage.getItem("userId")).then((res) => {
      setSubmissions(res.msg);
      // console.log(res.msg);
      console.log("res.msg:", res.msg);
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
