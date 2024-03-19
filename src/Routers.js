// Routers.js
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
import SecondPage from "./Pages/SecondPage";
// import SubmitAssignmentPage from "./Pages/SubmitAssignmentPage";
// import AddProf from "./Pages/AddProf/Add-professor";
// import Profile2 from "./Pages/Profile/Profile2";
import AddProf from "./Pages/AddProf";
import Profile from "./Pages/Profile/Profile";
import AssignmentSubmission from "./Pages/assignment_page/Assignment_submission_page";
import ProfessorTable from "./Pages/All_professors/All_professors";
import Admin_page from "./Pages/Admin/admin_page";
import NavAdmin from "./Components/AdminNav2/NavAdmin";
const routes = [
  {
    path: "/",
    element: <OverViewAssignmentsPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/Assignments",
    element: <OverViewAssignmentsPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/secondPage",
    element: <SecondPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/submit",
    element: <AssignmentSubmission />,
    errorElement: <NotFound />,
  },
  {
    path: "/AddProf",
    element: <AddProf />,
    errorElement: <NotFound />,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <NotFound />,
  },
  {
    path: "/Allprof",
    element: <ProfessorTable />,
    errorElement: <NotFound />,
  },
  {
    path: "/Admin_dashboard",
    element: <Admin_page />,
    errorElement: <NotFound />,
  },
  {
    path: "/AdminNav",
    element: <NavAdmin />,
    errorElement: <NotFound />,
  },
];

export default routes;
