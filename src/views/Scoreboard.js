// import React from "react";
import React, { useState, useEffect, useRef } from "react";

import NavbarScoreboard from "./layouts/NavbarScoreboard";
import style from "../assets/css/scoreboard.module.css";
import { Link, useParams } from "react-router-dom";
import { getActivityUsers } from "../redux/activity";
import { useSelector, useDispatch } from "react-redux";

import goldCoin from "../assets/image/icon/gold_coin.png";
import silverCoin from "../assets/image/icon/silver_coin.png";
import copperCoin from "../assets/image/icon/copper_coin.png";
import Distance from "../assets/image/icon/Distance.png";
import Foot_step from "../assets/image/icon/Foot_step.png";

const data = Array(34).fill(null);
const Scoreboard = () => {
  const activity_users = useSelector(({ activity }) =>
    activity ? activity.activity_users : ""
  );

  const [activityUsers, setActivityUsers] = useState(activity_users);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityUsers(id));
  }, []);

  useEffect(() => {
    setActivityUsers(activity_users);
  }, [activity_users]);
  const maxLength = 10;

  const dateNow = new Date();
  return (
    <div className={style["box-head"]}>
      <NavbarScoreboard path={`/start-exercising/${id}`} />
      <div className={style["box-scoreboard2"]}>
        <span className={style["scoreboard-list"]}>ตารางคะแนน</span>
        <div className={style["box-list"]}>
          <div className={style["list-head"]}>
            <p className={style["box-head-list"]}>ชื่อ</p>
            <p className={style["box-list-score"]}>ก้าวเดิน</p>
            <p className={style["box-list-score"]}>ระยะทาง</p>
          </div>
          {activityUsers &&
            activityUsers.map((item, index) => (
              <div
                className={` ${index == 2 && style["score-user"]} ${
                  style["list-user"]
                }`}
              >
                <p className={style["list-id"]}>{index + 1}</p>
                <div className={style["box-list-icon"]}>
                  <div className={style["box-list-name"]}>
                    {item.display_name
                      ? item.display_name[0].toUpperCase()
                      : item.email && item.email[0].toUpperCase()}
                  </div>
                </div>
                <div className={style["box-name-list"]}>
                  <p className={style["list-name"]}>
                    {item.display_name
                      ? item.display_name &&
                        item.display_name.length > maxLength
                        ? `${item.display_name.substring(0, maxLength)}...`
                        : item.display_name
                      : item.email && item.email.length > maxLength
                      ? `${item.email.substring(0, maxLength)}...`
                      : item.email}
                  </p>
                </div>
                <div className={style["box-list-score"]}>
                  <p className={style["list-score"]}>
                    {item.walk_step.toLocaleString()}
                  </p>
                </div>
                <div className={style["box-list-score"]}>
                  <p className={style["list-score"]}>
                    {item.distance.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
