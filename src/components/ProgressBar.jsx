import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ percentage }) => {
  let progressBarClass = "progress-bar"; // Default class

  if (percentage === 100) {
    // Green when expenses equal budgetAmount
    progressBarClass = "progress-bar-green";
  } else if (percentage > 100) {
    // Red when expenses exceed budgetAmount
    progressBarClass = "progress-bar-red";
  } else {
    // Blue when expenses are less than budgetAmount
    progressBarClass = "progress-bar-blue";
  }

  return (
    <div className="progress">
      <div
        className={progressBarClass}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;
