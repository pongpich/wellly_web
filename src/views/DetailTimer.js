import React from "react";
import NavbarWeb from "./layouts/NavbarWeb";
import style from "../assets/css/detail.module.css";

const DetailTimer = () => {
  return (
    <div>
      <NavbarWeb path="/detailRegister" />
      <div className={style["box-time"]}>
        <p className={style["time"]}>เวลา</p>
        <p className={style["count-time"]}>00:12:45</p>
      </div>
    </div>
  );
};

export default DetailTimer;
