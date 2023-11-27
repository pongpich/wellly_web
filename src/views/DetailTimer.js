import React, { useState, useEffect } from "react";
import NavbarWeb from "./layouts/NavbarWeb";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import stop from "../assets/image/icon/stop.png";

const DetailTimer = () => {
  const navigate = useNavigate();
  const [statusPlay, setStatusPlay] = useState(0);
  const [statusAbandon, setStatusAbandon] = useState(0);

  const clickPlay = (event) => {
    if (event == "play") {
      setStatusPlay(1);
    } else {
      setStatusPlay(0);
    }
  };
  const clickFinish = () => {
    navigate("/detailRegister");
  };
  return (
    <div>
      <div className={style["box-time"]}>
        <p className={style["time"]}>เวลา</p>
        <p className={style["count-time"]}>00:12:45</p>
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
      <div className={style["run-2"]}>
        <div className={style["box-run"]}>
          <p className={style["time"]}>
            กรุณาอย่าปิดหน้าเว็บตลอดการบันทึกกิจกรรม
          </p>
          <div>
            {statusPlay == 0 ? (
              <div className={style["box-start-run"]}>
                <img
                  src={stop}
                  className={style["img-stop"]}
                  onClick={() => clickPlay("play")}
                />
              </div>
            ) : (
              <>
                <div className={style["box-start-run"]}>
                  <div
                    className={style["btn-play"]}
                    onClick={() => clickPlay("stop")}
                  >
                    เล่นต่อ
                  </div>
                  <div
                    className={style["btn-finish"]}
                    onClick={() => clickFinish()}
                  >
                    เสร็จ
                  </div>
                </div>
                <p className={style["text-abandon"]}>ละทิ้ง</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTimer;
