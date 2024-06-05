import StatCard from "./StatCard";
import Chart from "./Chart.js";
import "./Admin.css";
import Navbar from "../../Components/Navbar/Navbar.js";
// import NavAdmin from "../../Components/AdminNav2/NavAdmin.js";
import Calendar from "react-calendar";
import Mail from "./Mail.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
function AdminPage() {
  useEffect(() => {
    document.body.classList.add("AdminBody");
    return () => document.body.classList.remove("AdminBody");
  }, []);
  if (sessionStorage["Type"] !== "Admin") {
    return <Navigate to="/" />;
  }
  const cardsData = [
    {
      title: "Total Students",
      value: 100,
      percentage: 80,
      time: "20 Days",
      Index: "a",
    },
    {
      title: "New Students",
      value: 20,
      percentage: 50,
      time: "20 Days",
      Index: "b",
    },
    {
      title: "Total Courses",
      value: 28,
      percentage: 76,
      time: "20 Days",
      Index: "c",
    },
    {
      title: "Fees Collection",
      value: "21290$",
      percentage: 35,
      time: "20 Days",
      Index: "d",
    },
  ];
  const cards = cardsData.map((ele) => {
    return <StatCard key={ele.title} {...ele} />;
  });
  return (
    <>
      <Navbar />
      <div className="MainPage">
        {/* <NavAdmin /> */}
        <div className="AdminSection adminHomeSection containerWidth">
          <div className="Charts">
            <div className="stats-row">{cards}</div>
            <div className="chart-row">
              <Chart />
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Mail />
            <Calendar />
          </Box>
        </div>
      </div>
    </>
  );
}
export default AdminPage;
