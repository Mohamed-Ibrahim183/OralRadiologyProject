import React, { useEffect } from "react";
import './Home.css';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/footer"
import image1 from "./service-banner.png";
import image2 from "./cta-banner.png";
import video1 from "./video1.mp4";
import { Link } from 'react-router-dom';
export default function App() {
  useEffect(() => {
    // Code for manipulating the body's class list can be uncommented if needed
    // document.body.classList.add("PageBody");
    // return () => document.body.classList.remove("PageBody");
  }, []);

  return (
    <div className="HomePage">
      <Navbar />
      <WelcomeSection />
      <VideoSection />
      <OralRadiologyInfoSection />
      <ImageGallerySection />
      <Footer />
    </div>
  );
}

function WelcomeSection() {
  return (
    <section className="parent">
      <div></div>
      <h2 className="title-line child section-subtitle">Welcome to </h2>
      <h1 className="h1 hero-title">Oral Radiology</h1>
      <img src={image1} alt="" className="img1 child" />
    </section>
  );
}
function VideoSection() {
  return (
    <div className="bg-image">
      <center>
        <video className="video" width="70%" height="70%" autoplay="true" nofullscreen="true" nodownload="true" muted="true" loop="true">
          <source src={video1} type="video/mp4" />
          Error.
        </video>
      </center>
    </div>
  );
}
function OralRadiologyInfoSection() {
  return (
    <div className="Human">
      <figure className="doctor-banner">
        <img src={image2} className="img2 w-100" width="1056" height="1076" loading="lazy" alt="doctor banner"/>
      </figure>
      <div className="doctor-content">
        <p className="section-subtitle">MSA Oral Radiology</p>
        <h2 className="h2 section-title">Oral Radiology Film Assignments</h2>
        <div className="center1">
          <Link to="../Login2">
          <a  className="btn">Sign in</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
function ImageGallerySection() {
  return (
    <section className="section bg-dark has-bg-image" aria-label="class">
      <div className="mg-30">
        <p className="section-subtitle">Sample Oral Radiology films Sample</p>
        <div className="scroll-container">
        <img src="https://vmscart.com/cdn/shop/products/SkydentDentalFilm_03.jpg?v=1681991984"/>
        <img src="https://velopex.com/wp-content/uploads/2017/06/film-inspection-600x600.jpg" />
        <img src="https://rukminim2.flixcart.com/image/850/1000/kxjav0w0/x-ray-viewer/e/w/4/0-dental-x-ray-film-iopa-pack-of-100-e-speed-waldent-original-imag9ystgzcqheq3.jpeg?q=90&crop=false"/>
        <img src="https://clentdentist.com/wp-content/uploads/2023/09/dentist-analyzes-x-ray-photo-scaled.jpg" />
        <img src="https://capozzidental.com/wp-content/uploads/2020/11/Screen-Shot-2020-11-02-at-12.47.14-PM.png" />
        <img src="https://www.mouthhealthy.org/-/media/project/ada-organization/ada/mouthhealthy/images/a-to-z/13679_radiation_safety_images_1110x700_mh.jpg?rev=891c7ec5dd93467b91b299fdd8049ed8&w=1306&hash=2EBD86EF7EC97B848F19154C2A1AB105" />
        <img src="https://stjacobsdentalcare.ca/images/blog/dental-x-rays-your-window-to-oral-health.jpg" />
        <img src="https://img.freepik.com/premium-photo/xray-dentist-examining-radiography-professional-oral-hospital-diagnosing_116317-23297.jpg" />
        <img src="https://img.freepik.com/premium-photo/dental-x-ray-film-dental-care-concept_117856-1402.jpg" />
        </div>
        <div className="space"></div>
      </div>
    </section>
  );
}
