import React, { useState, useEffect } from "react";
import NavbarWeb from "./layouts/NavbarWeb";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import stop from "../assets/image/icon/stop.png";
import Contextual from "../assets/image/icon/Contextual.png";
import { getMyGoogleFit } from "../fitnessApi";
import { checkLocalToken } from "../tokens";
import { updateDistance, updateWalkStep } from "../redux/update";
import { useSelector, useDispatch } from "react-redux";

const DetailTimer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusAbandon, setStatusAbandon] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [positions, setPositions] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [timeStampStartPage, setTimeStampStartPage] = useState(Date.now());
  const statusUpdateWalkStep = useSelector(({ update }) =>
    update ? update.statusUpdateWalkStep : ""
  );
  const statusUpdateDistance = useSelector(({ update }) =>
    update ? update.statusUpdateDistance : ""
  );
  const { user_id } = useSelector(({ auth }) => (auth ? auth : ""));

  useEffect(() => {
    if (!checkLocalToken()) {
      handleTokenFromQueryParams();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  const handleTokenFromQueryParams = () => {
    console.log("handleTokenFromQueryParams !!");
    const query = new URLSearchParams(
      window.location.hash.substring(window.location.hash.indexOf("?"))
    );
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    console.log("accessToken :", accessToken);
    console.log("refreshToken :", refreshToken);
    console.log("App.js 30 | expiration Date", expirationDate);

    if (accessToken && refreshToken) {
      storeTokenData(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
    }
  };

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeTokenData = async (token, refreshToken, expirationDate) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expirationDate", expirationDate);
  };

  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const newPosition = { latitude, longitude };

    console.log("handleSuccess !!!");

    if (tracking) {
      const lastPosition = positions[positions.length - 1];
      const distanceIncrement = calculateDistance(
        lastPosition && lastPosition.latitude,
        lastPosition && lastPosition.longitude,
        newPosition && newPosition.latitude,
        newPosition && newPosition.longitude
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
    console.log("a :", a);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return a ? distance : 0; //เช็คค่า a ก่อน เพราะเวลาไม่มีข้อมูล lat, lon aจะมีค่าเป็น NaN
  };

  const clickFinish = async () => {
    const selected_event_id = localStorage.getItem("selected_event_id");
    navigate(`/start-exercising/${selected_event_id}`);

    /* const selected_event_start_date = localStorage.getItem(
      "selected_event_start_date"
    );
    const selected_event_end_date = localStorage.getItem(
      "selected_event_end_date"
    );
    const walk_step_goal = localStorage.getItem("walk_step_goal");
    const distance_goal = localStorage.getItem("distance_goal");
    const dateParts1 = selected_event_start_date.split("-"); // แยกส่วนของวันที่
    const dateParts2 = selected_event_end_date.split("-"); // แยกส่วนของวันที่
    const startEvent = new Date(
      `${dateParts1[2]}-${dateParts1[1]}-${dateParts1[0]}`
    ).getTime();
    const endEvent = new Date(
      `${dateParts2[2]}-${dateParts2[1]}-${dateParts2[0]}`
    ).getTime();

    const dataTotalSteps = await getMyGoogleFit(startEvent, endEvent); //ดึงข้อมูลจำนวนก้าวทั้งหมดในช่วงระยะเวลา event
    let totalSteps = 0;
    if (
      dataTotalSteps.bucket.length === 0 ||
      dataTotalSteps.bucket[0].dataset[0].point.length === 0
    ) {
      //ไม่มีข้อมูลจำนวนก้าว
    } else {
      //มีข้อมูลจำนวนก้าว
      totalSteps = dataTotalSteps.bucket[0].dataset[0].point[0].value[0].intVal;
    } */

    /*  dispatch(
       updateWalkStep(
         user_id,
         selected_event_id,
         totalSteps > walk_step_goal ? walk_step_goal : totalSteps
       )
     );
     dispatch(
       updateDistance(user_id, selected_event_id, distance, distance_goal)
     ); */
    //navigate(`/start-exercising/${selected_event_id}`);
  };

  const callGetMyGoogleFit = async () => {
    const data = await getMyGoogleFit(timeStampStartPage, Date.now()); //ดึงข้อมูลจำนวนก้าวในช่วงเวลาที่จับ
    checkStepsData(data);
  };

  function checkStepsData(data) {
    let status_data;
    let steps_count = 0;
    if (
      data.bucket.length === 0 ||
      data.bucket[0].dataset[0].point.length === 0
    ) {
      status_data = "no_data";
    } else {
      status_data = "there_is_data";
      steps_count = data.bucket[0].dataset[0].point[0].value[0].intVal;
    }
    setSteps(steps_count);
  }

  let intervalId;
  let intervalId2;
  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      intervalId2 = setInterval(() => {
        callGetMyGoogleFit();
      }, 5000);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, [isRunning]);

  useEffect(() => {
    //ตั้งไว้หลังจากเริ่มจับเวลา 3วินาที ค่อยเริ่มนับ km เพราะก่อนหน้านี้บัค
    if (totalSeconds === 1) {
      setTracking(true);
    }
  }, [totalSeconds]);

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
          {/*  <div>
            <p className={style["text-walk"]}>ก้าวเดิน (ก้าว)</p>
            <p className={style["count-walk"]}>{steps}</p>
              <button style={{ zIndex: 99, position: "relative" }} onClick={() => getMyGoogleFit(startTimeMillis, endTimeMillis)}>
              Get Google Fit
            </button>
          </div> */}
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
                  <div
                    onClick={() => clickFinish()}
                    className={style["btn-finish-Abandon"]}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    ละทิ้ง
                  </div>
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
