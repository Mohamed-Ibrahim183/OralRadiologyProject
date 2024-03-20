import React from "react";
import "./Card.css";
import Attr from "./Attr";
const Card = (props) => {
  const images = props.images;
  const [imageIndex, setImageIndex] = React.useState(0);
  const AssImage = images[imageIndex];

  const Features = props.Features;

  const content = Features.map(function (ele, index) {
    return <Attr key={index} Key={ele.key} Value={ele.value} />;
  });

  function next() {
    setImageIndex((prev) =>
      imageIndex < images.length - 1 ? imageIndex + 1 : 0
    );
  }
  function previous() {
    setImageIndex((prev) =>
      imageIndex > 0 ? imageIndex - 1 : images.length - 1
    );
  }

  return (
    <div className="container AssCard">
      <div className="Card">
        <div className="Images">
          <div className="singleImage">
            {/* <i
              className="fa-solid fa-circle-arrow-left left-Arrow"
              onClick={previous}
            ></i> */}
            <i
              className="fa-solid fa-caret-down left-Arrow"
              onClick={previous}
            ></i>
            <img className="image" src={AssImage} alt={props.Name} />
            <i
              className="fa-solid fa-caret-down right-Arrow"
              onClick={next}
            ></i>
            {/* <i
              className="fa-solid fa-circle-arrow-left right-Arrow"
              onClick={next}
            ></i> */}
          </div>
          <div className="status">
            <span className="AssName">{props.Name}</span>
            <span className="Slider">
              {imageIndex + 1}/{images.length}
            </span>
          </div>
        </div>
        <div className="attrs">{content}</div>
      </div>
    </div>
  );
};

export default Card;
