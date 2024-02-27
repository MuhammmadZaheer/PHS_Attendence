import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TrackingContainer.css";
const TrackingContainer = ({ tracking }) => {
 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date)} ${date.getFullYear()}`;
  };
  console.log("formatting Date", formatDate);

  const formatTime = (timeString) => {
    if (timeString === null) {
      return "Not Found";
    }
    const datetimeObj = new Date(timeString);
    const timeInAMPMFormat = datetimeObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return timeInAMPMFormat;
  };
  console.log("formatting time", formatTime);

  return (
    <div className="tracking ">
      <div className="tracking_cards ref={trackingContainerRef}">
        <h6>{formatDate(tracking.date)}</h6>
        <div className="checks-span">
          <span className="Check-in ">Check_in</span> 
          <span className="Check-out">Check_out</span>
        </div>
        <div className="checks-time">
          <span className="checks-in-time ">
            {formatTime(tracking.data.check_in_time)}
          </span>
          <span className="checks-out-time">
            {formatTime(tracking.data.check_out_time)}
          </span>
        </div>
       
      </div>
    </div>
  );
};

export default TrackingContainer;
