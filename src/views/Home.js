import React, { useState, useEffect } from "react";
import Navbar from "./layouts/Navbar";
import style from "../assets/css/home.module.css";
import History from "../assets/image/icon/History.png";

const Home = () => {
  const [statusHead, setStatusHead] = useState("ทั้งหมด");

  return (
    <>
      <Navbar />
      <div className={style["box-activity"]}>
        <div className={style["nav-activity"]}>
          <span className={style["text-activity"]}>กิจกรรม</span>
          <img src={History} className={style["history"]} />
        </div>
        <div className={style["button-head"]}>
          <div className={style["head-box"]}>
            <p
              className={
                statusHead == "ทั้งหมด"
                  ? style["head-active"]
                  : style["head-text"]
              }
            >
              ทั้งหมด
            </p>
          </div>
          <div className={style["head-box"]}>
            <p
              className={
                statusHead == "ลงทะเบียนแล้ว"
                  ? style["head-active"]
                  : style["head-text"]
              }
            >
              ลงทะเบียนแล้ว
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
