import React from "react";
import NavbarScoreboard from "./layouts/NavbarScoreboard";
import style from "../assets/css/scoreboard.module.css";

const data = Array(34).fill(null);
const Scoreboard = () => {
  return (
    <div className={style["box-head"]}>
      <NavbarScoreboard path="/detailRegister" />
      <div className={style["box-scoreboard"]}>
        <span className={style["scoreboard-list"]}>ตารางคะแนน</span>
        <div className={style["box-list"]}>
          <div className={style["list-head"]}>
            <p></p>
            <p>ชื่อ</p>
            <p>ก้าวเดิน</p>
            <p>ระยะทาง</p>
          </div>
          {data &&
            data.map((item, index) => (
              <div
                className={` ${index == 20 && style["score-user"]} ${
                  style["list-user"]
                }`}
              >
                <p className={style["list-id"]}>{index + 1}</p>
                <div className={style["list-row"]}>
                  <div className={style["box-list-name"]}>V</div>
                  <p className={style["list-name"]}>Veddi Kia.</p>
                </div>

                <p className={style["list-score"]}>320,023</p>
                <p className={style["list-score"]}>980</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
