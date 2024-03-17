import StatCard from'./StatCard';
import  Chart  from './Chartt.js';
import './Admin_page.css';
import Navbar from '../../Components/Navbar/Navbar.js';
function Admin_page() {
    return (
      <>
<Navbar />
        <div className="monemmm">
        <div className="stats-row">
          <StatCard title="Total Students" value="3180" percentage="80" time="20 Days" monem="a"/>
          <StatCard title="New Students" value="360" percentage="50" time="20 Days" monem="b"/>
          <StatCard title="Total Course" value="28" percentage="76" time="20 Days" monem="c"/>
          <StatCard title="Fees Collection" value="21290$" percentage="35" time="20 Days" monem="d"/>
        </div>
        <div className="chart-row">
           <Chart /> 
        </div>
      </div> 
      </>
// {/* <h1>Non3eem</h1> */}
    );
}
export default Admin_page;