import StatCard from "./StatCard";
import Chart from "./Chart.js";
//import "./Admin_page.css";
import "./Admin.css";
import Navbar from "../../Components/Navbar/Navbar.js";
// import AdminNav from "../../Components/AdminNav/AdminNav.js";
import NavAdmin from "../../Components/AdminNav2/NavAdmin.js";
import Mail from "./Mail.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
function AdminPage() {
  useEffect(() => {
    document.body.classList.add("AdminBody");
    return () => document.body.classList.remove("AdminBody");
  }, []);
  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar />
      <div className="MainPage">
        <NavAdmin />
        <div className="AdminSection adminHomeSection">
          <div className="Charts">
            <div className="stats-row">
              <StatCard
                title="Total Students"
                value="3180"
                percentage="80"
                time="20 Days"
                Index="a"
              />
              <StatCard
                title="New Students"
                value="360"
                percentage="50"
                time="20 Days"
                Index="b"
              />
              <StatCard
                title="Total Course"
                value="28"
                percentage="76"
                time="20 Days"
                Index="c"
              />
              <StatCard
                title="Fees Collection"
                value="21290$"
                percentage="35"
                time="20 Days"
                Index="d"
              />
            </div>
            <div className="chart-row">
              <Chart />
            </div>
          </div>
          <Mail />
        </div>
      </div>
    </>
  );
}
export default AdminPage;
