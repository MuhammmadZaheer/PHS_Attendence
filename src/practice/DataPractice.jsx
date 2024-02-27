import React from "react";
import SAMPLE_DATA from "./data";
import "./DataPractice.css";
import { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import TrackingContainer from "../components/TrackingContainer";

function DataPractice() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://phs.azzappointments.com/apis/public/api/admin/attendance-reports"
        );
        console.log(response.data.users[0].trackings_data);
        setUsers(response.data.users);
        //console.log("user ", response.data.users[1]);

        // console.log("days", response.data.days);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid main">
      {/* <Header /> */}
      <div className="card-container ">
        {Object.entries(users).map(([id, user]) => (
          <div key={id} className="card-details">
            <span>
              <span className="id">{user.id}</span>
            </span>
            <span>
              <span className="name">{user.name}</span>
            </span>
            <div
              style={{ display: "flex" }}
              className="tracking-container  "
              // ref={cardDetailsRef}
            >
              <ScrollerContainer user={user} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScrollerContainer({ user }) {
  const [scrollPosition, setScrollPosition] = useState(100);
  const containerRef = useRef();
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };
  const ITEM_WIDTH = 100;
  return (
    <div className="container-fluid ">  
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        <div className="content-box container-fluid">
          {user.trackings_data.map((tracking, index) => (
            <TrackingContainer key={index} tracking={tracking} /> 
          ))}
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            handleScroll(-ITEM_WIDTH);
          }}
        >
          Scroll Left
        </button>
        <button
          onClick={() => {
            handleScroll(ITEM_WIDTH);
          }}
        >
          Scroll Right
        </button>
      </div>
    </div>
  );
}

export default DataPractice;
