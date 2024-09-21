// CategoriesSection.js
import React from "react";

const AssignmentInfoSection = ({
  timeLeft,
  isClosed,
  message,
  assignmentInfo,
}) => {
  return (
    <section>
      <h1 className="assignment-title">{assignmentInfo.Name}</h1>
      <span className="assignment-deadline">
        {isClosed
          ? message
          : `Time left: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
      </span>
    </section>
  );
};

export default AssignmentInfoSection;
