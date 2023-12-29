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
const ScoreboardSucceed = () => {
  const activity_users = useSelector(({ activity }) =>
    activity ? activity.activity_users : ""
  );

  const [activityUsers, setActivityUsers] = useState(activity_users);
  const { user_id } = useSelector(({ auth }) => (auth ? auth : ""));

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityUsers(id));
  }, []);

  useEffect(() => {
    setActivityUsers(activity_users);
  }, [activity_users]);
  const maxLength = 10;

  const nameGold =
    activityUsers &&
    activityUsers[0] &&
    (activityUsers[0].display_name
      ? activityUsers[0].display_name.length > maxLength
        ? `${activityUsers[0].display_name.substring(0, maxLength)}`
        : activityUsers[0].display_name
      : activityUsers[0].email
      ? activityUsers[0].email.length > maxLength
        ? `${activityUsers[0].email.substring(0, maxLength)}`
        : activityUsers[0].email
      : null);
  const nameSilver =
    activityUsers &&
    activityUsers[1] &&
    (activityUsers[1].display_name
      ? activityUsers[1].display_name.length > maxLength
        ? `${activityUsers[1].display_name.substring(0, maxLength)}`
        : activityUsers[1].display_name
      : activityUsers[1].email
      ? activityUsers[1].email.length > maxLength
        ? `${activityUsers[1].email.substring(0, maxLength)}`
        : activityUsers[1].email
      : null);
  const nameCopper =
    activityUsers &&
    activityUsers[2] &&
    (activityUsers[2].display_name
      ? activityUsers[2].display_name.length > maxLength
        ? `${activityUsers[2].display_name.substring(0, maxLength)}`
        : activityUsers[2].display_name
      : activityUsers[2].email
      ? activityUsers[2].email.length > maxLength
        ? `${activityUsers[2].email.substring(0, maxLength)}`
        : activityUsers[2].email
      : null);

  return (
    <div className={style["box-head"]}>
      <NavbarScoreboard path={`/detailSucceed/${id}`} />
      <div className={style["box-coin"]}>
        <div className="row">
          <div className="col-4">
            <div className={style["box-copper"]}>
              <img
                src={silverCoin}
                alt="Gold Coin"
                className={style["silver-coin"]}
              />
              <span className={style["silver-name-0"]}>
                {nameSilver && nameSilver[0]}
              </span>
            </div>
            <p className={style["name-coin"]}>{nameSilver}</p>
            <div className={style["stab-silver"]}>
              <p className={style["coin-number"]}>2</p>
              <p className={style["number-step"]}>
                <img src={Foot_step} alt="" className={style["icon-step"]} />{" "}
                {activityUsers &&
                  activityUsers[1] &&
                  activityUsers[1].walk_step &&
                  activityUsers[1].walk_step.toLocaleString()}
              </p>
              <p className={style["number-step2"]}>
                <img src={Distance} alt="" className={style["icon-step"]} />{" "}
                {activityUsers &&
                  activityUsers[1] &&
                  activityUsers[1].distance &&
                  activityUsers[1].distance.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="col-4 justify-justify-content">
            <div className="justify-justify-content">
              <div className={style["box-copper"]}>
                <img
                  src={goldCoin}
                  alt="Gold Coin"
                  className={style["gold-coin"]}
                />
                <span className={style["gold-name-0"]}>
                  {nameGold && nameGold[0]}
                </span>
              </div>
              <p className={style["name-coin"]}>{nameGold}</p>
              <div className={style["stab-gold"]}>
                <p className={style["coin-number"]}>1</p>
                <p className={style["number-step"]}>
                  <img src={Foot_step} alt="" className={style["icon-step"]} />{" "}
                  {activityUsers &&
                    activityUsers[0] &&
                    activityUsers[0].walk_step &&
                    activityUsers[0].walk_step.toLocaleString()}
                </p>
                <p className={style["number-step2"]}>
                  <img src={Distance} alt="" className={style["icon-step"]} />{" "}
                  {activityUsers &&
                    activityUsers[0] &&
                    activityUsers[0].distance &&
                    activityUsers[0].distance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className={style["box-copper"]}>
              <img
                src={copperCoin}
                alt="Gold Coin"
                className={style["copper-coin"]}
              />
              <span className={style["copper-name-0"]}>
                {nameCopper && nameCopper[0]}
              </span>
            </div>
            <p className={style["name-coin"]}>{nameCopper}</p>
            <div className={style["stab-copper"]}>
              <p className={style["coin-number"]}>3</p>
              <p className={style["number-step"]}>
                <img src={Foot_step} alt="" className={style["icon-step"]} />{" "}
                {activityUsers &&
                  activityUsers[2] &&
                  activityUsers[2].walk_step &&
                  activityUsers[2].walk_step.toLocaleString()}
              </p>
              <p className={style["number-step2"]}>
                <img src={Distance} alt="" className={style["icon-step"]} />{" "}
                {activityUsers &&
                  activityUsers[2] &&
                  activityUsers[2].distance &&
                  activityUsers[2].distance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={style["box-scoreboard"]}>
        <div className={style["box-list"]}>
          <div className={style["list-head"]}>
            <p className={style["box-head-list"]}>ชื่อ</p>
            <p className={style["box-list-score"]}>ก้าวเดิน</p>
            <p className={style["box-list-score"]}>ระยะทาง</p>
          </div>
          {activityUsers &&
            activityUsers.map((item, index) => (
              <div
                className={` ${
                  item.user_id == user_id && style["score-user"]
                } ${style["list-user"]}`}
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

export default ScoreboardSucceed;
