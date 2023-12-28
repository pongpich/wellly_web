import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarImg from "./layouts/NavbarImg";
import { useSelector, useDispatch } from "react-redux";
import { registerEventActivity, clear_status } from "../redux/createEv";
import { useNavigate } from "react-router-dom";
import { userId } from "../redux/createEv";
import formattedDate from "../components/formatDate";

import style from "../assets/css/detail.module.css";
import Ads from "../assets/image/img/Ads.png";
import CloseButton from "../assets/image/icon/CloseButton.png";
import dateIcon from "../assets/image/icon/schedule.png";
import Reward1 from "../assets/image/img/Reward1.png";
import Reward2 from "../assets/image/img/Reward2.png";
import Reward3 from "../assets/image/img/Reward3.png";
import { format, parse } from "date-fns";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { event, event_user } = useSelector(({ get }) => (get ? get : ""));
  const { user_id } = useSelector(({ auth }) => (auth ? auth : ""));
  const { status_event_user } = useSelector(({ createEv }) =>
    createEv ? createEv : ""
  );

  const [statusManu, setStatusManu] = useState("details");
  const [userId, setUserId] = useState(user_id);
  const [event_activity, setEvent_activity] = useState(null);
  const [eventUser, setEventUser] = useState(null);
  const [dateNow, setDateNow] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    const foundEvent = event && event.find((item) => item.id == id);
    const foundEventUser =
      event_user && event_user.some((item) => item.event_id === id);

    setEvent_activity(foundEvent);
    setEventUser(foundEventUser);
  }, []);

  useEffect(() => {
    setUserId(user_id);
  }, [user_id]);

  useEffect(() => {
    if (status_event_user == "success") {
      dispatch(clear_status());
      navigate("/events");
    }
  }, [status_event_user]);

  const register = () => {
    let walk_step = 0;
    let distance = 0;
    dispatch(registerEventActivity(id, userId, walk_step, distance));
  };

  const messageContent = () => {
    const formattedStartDate =
      event_activity &&
      format(
        parse(event_activity.start_date, "dd-MM-yyyy", new Date()),
        "yyyy-MM-dd"
      );

    return (
      <>
        <p
          className={style["message-content"]}
          dangerouslySetInnerHTML={{
            __html: event_activity && event_activity.event_detail,
          }}
        />

        <div className="box-button">
          <div
            className={
              dateNow > new Date(formattedStartDate)
                ? "btn-persianBlue"
                : "btn-persianGrey"
            }
            onClick={dateNow > new Date(formattedStartDate) ? register : null}
          >
            ลงทะเบียน
          </div>
        </div>
      </>
    );
  };

  const rewardActivity = () => {
    let reward = event_activity && JSON.parse(event_activity.reward);
    return (
      <div className={style["mt-box-reward"]}>
        {reward &&
          reward.map((item, index) => (
            <div className={style["box-reward"]} key={index}>
              <div className={style["reward-img"]}>
                <img src={item.image} className={style["img-reward"]} />
              </div>
              <div className="col-">
                <div className={style["reward-one"]}>
                  <div className={style["reward-1"]}>
                    รางวัลที่ {item.number}
                  </div>
                  <div className={style["reward-2"]}>{item.number} รางวัล</div>
                </div>
                <div className={style["reward-detail"]}>{item.name}</div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <div className={style["box-head-img"]}>
        <NavbarImg path="/events" />
        <img
          src={event_activity ? event_activity.cover_Image : Ads}
          className={style["img-Ads"]}
        />
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
          className={` ${
            statusManu == "details" ? "btn-manu-active" : "btn-manu"
          } ${style["mr-9"]}`}
          onClick={() => setStatusManu("details")}
        >
          รายละเอียด
        </div>
        <div
          onClick={() => setStatusManu("reward")}
          className={` ${
            statusManu == "reward" ? "btn-manu-active" : "btn-manu"
          }`}
        >
          รางวัล
        </div>
        {statusManu == "details" ? messageContent() : rewardActivity()}
      </div>
    </>
  );
};

export default Detail;
