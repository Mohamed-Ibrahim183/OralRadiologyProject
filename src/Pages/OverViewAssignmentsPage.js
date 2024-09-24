import Cards from "../Components/Card/Cards";
import React, { useEffect, useState } from "react";
// import { axiosMethods } from "./Controller";
import { getSubmissionForUserReport } from "../Slices/StudentSlice";
import { decryptData, getSession } from "./Controller";

const OverViewAssignmentsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    // getSubmissionForUserReport(decryptData(sessionStorage.getItem("userId"))).then((res) => {
    getSubmissionForUserReport(getSession("userId")).then((res) => {
      setSubmissions(res.msg);
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
