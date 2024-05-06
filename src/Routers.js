// Routers.js
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
import SecondPage from "./Pages/SecondPage";
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
import EditUser from "./Pages/Groups/Edit2";
import ProfessorDB from "./Pages/ProfessorDB/ProfessorDB";
import Cardloginn from "./Pages/cardloginn/cardloginn";
import EditUser2 from "./Pages/Groups/EditUser2";
import AddGroup from "./Pages/Groups/AddGroup";
import Login2 from "./Pages/Login2/Login2";
import Users from "./Pages/Users/Users";
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
    path: "/EditUser2/:id",
    element: <EditUser2 />,
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
    path: "/Profile/:id",
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
  {
    path: "/ProfessorDB",
    element: <ProfessorDB />,
    errorElement: <NotFound />,
  },
  {
    path: "/Cardloginn",
    element: <Cardloginn />,
    errorElement: <NotFound />,
  },
  {
    path: "/Login2",
    element: <Login2 />,
    errorElement: <NotFound />,
  },
];

export default routes;
