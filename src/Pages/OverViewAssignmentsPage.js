import Cards from "../Components/Card/Cards";
import React, { useEffect, useState } from "react";
import { getSubmissionForUserReport } from "../Slices/StudentSlice";
import { getSession } from "./Controller";

const OverViewAssignmentsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    getSubmissionForUserReport(getSession("userId")).then((res) => {
      setSubmissions(res.msg);
      console.table(res.msg);
    });
  }, []);

  return (
    <>
      <Cards submissions={submissions} />
    </>
  );
};

export default OverViewAssignmentsPage;
