// TimeLeftSection.js
import React from "react";

const TimeLeftSection = ({ timeLeft, isClosed, timeLeftMessage, state }) => {
  return (
    <section className="time-left-section">
      <h2 className="assignment-section-title">{timeLeftMessage}</h2>
      <div className="time-left">
        {timeLeft ? (
          <>
            <div className="time-unit">
              <div className="time-value">
                {isClosed ? Math.abs(timeLeft.days) : timeLeft.days}
              </div>
              <div className="time-label">Days</div>
            </div>
            <div className="time-unit">
              <div className="time-value">
                {isClosed ? Math.abs(timeLeft.hours) : timeLeft.hours}
              </div>
              <div className="time-label">Hours</div>
            </div>
            <div className="time-unit">
              <div className="time-value">
                {isClosed ? Math.abs(timeLeft.minutes) : timeLeft.minutes}
              </div>
              <div className="time-label">Minutes</div>
            </div>
          </>
        ) : (
          <p>
            {state === "upcoming"
              ? "Waiting to open..."
              : "Assignment is closed."}
          </p>
        )}
      </div>
    </section>
  );
};

export default TimeLeftSection;
