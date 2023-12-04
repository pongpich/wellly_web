import React, { useState, useEffect } from "react";
import NavbarWeb from "./layouts/NavbarWeb";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import stop from "../assets/image/icon/stop.png";
import Contextual from "../assets/image/icon/Contextual.png";

const DetailTimer = () => {
  const navigate = useNavigate();
  const [statusAbandon, setStatusAbandon] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  //สำหรับตัวจับระยะทาง
  const [distance, setDistance] = useState(0);
  const [positions, setPositions] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null)


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const newPosition = { latitude, longitude };

    if (tracking) {
      const lastPosition = positions[positions.length - 1];
      const distanceIncrement = calculateDistance(
        lastPosition.latitude,
        lastPosition.longitude,
        newPosition.latitude,
        newPosition.longitude
      );

      setDistance((prevDistance) => prevDistance + distanceIncrement);
      setPositions((prevPositions) => [...prevPositions, newPosition]);
    } else {
      setPositions([newPosition]);
    }
  };

  const handleError = (error) => {
    console.error("Error getting position:", error);
  };

  const toggleTracking = () => {
    setTracking((prevTracking) => !prevTracking);
  };

  useEffect(() => {
    if (!tracking) {
      navigator.geolocation.clearWatch(watchId);
    } else {
      const watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError
      );
      setWatchId(watchId);

    }
  }, [tracking]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // รัศมีของโลกในหน่วยกิโลเมตร
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

  useEffect(() => {
    //ตั้งไว้หลังจากเริ่มจับเวลา 3วินาที ค่อยเริ่มนับ km เพราะก่อนหน้านี้บัค
    if (totalSeconds === 1) {
      setTracking(true);
    }
  }, [totalSeconds])

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
    setTracking(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    setTracking(false);
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
            <p className={style["count-walk"]}>{distance.toFixed(2)}</p>
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
