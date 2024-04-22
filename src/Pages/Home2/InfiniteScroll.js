import React, { useEffect, useRef } from "react";
import "./InfiniteScroll.css"; // Assuming your CSS file is named style.css

const InfiniteScroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleWindowResize = () => {
      const scrollSectionWidth = scrollRef.current.clientWidth;
      document.documentElement.style.setProperty(
        "--scroll-section-width",
        `${scrollSectionWidth}px`
      );
    };

    window.addEventListener("resize", handleWindowResize);

    // Set the width on initial render
    handleWindowResize();

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="horizontal-scroll">
      <div ref={scrollRef} className="scroll-section">
        <h1>MSA Oral Radiology</h1>
      </div>
      <div className="scroll-section" aria-hidden="true">
        <h1>MSA Oral Radiology</h1>
      </div>
    </div>
  );
};

export default InfiniteScroll;
