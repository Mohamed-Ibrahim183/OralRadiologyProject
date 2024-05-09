import React from "react";
//import "./Grading_Page.css";
import "./Grading.css";
import TableHeader_grading_page from "./TableHeader_grading_page";
import TableRow_Grading_Page from "./TableRow_Grading_Page";
import monem from "./Grading_Page.json";
import Navbar from "../../Components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
function GradingPage() {
  if (sessionStorage["Type"] !== "Professor") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar />
      <div className="monem2_admin">
        <h1>Assignment 1</h1>
        <hr></hr>
        <div>
          <div className="oooo">
            <h2>Submissions</h2>
          </div>
          <div className="right">
            <button type="submit">Download Report</button>
          </div>
        </div>
        <label htmlFor="searchh" id="searchhh">
          Search:{" "}
        </label>
        <input type="search" id="searchh"></input>
        <div className="table-responsive">
          <table className="table">
            <TableHeader_grading_page />
            {monem.map((record) => (
              <TableRow_Grading_Page key={record.id} record={record} />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
export default GradingPage;
