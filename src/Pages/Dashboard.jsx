import React from "react";
import ProfessorDB from "./ProfessorDB/ProfessorDB";
import StudentDB from "./StudentDashBoard/StudentDB";
import AdminPage from "./Admin/admin_page";
import App from "./Home/Home";

const Dashboard = () => {
  const userType = sessionStorage["Type"];
  switch (userType) {
    case "Admin":
      return <AdminPage />;
    case "Student":
      return <StudentDB />;
    case "Professor":
      return <ProfessorDB />;
    default:
      return <App />;
  }
};

export default Dashboard;
