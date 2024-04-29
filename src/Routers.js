// Routers.js
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
import SecondPage from "./Pages/SecondPage";
//import { useMediaQuery } from 'react-responsive'
// import SubmitAssignmentPage from "./Pages/SubmitAssignmentPage";
// import AddProf from "./Pages/AddProf/Add-professor";
// import Profile2 from "./Pages/Profile/Profile2";
import AddProf from "./Pages/AddProf";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import AssignmentSubmission from "./Pages/assignment_page/Assignment_submission_page";
import ProfessorTable from "./Pages/All_professors/All_professors";
import AdminPage from "./Pages/Admin/admin_page";
import NavAdmin from "./Components/AdminNav2/NavAdmin";
import LoginPage from "./Pages/Login/LoginPage";
import GradingPage from "./Pages/Grading_Page/Grading_Page";
import Home2 from "./Pages/Home2/Home2";
import BasicForm from "./Pages/basicForm/BasicForm";
import StudentDB from "./Pages/StudentDashBoard/StudentDB";
import Groups from "./Pages/Groups/Groups";
import EditUser from "./Pages/Groups/Edit";
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
    path: "/AllProfessor",
    element: <ProfessorTable />,
    errorElement: <NotFound />,
  },
  {
    path: "/Admin_dashboard",
    element: <AdminPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/AdminNav",
    element: <NavAdmin />,
    errorElement: <NotFound />,
  },
  {
    path: "/Grading_Page",
    element: <GradingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/Home2",
    element: <Home2 />,
    errorElement: <NotFound />,
  },
  {
    path: "/BasicForm",
    element: <BasicForm />,
    errorElement: <NotFound />,
  },
  {
    path: "/Groups",
    element: <Groups />,
    errorElement: <NotFound />,
  },
  {
    path: "/Edit/:id",
    element: <EditUser />,
    errorElement: <NotFound />,
  },
  {
    path: "/StudentDB",
    element: <StudentDB />,
    errorElement: <NotFound />,
  },
];

export default routes;
