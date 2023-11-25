import React from "react";
import NavbarScoreboard from "./layouts/NavbarScoreboard";
import style from "../assets/css/scoreboard.module.css";
const Scoreboard = () => {
  return (
    <div className={style["box-head"]}>
      <NavbarScoreboard path="/detailSucceed" />
    </div>
  );
};

export default Scoreboard;
