import Navbar from "../../Components/Navbar/Navbar";
import './Home2.css';
import img1 from './img1.jpeg';
import InfiniteScroll from "./InfiniteScroll";
const Home2= ()=> {
return(
    <>
    <Navbar />
    <div className="login-wrapper">
      <div className="login-content">
        <div className="text-section">
          <h1>Academic Oral Radiology</h1>
          <p>Welcome to Academic Oral Radiology, your premier platform for student learning and assessment in oral radiology. Upload your assignments and let our experienced professors provide valuable feedback to enhance your skills.</p>
          <div className="login-form">
            <input type="text" placeholder="Username ..." />
            <input type="password" placeholder="Password..." />
            <button type="button">Login</button>
          </div>
        </div>
        <div className="image-section">
          <img src={img1} alt="Oral Radiology"/>
        </div>
      </div>
    </div>
    <InfiniteScroll />
    </>
);
};
export default Home2;