import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Pages/Loader";
import NotFound from "../Pages/NotFound";

// Lazy Loading Pages
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const GradingPage = lazy(() => import("../Pages/Grading_Page/Grading_Page"));
const NewAssignment = lazy(() =>
  import("../Pages/ProfessorDB/NewAssignment/NewAssignment")
);
const EditAssignment = lazy(() =>
  import("../Pages/ProfessorDB/EditAssignment/EditAssignment")
);
const StudentsGrade = lazy(() =>
  import("../Pages/studentsGrades/StudentsGrade")
);

function ProfessorPages() {
  return (
    <Routes>
      <Route
        path="Grading_Page"
        element={
          <Suspense fallback={<Loader />}>
            <GradingPage />
          </Suspense>
        }
      />
      <Route
        path="Dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="NewAssignment"
        element={
          <Suspense fallback={<Loader />}>
            <NewAssignment />
          </Suspense>
        }
      />
      <Route
        path="EditAssignment"
        element={
          <Suspense fallback={<Loader />}>
            <EditAssignment />
          </Suspense>
        }
      />
      <Route
        path="studentsgrades"
        element={
          <Suspense fallback={<Loader />}>
            <StudentsGrade />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default ProfessorPages;
