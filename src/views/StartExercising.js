import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarImg from "./layouts/NavbarImg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import formattedDate from "../components/formatDate";
import { getEventActivity, getEventUser } from "../redux/get";

import Ads from "../assets/image/img/Ads.png";
import CloseButton from "../assets/image/icon/CloseButton.png";
import dateIcon from "../assets/image/icon/schedule.png";
import Reward1 from "../assets/image/img/Reward1.png";
import Reward2 from "../assets/image/img/Reward2.png";
import Reward3 from "../assets/image/img/Reward3.png";
import Foot_step from "../assets/image/icon/Foot_step.png";
import Distance from "../assets/image/icon/Distance.png";
import Frame13 from "../assets/image/icon/Frame13754.png";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useSelector(({ auth }) => (auth ? auth : ""));
  const { event, event_user, status_event_user } = useSelector(({ get }) => (get ? get : ""));
  const [statusManu, setStatusManu] = useState("score");
  const [statusProgressBar, setStatusProgressBar] = useState(true);
  const [isLeft, setIsLeft] = useState(true);
  const [position, setPosition] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [event_activity, setEvent_activity] = useState(null);
  const [eventUser, setEventUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const foundEvent = event && event.find((item) => item.id == id);
    const foundEventUser =
      event_user && event_user.find((item) => item.event_id === id);

    setEvent_activity(foundEvent);
    setEventUser(foundEventUser);

  }, []);

  useEffect(() => {
    const foundEventUser =
      event_user && event_user.find((item) => item.event_id === id);
    setEventUser(foundEventUser);

  }, [event_user]);

  useEffect(() => {
    if (event_activity) {
      localStorage.setItem("selected_event_start_date", event_activity.start_date);
      localStorage.setItem("selected_event_end_date", event_activity.end_date);
      localStorage.setItem("walk_step_goal", event_activity.walk_step);
      localStorage.setItem("distance_goal", event_activity.distance);
    }
    console.log("event_activity :", event_activity);

  }, [event_activity]);

  useEffect(() => {

    if (eventUser) {
      localStorage.setItem("selected_event_id", eventUser.event_id);
    }
    console.log("eventUser :", eventUser);

  }, [eventUser]);

  useEffect(() => {
    //dispatch(getEventUser(user_id)); //สำหรับใช้งานจริงผ่านมือถือ

    dispatch(getEventUser("tha-0012")); // สำหรับเทส เเค่ตัวเว็บ
  }, []);

  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch(
        "https://api.planforfit.com/wellly/getUrlGoogleAuth",
        {
          method: "GET",
        }
      );
      const response = await request.json();
      window.location.href = response.url;
    } catch (error) {
      console.log("home.js 12 | error", error);
      throw new Error("Issue with Login", error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const messageContent = () => {
    return (
      <>
        <p
          className={style["message-content"]}
          dangerouslySetInnerHTML={{
            __html: event_activity && event_activity.event_detail,
          }}
        />
      </>
    );
  };

  const rewardActivity = () => {
    let reward = event_activity && JSON.parse(event_activity.reward);
    return (
      <div className={style["mt-box-reward"]}>
        {reward &&
          reward.map((item, index) => (
            <div className={style["box-reward"]}>
              <div className={style["reward-img"]}>
                <img src={item.image} className={style["img-reward"]} />
              </div>
              <div>
                <div className={style["reward-one"]}>
                  <span className={style["reward-1"]}>
                    รางวัลที่ {item.number}
                  </span>
                  <span className={style["reward-2"]}>
                    {" "}
                    {item.number} รางวัล
                  </span>
                </div>
                <span className={style["reward-detail"]}>{item.name}</span>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const handleTouchMove = (event) => {
    const { clientX, target } = event.changedTouches[0];
    const { left, width } = target.getBoundingClientRect();
    const midPoint = left + width / 2;
    let newPosition = midPoint - width / 2;

    newPosition = Math.max(
      0,
      Math.min(viewportWidth - 56 - width, newPosition)
    );

    /*     console.log("left, width", left, width);
    console.log("clientX, midPoint", left, width); */
    /*     console.log("newPosition", isLeft, clientX, midPoint); */
    /*  console.log("left", left);
    console.log("width", width);
    console.log("newPosition", newPosition); */
    if (left > newPosition) {
      setIsLeft(false);
    }

    setPosition(newPosition);
  };

  useEffect(() => {
    if (isLeft == false) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("refreshToken");
      if (accessToken && refreshtoken) {
        console.log("มี Token");
        setTimeout(() => {
          navigate(
            `/detailTimer?accessToken=${accessToken}&refreshToken=${refreshtoken}`
          );
        }, 400);
      } else {
        console.log("ไม่มี Token");
        createGoogleAuthLink();
      }
    }
  }, [isLeft]);

  const rewardScore = () => {
    return (
      <>
        <div className={style["reward-one"]}>
          <p className={style["score-user"]}>คะแนนของฉัน</p>
          <Link to="/scoreboard">
            <p className={style["score-board"]}>ตารางคะแนน</p>
          </Link>
        </div>

        <div
          className={`${style["mt-bar"]} ${style["mt--bar"]} ${style["justify-between"]}`}
        >
          <p className={style["scores-text"]}>
            <span>
              <img src={Foot_step} className={style["date-icon"]} />
            </span>
            {eventUser && eventUser.walk_step}
          </p>
          <p className={style["tex-pace"]}>
            {event_activity && event_activity.walk_step} ก้าว
          </p>
        </div>
        <div className={style["progress-activity"]}>
          <div
            className={`${statusProgressBar
              ? style["progress-bar-active"]
              : style["progress-bar"]
              }`}
            style={{
              width: `${((eventUser && eventUser.walk_step) /
                (event_activity && event_activity.walk_step)) *
                100
                }%`,
              maxWidth: "100%",
            }}
          ></div>
        </div>
        <div className={`${style["mt-bar"]} ${style["justify-between"]}`}>
          <p className={style["scores-text"]}>
            <span>
              <img src={Distance} className={style["date-icon"]} />
            </span>
            {eventUser && eventUser.distance}
          </p>
          <p className={style["tex-pace"]}>
            {" "}
            {event_activity && event_activity.distance} กิโลเมตร
          </p>
        </div>
        <div className={style["progress-activity"]}>
          <div
            className={`${statusProgressBar
              ? style["progress-bar-active"]
              : style["progress-bar"]
              }`}
            style={{
              width: `${((eventUser && eventUser.distance) /
                (event_activity && event_activity.distance)) *
                100
                }%`,
              maxWidth: "100%",
            }}
          ></div>
        </div>
        <div className={style["box-frame13754"]}>
          <img
            src={Frame13}
            className={`${style["frame13"]} ${isLeft ? style["left"] : style["right"]
              }`}
            style={{ left: `${position}px` }}
            draggable="true"
            onTouchMove={handleTouchMove}
          />
          <p className={style["start-exercising"]}>เริ่มออกกำลังกาย</p>
          {/*           <button onClick={createGoogleAuthLink}>Login</button>
           */}{" "}
        </div>
      </>
    );
  };

  return (
    <>
      <div className={style["box-head-img"]}>
        <NavbarImg path="/" />
        <img src={Ads} className={style["img-Ads"]} />
      </div>
      <div className={style["box-content"]}>
        <p className={style["text-head"]}>
          {event_activity && event_activity.event_name}
        </p>
        <p className={`${style["mt--16"]} "details-text-date"`}>
          <span>
            <img src={dateIcon} className="date-icon" />
          </span>
          {formattedDate(
            event_activity && event_activity.start_date,
            event_activity && event_activity.end_date
          )}
        </p>
        <div
          className={` ${statusManu == "score" ? "btn-manu-active" : "btn-manu"
            } ${style["mr-9"]}`}
          onClick={() => setStatusManu("score")}
        >
          คะแนน
        </div>
        <div
          className={` ${statusManu == "details" ? "btn-manu-active" : "btn-manu"
            } ${style["mr-9"]}`}
          onClick={() => setStatusManu("details")}
        >
          รายละเอียด
        </div>
        <div
          onClick={() => setStatusManu("reward")}
          className={` ${statusManu == "reward" ? "btn-manu-active" : "btn-manu"
            }`}
        >
          รางวัล
        </div>
        {statusManu == "details"
          ? messageContent()
          : statusManu == "score"
            ? rewardScore()
            : rewardActivity()}
      </div>
    </>
  );
};

export default Detail;
