import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Pages/Loader";
import NotFound from "../Pages/NotFound";

// Lazy Loading Pages
const OverViewAssignmentsPage = lazy(() =>
  import("../Pages/OverViewAssignmentsPage")
);
const AssignmentSubmission = lazy(() =>
  import("../Pages/assignment_page/Assignment_submission_page")
);
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const AssignmentPage2 = lazy(() =>
  import("../Pages/assignment_page2/assignmentPage2")
);

function StudentPages() {
  return (
    <Routes>
      <Route
        path="submit"
        element={
          <Suspense fallback={<Loader />}>
            <AssignmentSubmission />
          </Suspense>
        }
      />
      <Route
        path="submit2"
        element={
          <Suspense fallback={<Loader />}>
            <AssignmentPage2 />
          </Suspense>
        }
      />
      <Route
        path="Assignments"
        element={
          <Suspense fallback={<Loader />}>
            <OverViewAssignmentsPage />
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

export default StudentPages;
