import React, { useRef, useState } from "react";
import "./Card.css";
import { useReactToPrint } from "react-to-print";
import { serverURL } from "../../Slices/GeneralSlice";
import { getSession } from "../../Pages/Controller";

const Cards = ({ submissions }) => {
  const toPrint = useRef();

  const handlePrint = useReactToPrint({
    content: () => toPrint.current,
    documentTitle: `ALL Assignments Report for MSAId:${getSession(
      "MSAId"
    )} Name:${getSession("Name")} time:${new Date()}`,
  });

  return (
    <>
      <button
        style={{ backgroundColor: "#418C83" }}
        className="MainBtn print"
        onClick={handlePrint}
      >
        Print Report
      </button>
      <div className="Assignments" ref={toPrint}>
        {submissions.length > 0 &&
          Array.isArray(submissions) &&
          submissions.map((sub) => {
            return (
              <Card
                key={sub.Id}
                images={sub.images}
                assignmentName={sub.assignmentName}
                Data={sub}
                Features={{
                  submitTime: sub.submitTime,
                  Grade: `${sub.Grade["Total"]}/${sub.Grade["count"] * 10}`,
                  // DoctorComment: sub.DoctorsNote,
                  WeekNumber: sub.weekNum,
                }}
              />
            );
          })}
      </div>
    </>
  );
};

const Card = ({ images, assignmentName, Features, Data }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const AssImage = images[imageIndex];

  const Attributes = Object.keys(Features).map(function (ele, index) {
    return <Attr key={index} Key={ele} Value={Features[ele]} />;
  });

  return (
    <div className="container AssCard">
      <div
        className="Card"
        style={Data.BestGrade ? { border: "5px solid gold" } : {}}
      >
        <div className="Images">
          <div className="singleImage">
            <i
              className="fa-solid fa-caret-down left-Arrow"
              onClick={() =>
                setImageIndex((prev) =>
                  imageIndex > 0 ? imageIndex - 1 : images.length - 1
                )
              }
            ></i>
            <img
              className="image"
              src={`${serverURL}${AssImage["Path"]}`}
              alt={AssImage["Category"]}
            />
            <i
              className="fa-solid fa-caret-down right-Arrow"
              onClick={() =>
                setImageIndex((prev) =>
                  imageIndex < images.length - 1 ? imageIndex + 1 : 0
                )
              }
            ></i>
          </div>
          <div className="status">
            <span className="AssName">{assignmentName}</span>

            <span className="cat">{AssImage["Category"]}</span>
          </div>
        </div>
        <div className="attrs">
          {Attributes}
          {Data.BestGrade && (
            <Attr key="bestGrade" Key="bestGrade" Value={"Best Grade"} />
          )}
        </div>
      </div>
    </div>
  );
};

const Attr = (props) => {
  return (
    <>
      <div className="Attribute">
        <span className="Key">{props.Key}</span>
        <span className="Value">{props.Value}</span>
      </div>
    </>
  );
};
export default Cards;
