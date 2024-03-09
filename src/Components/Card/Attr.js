import React from "react";

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

export default Attr;
