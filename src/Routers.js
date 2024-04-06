// Routers.js
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
//import { useMediaQuery } from 'react-responsive'
import SecondPage from "./Pages/SecondPage";
// import SubmitAssignmentPage from "./Pages/SubmitAssignmentPage";
// import AddProf from "./Pages/AddProf/Add-professor";
// import Profile2 from "./Pages/Profile/Profile2";
import AddProf from "./Pages/AddProf";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import AssignmentSubmission from "./Pages/assignment_page/Assignment_submission_page";
import ProfessorTable from "./Pages/All_professors/All_professors";
import Admin_page from "./Pages/Admin/admin_page";
import NavAdmin from "./Components/AdminNav2/NavAdmin";
import LoginPage from "./Pages/Login/LoginPage";
import Grading_Page from "./Pages/Grading_Page/Grading_Page";
import Home2 from "./Pages/Home2/Home2";
const routes = [
  {
    path: "/",
    element: <Home />,
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
    path: "/LoginPage",
    element: <LoginPage />,
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
  {
    path: "/Grading_Page",
    element: <Grading_Page />,
    errorElement: <NotFound />,
  },
  {
    path: "/Home2",
    element: <Home2 />,
    errorElement: <NotFound />,
  }
];

export default routes;
