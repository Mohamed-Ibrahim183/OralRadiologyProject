import Navbar from "../../Components/Navbar/Navbar";
import './Homeee2.css';
import img1 from './img1.jpeg';
import InfiniteScroll from "./InfiniteScroll";
import VideoComponent from "./VideoComponent";
import QuotesSection from "./quotes/QuotesSection";
import Footer from "./Footer";
import Footer2 from "../../Components/Footer2/Footer";
const Home2= ()=> (
  <>
    <Navbar />
    <div className="Home2Page">
      <div className="login-wrapper">
        <div className="smallscreens">
           <img src={img1} alt="Oral Radiology" className="smalll" />
        </div>
        <div className="login-content">
          <div className="text-section">
            <h1>
              Welcome To
              <div className="titleblue"> Academic Oral Radiology</div>
            </h1>
            <p>Welcome to Academic Oral Radiology, your premier platform for student learning and assessment in cutting-edge oral radiology techniques. Upload your assignments and let our experienced professors provide personalized, constructive feedback to propel your skills to new heights.</p>
            <div className="login-form">
              <input type="text" placeholder="Username ..." />
              <input type="password" placeholder="Password..." />
              <button type="button">Login</button>
            </div>
          </div>
          <div className="image-section">
            <img src={img1} alt="Oral Radiology" />
          </div>
        </div>
      </div>
      <InfiniteScroll />
      <VideoComponent />
      <QuotesSection />
    </div>
    <Footer2 />
  </>
);
export default Home2;