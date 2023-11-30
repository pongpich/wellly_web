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
      <div className={style["run-1"]}>
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

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

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
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Understood
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTimer;
