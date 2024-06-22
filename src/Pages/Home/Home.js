import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/footer";
import image1 from "./service-banner.png";
import image2 from "./cta-banner.png";
import video1 from "./video1.mp4";
import { Link } from "react-router-dom";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Home() {
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
      <LazyLoadImage
        effect="blur"
        src={image1}
        alt="Service Banner"
        className="img1 child"
      />
    </section>
  );
}

function VideoSection() {
  return (
    <div className="bg-image">
      <center>
        <video className="video" width="70%" height="70%" autoPlay muted loop>
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </center>
    </div>
  );
}

function OralRadiologyInfoSection() {
  return (
    <div className="Human">
      <figure className="doctor-banner">
        <LazyLoadImage
          src={image2}
          alt="Doctor Banner"
          className="img2 w-100"
          width="1056"
          height="1076"
          loading="lazy"
          effect="blur"
        />
      </figure>
      <div className="doctor-content">
        <p className="section-subtitle">MSA Oral Radiology</p>
        <h2 className="h2 section-title">Oral Radiology Film Assignments</h2>
        <div className="center1">
          <Link to="../Login3" className="btn">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
const Gallery = [
  "./Images/Gallery/sample 1.avif",
  "./Images/Gallery/sample 2.avif",
  "./Images/Gallery/sample 3.jpg",
  "./Images/Gallery/sample 4.png",
  "./Images/Gallery/sample 5.jpg",
  "./Images/Gallery/sample 6.webp",
  "./Images/Gallery/sample 7.jpg",
  "./Images/Gallery/sample 8.webp",
];

function ImageGallerySection() {
  return (
    <section
      className="section bg-dark has-bg-image"
      aria-label="Image Gallery"
    >
      <div className="mg-30">
        <p className="section-subtitle">Sample Oral Radiology Films</p>
        <div className="scroll-container">
          {Gallery.map((image, i) => (
            <LazyLoadImage
              key={i}
              src={image}
              alt={`Sample Film ${i + 1}`}
              effect="blur"
            />
          ))}
        </div>
        <div className="space"></div>
      </div>
    </section>
  );
}
