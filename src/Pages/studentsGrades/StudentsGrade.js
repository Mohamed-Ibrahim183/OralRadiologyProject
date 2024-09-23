import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllAssignmentsNames } from "../../Slices/PorfessorSlice";
import { mockDataTeam } from "./mockdata";
import "./StudentsGrade.css";

const StudentsGrade = () => {
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 40 },
    { field: "name", headerName: "Name", width: 140 },
  ]);
  const [rows, setRows] = useState([]);

  // Fetch assignments data and update columns
  useEffect(() => {
    const fetchAssignments = async () => {
      const storedUserId = sessionStorage.getItem("userId");
      if (!storedUserId) {
        console.error("UserId not found in sessionStorage");
        return;
      }
      try {
        const res = await getAllAssignmentsNames();
        const assignments = res.msg || [];
        updateColumns(assignments);
      } catch (error) {
        console.error("Failed to fetch assignments data", error);
      }
    };

    const updateColumns = (assignments) => {
      const assignmentColumns = assignments.map((assignment) => ({
        field: assignment.Id,
        headerName: assignment.Name,
        width: 125,
        headerAlign: "center",
        align: "center",
      }));
      setColumns((prevColumns) => [
        ...prevColumns.slice(0, 2),
        ...assignmentColumns,
      ]);
    };

    fetchAssignments();
  }, []);

  // Generate rows with student assignment data

  return "";
  // !!comment From MOHAMED uncomment those lines if you want to continue work in this page because those lines make error in teh project!!
  // <Box className="root">
  //   <Box className="grid-container">
  //     <DataGrid rows={mockDataTeam} columns={columns} autoHeight />
  //   </Box>
  // </Box>
};

export default StudentsGrade;
