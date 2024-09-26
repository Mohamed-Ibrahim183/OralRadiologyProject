import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx"; // Import xlsx for Excel export
import {
  getAllAssignmentsNames,
  getGradesRows,
} from "../../Slices/PorfessorSlice";
import "./StudentsGrade.css";
//xsazszmnnn,mbv nmvbn
const StudentsGrade = () => {
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", flex: 0.5 }, // Use flex for auto-width
    { field: "name", headerName: "Name", flex: 1 },
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
        field: assignment.Id.toString(), // Ensure the field matches the assignmentId
        headerName: assignment.Name,
        flex: 1, // Auto-adjust width based on available space
        headerAlign: "center",
        align: "center",
      }));
      setColumns((prevColumns) => [
        ...prevColumns.slice(0, 2), // Keep only MSAId and Name, then add assignment columns
        ...assignmentColumns,
      ]);
    };

    fetchAssignments();
  }, []);

  // Generate rows with student assignment data
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await getGradesRows();
        const processedRows = res.msg.map((student) => {
          const row = {
            id: student.MSAId, // Use MSAId for the id field
            name: student.Name,
          };
          student.Grades.forEach((grade) => {
            row[grade.assignmentId] = grade.Total.toFixed(2); // Add the percentage to the correct assignment column
          });
          return row;
        });
        setRows(processedRows);
      } catch (error) {
        console.error("Failed to fetch assignments data", error);
      }
    };

    fetchRows();
  }, []);

  // Export to Excel function
  const exportToExcel = () => {
    const assignmentNames = columns.slice(2).map((column) => column.headerName); // Get assignment names from columns
    const assignmentIds = columns.slice(2).map((column) => column.field); // Get corresponding assignment IDs

    const formattedRows = rows.map(({ id, name, ...grades }) => {
      const formattedRow = { id, name }; // Start with id and name
      // Populate grades using assignment IDs
      assignmentIds.forEach((assignmentId, index) => {
        const assignmentName = assignmentNames[index];
        formattedRow[assignmentName] = grades[assignmentId]
          ? grades[assignmentId]
          : ""; // Use assignment name as key, default to empty string if not available
      });
      return formattedRow;
    });

    // Create a worksheet from the formatted rows
    const worksheet = XLSX.utils.json_to_sheet(formattedRows, {
      header: ["id", "name", ...assignmentNames], // Set the header to ID, Name, and assignment names
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, "Final_grades.xlsx");
  };

  return (
    <Box className="root">
      <Box className="grid-container">
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        style={{ marginTop: "20px" }}
      >
        Export to Excel
      </Button>
    </Box>
  );
};

export default StudentsGrade;
