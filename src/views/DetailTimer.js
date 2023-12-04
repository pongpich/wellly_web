import React, { useState, useEffect } from "react";
import NavbarWeb from "./layouts/NavbarWeb";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import stop from "../assets/image/icon/stop.png";
import Contextual from "../assets/image/icon/Contextual.png";
import GPSTracker2 from '../components/GPSTracker2';


const DetailTimer = () => {
  const navigate = useNavigate();
  const [statusAbandon, setStatusAbandon] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [state, setState] = useState({
    distance: 0,
    positions: [],
    tracking: false,
    latitude: null,
    longitude: null,
    error: null,
    debugSuccess: 0,
    debugFail: 0,
    debugGeo: 0
  });

  useEffect(() => {
    if (navigator.geolocation) {
      setState({ ...state, debugGeo: 1 });
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
      );
      setState({ ...state, debugGeo: 2 });
    } else {
      setState({ ...state, debugGeo: 3 });
      setState({ ...state, error: 'ไม่สนับสนุน Geolocation API' });
    }
  }, []);

  const handleSuccess = (position) => {
    setState({ ...state, debugSuccess: 1 });
    const { latitude, longitude } = position.coords;
    setState({ ...state, debugSuccess: 2 });
    setState({ ...state, latitude, longitude });
    setState({ ...state, debugSuccess: 3 });
  };

  const handleError = (error) => {
    setState({ ...state, debugFail: 1 });
    setState({ ...state, error: 'ไม่สามารถเข้าถึงตำแหน่งทางภูมิศาสตร์' });
  };

  const toggleTracking = () => {
    if (state.tracking) {
      navigator.geolocation.clearWatch(state.watchId);
      setState({ ...state, tracking: false });
    } else {
      const watchId = navigator.geolocation.watchPosition(
        handlePositionChange,
        handlePositionError
      );
      setState({ ...state, tracking: true, watchId });
    }
  };

  const handlePositionChange = (position) => {
    const { positions } = state;
    if (positions.length > 0) {
      const lastPosition = positions[positions.length - 1];
      const distanceIncrement = calculateDistance(
        lastPosition.coords.latitude,
        lastPosition.coords.longitude,
        position.coords.latitude,
        position.coords.longitude
      );

      setState(prevState => ({
        ...prevState,
        distance: prevState.distance + distanceIncrement,
        positions: [...prevState.positions, position],
      }));
    } else {
      setState({ ...state, positions: [position] });
    }
  };

  const handlePositionError = (error) => {
    console.error("Error getting position:", error);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const { distance, tracking, positions } = state;

  const clickFinish = () => {
    navigate("/detailRegister");
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      remainingSeconds
    )}`;
    return formattedTime;
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
  };

  return (
    <div>
      <div className={style["box-time"]}>
        <p className={style["time"]}>เวลา</p>
        <p className={style["count-time"]}>{formatTime(totalSeconds)}</p>
        <div className={style["justify-around"]}>
          <div>
            <p className={style["text-walk"]}>ก้าวเดิน (ก้าว)</p>
            <p className={style["count-walk"]}>200</p>
          </div>
          <div>
            <p className={style["text-walk"]}>ระยะทาง (กม.)</p>
            <p className={style["count-walk"]}>1.40</p>
          </div>
        </div>
      </div>

      <div className={style["run-1"]}>
        <div className={style["box-run"]}>
          <p className={style["time"]}>
            กรุณาอย่าปิดหน้าเว็บตลอดการบันทึกกิจกรรม
          </p>
          <div>
            {isRunning ? (
              <div className={style["box-start-run"]}>
                <img
                  src={stop}
                  className={style["img-stop"]}
                  onClick={handlePause}
                />
              </div>
            ) : (
              <>
                <div className={style["box-start-run"]}>
                  <div className={style["btn-play"]} onClick={handleStart}>
                    เล่นต่อ
                  </div>
                  <div
                    className={style["btn-finish"]}
                    onClick={() => clickFinish()}
                  >
                    เสร็จ
                  </div>
                </div>
                <a
                  className={style["text-abandon"]}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  ละทิ้ง
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {/*  <GPSTracker2 /> */}

      <div>
        <p>ระยะทางที่วิ่งได้ คือ: {distance.toFixed(2)} km</p>
        <button onClick={toggleTracking}>
          {tracking ? "หยุดนับระยะทาง" : "เริ่มนับระยะทาง"}
        </button>
        <ul>
          {positions.map((position, index) => (
            <li key={index}>
              Lat: {position.coords.latitude}, Long: {position.coords.longitude}
            </li>
          ))}
        </ul>
      </div>


      <div className="run-time">
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className={`${style["modal-bottom"]} ${"modal-dialog"}`}>
            <div className="modal-content">
              <div className="modal-body">
                <div className={style["contextual"]}>
                  <img src={Contextual} className={style["img-contextual"]} />
                </div>
                <p className={style["confirm-abandon"]}>
                  ยืนยันการละทิ้งกิจกรรม
                </p>
                <div className={style["btn-box-abandon"]}>
                  <div
                    className={style["btn-play-Abandon"]}
                    data-bs-dismiss="modal"
                  >
                    กลับ
                  </div>
                  <div className={style["btn-finish-Abandon"]}>ละทิ้ง</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTimer;
