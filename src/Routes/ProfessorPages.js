import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import GradingPage from "../Pages/Grading_Page/Grading_Page";
import Dashboard from "../Pages/Dashboard";
import GradingPage from "../Pages/Grading_Page/Grading_Page";
import NewAssignment from "../Pages/ProfessorDB/NewAssignment/NewAssignment";
// const GradingPage = lazy(() => import("./Grading_Page/Grading_Page"));
import EditAssignment from "../Pages/ProfessorDB/EditAssignment/EditAssignment";
function ProfessorPages() {
  return (
    <Routes>
      <Route
        path="Grading_Page"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <GradingPage />
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
      <Route
        path="NewAssignment"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NewAssignment />
          </Suspense>
        }
      />
      <Route
        path="EditAssignment"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EditAssignment />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default ProfessorPages;
