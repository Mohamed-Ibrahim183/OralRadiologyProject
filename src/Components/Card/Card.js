import React, { useState } from "react";
import "./Card.css";
import Attr from "./Attr";

const Card = ({ images, assignmentName, Features }) => {
  // const images = props.images;
  const [imageIndex, setImageIndex] = useState(0);
  // const AssImage = images[imageIndex];
  const AssImage = images[imageIndex];
  // const Features = props.Features;

  const Attributes = Object.keys(Features).map(function (ele, index) {
    return <Attr key={index} Key={ele} Value={Features[ele]} />;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const next = () => {
    setImageIndex((prev) =>
      imageIndex < images.length - 1 ? imageIndex + 1 : 0
    );
  };

  const previous = () => {
    setImageIndex((prev) =>
      imageIndex > 0 ? imageIndex - 1 : images.length - 1
    );
  };

  // console.log("images:", images);
  // return;
  return (
    <div className="container AssCard">
      <div className="Card">
        <div className="Images">
          <div className="singleImage">
            <i
              className="fa-solid fa-caret-down left-Arrow"
              onClick={previous}
            ></i>
            <img
              className="image"
              src={
                "http://localhost/Projects/OralRadiology/" + AssImage["Path"]
              }
              alt={AssImage["Category"]}
              onClick={toggleModal}
            />
            <i
              className="fa-solid fa-caret-down right-Arrow"
              onClick={next}
            ></i>
          </div>
          <div className="status">
            <span className="AssName">{assignmentName}</span>

            <span className="cat">{AssImage["Category"]}</span>
          </div>
        </div>
        <div className="attrs">{Attributes}</div>
      </div>
      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-body">
              <img
                className="modal-image image"
                style={{ width: "600px", height: "600px" }}
                src={AssImage}
                alt={assignmentName}
              />
              <button className="modal-button" onClick={previous}>
                Previous
              </button>
              <button className="modal-button" onClick={next}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
