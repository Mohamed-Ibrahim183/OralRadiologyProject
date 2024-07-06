import React from "react";

const Test = () => {
  function subFunction() {
    return <p>hello world</p>;
  }
  return (
    <div>
      Test
      <subFunction />
    </div>
  );
};

export default Test;
