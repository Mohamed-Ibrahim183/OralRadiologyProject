import StatCard from "./StatCard";
import Chart from "./Chartt.js";
import "./Admin_page.css";
import Navbar from "../../Components/Navbar/Navbar.js";
import AdminNav from "../../Components/AdminNav/AdminNav.js";
function Admin_page() {
  return (
    <>
      <Navbar />
      <div className="MainPage">
        <AdminNav />
        <div className="AdminSection">
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
      </div>
    </>
    // {/* <h1>Non3eem</h1> */}
  );
}
export default Admin_page;
