// import React from "react";
import React, { useState, useEffect, useRef } from "react";

import NavbarScoreboard from "./layouts/NavbarScoreboard";
import style from "../assets/css/scoreboard.module.css";
import { Link, useParams } from "react-router-dom";
import { getActivityUsers } from "../redux/activity";
import { useSelector, useDispatch } from "react-redux";

const data = Array(34).fill(null);
const Scoreboard = () => {
  const activity_users = useSelector(({ activity }) => (activity ? activity.activity_users : ""));

  const [activityUsers, setActivityUsers] = useState(activity_users);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityUsers(id));
  }, []);

  useEffect(() => {
    setActivityUsers(activity_users);
  }, [activity_users]);


  console.log(activityUsers);
 
  return (
    <div className={style["box-head"]}>
      <NavbarScoreboard path="/detailRegister" />
      <div className={style["box-scoreboard"]}>
        <span className={style["scoreboard-list"]}>ตารางคะแนน</span>
        <div className={style["box-list"]}>
          <div className={style["list-head"]}>
            <p></p>
            <p></p>
            <p>ชื่อ</p>
            <p>ก้าวเดิน</p>
            <p>ระยะทาง</p>
          </div>
          {activityUsers &&
            activityUsers.map((item, index) => (
              <div
                className={` ${index == 20 && style["score-user"]} ${style["list-user"]
                  }`}
              >
                <p className={style["list-id"]}>{index + 1}</p>
                <div className={style["box-list-name"]}>{item.display_name[0].toUpperCase()}</div>

                <p className={style["list-name"]}>{item.display_name}</p>

                <p className={style["list-score"]}>{item.walk_step}</p>
                <p className={style["list-score"]}>{item.distance}</p>
              </div>
            ))}
         
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
