import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import GradingPage from "../Pages/Grading_Page/Grading_Page";
import Dashboard from "../Pages/Dashboard";
import GradingPage from "../Pages/Grading_Page/Grading_Page";

// const GradingPage = lazy(() => import("./Grading_Page/Grading_Page"));

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
    </Routes>
  );
}

export default ProfessorPages;
