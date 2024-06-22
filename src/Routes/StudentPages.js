import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import OverViewAssignmentsPage from "../Pages/OverViewAssignmentsPage";
import AssignmentSubmission from "../Pages/assignment_page/Assignment_submission_page";
import Dashboard from "../Pages/Dashboard";

function StudentPages() {
  return (
    <Routes>
      <Route
        path="submit"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AssignmentSubmission />
          </Suspense>
        }
      />
      <Route
        path="Assignments"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <OverViewAssignmentsPage />
          </Suspense>
        }
      />
      <Route
        path="Dashboard"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default StudentPages;
