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
