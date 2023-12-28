import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarImg from "./layouts/NavbarImg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import formattedDate from "../components/formatDate";
import style from "../assets/css/detail.module.css";

import Ads from "../assets/image/img/Ads.png";
import CloseButton from "../assets/image/icon/CloseButton.png";
import dateIcon from "../assets/image/icon/schedule.png";
import Reward1 from "../assets/image/img/Reward1.png";
import Reward2 from "../assets/image/img/Reward2.png";
import Reward3 from "../assets/image/img/Reward3.png";
import Group13719 from "../assets/image/icon/Group13719.png";

const Detail = () => {
  const navigate = useNavigate();
  const { event, event_user } = useSelector(({ get }) => (get ? get : ""));
  const [event_activity, setEvent_activity] = useState(null);
  const { id } = useParams();
  const [statusManu, setStatusManu] = useState("reward");

  useEffect(() => {
    const foundEvent = event && event.find((item) => item.id == id);
    /*     const foundEventUser =
      event_user && event_user.some((item) => item.event_id === id);
 */
    setEvent_activity(foundEvent);
  }, []);

  const register = () => {
    navigate("/");
  };

  const messageContent = () => {
    return (
      <>
        <p
          className={style["message-content"]}
          dangerouslySetInnerHTML={{
            __html: event_activity && event_activity.event_detail,
          }}
        />

        {/*  <div className="box-button">
          <div className="btn-persianBlue" onClick={register}>
            ลงทะเบียน
          </div>
        </div> */}
      </>
    );
  };

  const rewardActivity = () => {
    let reward = event_activity && JSON.parse(event_activity.reward);

    return (
      <div className={style["mb-box-reward"]}>
        <div className={style["reward-too-user"]}>
          <p className={` ${style["reward-tee"]} `}>
            <span className={style["reward-user"]}>ผู้ได้รับรางวัล</span>
            <Link to={"/scoreboardSucceed/" + id}>
              <span className={style["reward-scoreboard"]}>ตารางคะแนน</span>
            </Link>
          </p>
        </div>
        {reward &&
          reward.map((item, index) => (
            <div className={style["box-reward-succeed"]} key={index}>
              <div className={style["reward-too"]}>
                <span className={style["reward-1"]}>
                  รางวัลที่ {item.number}
                </span>
                <span className={style["reward-2"]}>{item.number} รางวัล</span>
              </div>
              <p className={style["reward-detail-2"]}>{item.name}</p>
              <img src={item.image} className={style["img-reward-succeed"]} />
              <p className={style["tec"]}>
                <span>
                  <img src={Group13719} className={style["img-right"]} />
                </span>
                Borpitbull Tec.
              </p>
            </div>
          ))}

        {/*     <div className={style["box-reward-succeed"]}>
          <div className={style["reward-too"]}>
            <span className={style["reward-1"]}>รางวัลที่ 2</span>
            <span className={style["reward-2"]}>1 รางวัล</span>
          </div>
          <p className={style["reward-detail-2"]}>
            เครื่องอบขนมปังลายทหารอากาศจากอิตาลี
          </p>
          <img src={Reward2} className={style["img-reward-succeed"]} />
          <p className={style["tec"]}>
            <span>
              <img src={Group13719} className={style["img-right"]} />
            </span>
            Borpitbull Tec.
          </p>
        </div> */}
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
            statusManu == "reward" ? "btn-manu-active" : "btn-manu"
          } ${style["mr-9"]}`}
          onClick={() => setStatusManu("reward")}
        >
          ประกาศรางวัล
        </div>
        <div
          onClick={() => setStatusManu("details")}
          className={` ${
            statusManu == "details" ? "btn-manu-active" : "btn-manu"
          }`}
        >
          รายละเอียด
        </div>
        {statusManu == "details" ? messageContent() : rewardActivity()}
      </div>
    </>
  );
};

export default Detail;
