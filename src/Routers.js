// Routers.js
// import AdminPage from "./Pages/Admin/admin_page";
// import StudentDB from "./Pages/StudentDashBoard/StudentDB";
// import ProfessorDB from "./Pages/ProfessorDB/ProfessorDB";
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
import AddProf from "./Pages/AddProf";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import AssignmentSubmission from "./Pages/assignment_page/Assignment_submission_page";
import GradingPage from "./Pages/Grading_Page/Grading_Page";
import AddGroup from "./Pages/Groups/AddGroup";
import Login3 from "./Pages/Login3/Login3";
import Users from "./Pages/Users/Users";
import Dashboard from "./Pages/Dashboard";
import ModalPOP from "./Components/ModalPOP";
import AssignmentPage2 from "./Pages/assignment_page2/assignmentPage2";
import NewAssignment from "./Pages/ProfessorDB/NewAssignment";
import EditAssignment from "./Pages/ProfessorDB/editAssignment";
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
    path: "/Users",
    element: <Users />,
    errorElement: <NotFound />,
  },
  {
    path: "/AddGroup",
    element: <AddGroup />,
    errorElement: <NotFound />,
  },

  {
    path: "/submit",
    element: <AssignmentSubmission />,
    errorElement: <NotFound />,
  },
  {
    path: "/submit2",
    element: <AssignmentPage2 />,
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
    path: "/Grading_Page",
    element: <GradingPage />,
    errorElement: <NotFound />,
  },

  {
    path: "/Dashboard",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/Login3",
    element: <Login3 />,
    errorElement: <NotFound />,
  },
  {
    path: "/ModalPOP",
    element: <ModalPOP />,
    errorElement: <NotFound />,
  },
  {
    path: "/NewAssignment",
    element: <NewAssignment />,
    errorElement: <NotFound />,
  },
  {
    path: "/editAssignment",
    element: <EditAssignment />,
    errorElement: <NotFound />,
  },
];

export default routes;
