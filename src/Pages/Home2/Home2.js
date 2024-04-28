import Navbar from "../../Components/Navbar/Navbar";
import "./Home2.css";
import img1 from "./img1.jpeg";
import InfiniteScroll from "./InfiniteScroll";
import VideoComponent from "./VideoComponent";
import QuotesSection from "./quotes/QuotesSection";
// import Footer from "./Footer";
import Footer2 from "../../Components/Footer2/Footer";
import Cardloginn from "../cardloginn/cardloginn";
import { useState } from "react";
import axios from "axios";
// import { json, useInRouterContext } from "react-router-dom";
// import { useInRouterContext } from "react-router-dom";
export default function Home2() {


  return (
    <>
      <Navbar />
      <div className="Home2Page">
       <Cardloginn />
        <InfiniteScroll />
        <VideoComponent />
        <QuotesSection />
      </div>
      <Footer2 />
    </>
  );
}
// export default Home2;
