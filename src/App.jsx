import React from "react";
import Header from "./components/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import TrackingContainer from "./components/TrackingContainer";

function App() {
  const [attendanceReports, setAttendanceReports] = useState({});
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const cardDetailsRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://phs.azzappointments.com/apis/public/api/admin/attendance-reports"
        );
        setAttendanceReports(response.data.users);
        //console.log("user ", response.data.users[1]);

        // console.log("days", response.data.days);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleScroll = (scrollAmount) => {
  //   console.log("scroll amount" , scrollAmount)
  //   const newScrollPosition = scrollPosition + scrollAmount;
  //   setScrollPosition(newScrollPosition);
  //   cardDetailsRef.current.scrollTo({
  //     left: newScrollPosition,
  //     behavior: "smooth"
  //   });
  // };

  return (
    <div className="container-fluid main">
      <Header />
      <div className="card-container container-fluid ">
        {Object.entries(attendanceReports).map(([id, report]) => (
          <div key={id} className="card-details container-fluid">
            <span>
              <span className="id">{report.id}</span>
            </span>
            <span>
              <span className="name">{report.name}</span>
            </span>
            <div
              style={{ display: "flex" }}
              className="tracking-container  "
              // ref={cardDetailsRef}
              
            >
              {report.trackings_data.map((tracking, index) => (
                <TrackingContainer key={index} tracking={tracking} />
              ))}
            </div>
            {/* <div className="arrows">
              <button className="arrow" onClick={()=> handleScroll(-cardDetailsRef.current.clientWidth)}>
                &#60;
              </button>
              <button className="arrow" onClick={()=>{handleScroll(cardDetailsRef.current.clientWidth)}}>
                &#62;
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
