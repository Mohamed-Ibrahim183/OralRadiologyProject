import React from "react";
// import { useEffect } from "react";
// import Spline from "@splinetool/react-spline";
// import File from "./data.json";
// import { Colors } from "chart.js";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import image1 from "./service-banner.png";
import image2 from "./cta-banner.png";
import video1 from "./video1.mp4";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="HomePage HomePageDesign">
        <section className="parent">
          <div></div>
          <h2 className="title-line child section-subtitle">
            Welcome to Oral Radiology
          </h2>
          <h1 className="h1 hero-title">Oral Radiology</h1>
        </section>
        <section class="bg-image">
          {/* <center> */}
          <video
            className="video"
            width="70%"
            height="70%"
            autoplay="True"
            nofullscreen="True"
            nodownload="True"
            muted="True"
            loop="True"
          >
            <source src={video1} type="video/mp4" />
            Error.
          </video>
          {/* </center> */}
          <img src={image1} alt="" className="img1 child " />
        </section>

        <div className="Human">
          <figure class="doctor-banner">
            <img
              src={image2}
              width="1056"
              height="1076"
              loading="lazy"
              alt="doctor banner"
              class="w-100"
            />
          </figure>

          <div class="doctor-content">
            <p class="section-subtitle">MSA Oral Radiology</p>

            <h2 class="h2 section-title">Oral Radiology Film Assignments</h2>

            <Link to="/LoginPage" class="btn">
              Login
            </Link>
          </div>
        </div>

        <section className="section  bg-dark has-bg-image" aria-label="class">
          <div className="mg-30">
            <p className="section-subtitle">
              Sample Oral Radiology films Sample
            </p>

            <div class="scroll-container">
              <img
                src="https://vmscart.com/cdn/shop/products/SkydentDentalFilm_03.jpg?v=1681991984"
                alt="image1"
              />
              <img
                src="https://velopex.com/wp-content/uploads/2017/06/film-inspection-600x600.jpg"
                alt="image1"
              />
              <img
                src="https://rukminim2.flixcart.com/image/850/1000/kxjav0w0/x-ray-viewer/e/w/4/0-dental-x-ray-film-iopa-pack-of-100-e-speed-waldent-original-imag9ystgzcqheq3.jpeg?q=90&crop=false"
                alt="image1"
              />
              <img
                src="https://clentdentist.com/wp-content/uploads/2023/09/dentist-analyzes-x-ray-photo-scaled.jpg"
                alt="image1"
              />
              <img
                src="https://capozzidental.com/wp-content/uploads/2020/11/Screen-Shot-2020-11-02-at-12.47.14-PM.png"
                alt="image1"
              />
              <img
                src="https://www.mouthhealthy.org/-/media/project/ada-organization/ada/mouthhealthy/images/a-to-z/13679_radiation_safety_images_1110x700_mh.jpg?rev=891c7ec5dd93467b91b299fdd8049ed8&w=1306&hash=2EBD86EF7EC97B848F19154C2A1AB105"
                alt="image1"
              />
              <img
                src="https://stjacobsdentalcare.ca/images/blog/dental-x-rays-your-window-to-oral-health.jpg"
                alt="image1"
              />
              <img
                src="https://img.freepik.com/premium-photo/xray-dentist-examining-radiography-professional-oral-hospital-diagnosing_116317-23297.jpg"
                alt="image1"
              />
              <img
                src="https://img.freepik.com/premium-photo/dental-x-ray-film-dental-care-concept_117856-1402.jpg"
                alt="image1"
              />
            </div>
            <div className="space"></div>
          </div>
        </section>
      </div>
    </>
  );
}
