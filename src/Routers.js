// Routers.js
import React from "react";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";
import NotFound from "./Pages/NotFound";
import SecondPage from "./Pages/SecondPage";
import SubmitAssignmentPage from "./Pages/SubmitAssignmentPage";
// import AddProf from "./Pages/AddProf/Add-professor";
import AddProf from "./Pages/AddProf";

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
    element: <SubmitAssignmentPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/AddProf",
    element: <AddProf />,
    errorElement: <NotFound />,
  },
];

export default routes;
