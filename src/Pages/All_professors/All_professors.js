import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import monem from "./Professors.json";
import Navbar from "../../Components/Navbar/Navbar";
import "./AllProfessorPage.css";
import NavAdmin from "../../Components/AdminNav2/NavAdmin";
function ProfessorTable() {
  return (
    <>
      <Navbar />
      <div className="MainPage">
        <NavAdmin />
        <div className="monem_admin adminHomeSection">
          <div className="oooo">
            <h2>All Professors</h2>
            <button className="addbutton">+ Add New</button>
          </div>
          <hr></hr>
          <label htmlFor="searchh" id="searchhh">
            Search:{" "}
          </label>
          <input type="search" id="searchh"></input>
          <div className="table-responsive">
            <table className="table">
              <TableHeader />
              {monem.map((record) => (
                <TableRow key={record.id} record={record} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfessorTable;
