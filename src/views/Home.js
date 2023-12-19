import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { getEventActivity, getEventUser } from "../redux/get";
import { userId } from "../redux/auth";
import { useSelector, useDispatch } from "react-redux";
import formattedDate from "../components/formatDate";
import { format, parse } from "date-fns";

import style from "../assets/css/home.module.css";
import History from "../assets/image/icon/History.png";
import Frame13716 from "../assets/image/img/Frame13716.png";
import Frame13717 from "../assets/image/img/Frame13717.png";
import dateIcon from "../assets/image/icon/schedule.png";
import Foot_step from "../assets/image/icon/Foot_step.png";
import Distance from "../assets/image/icon/Distance.png";
import Tick3x from "../assets/image/icon/Tick3x.png";
import EmptyState from "../assets/image/icon/EmptyState.png";
import { el } from "date-fns/locale";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useSelector(({ auth }) => (auth ? auth : ""));
  const { event, event_user } = useSelector(({ get }) => (get ? get : ""));
  const [statusHead, setStatusHead] = useState("ทั้งหมด");
  /*   const [tickData, setTickData] = useState(true); */
  const [success, setSuccess] = useState(true);
  const [dataState, setDataState] = useState(true);
  const [barVisible, setBarVisible] = useState(false);
  const [event_activity, setEvent_activity] = useState(event);
  const [eventUser, setEventUser] = useState(event_user);
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setBarVisible(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setEvent_activity(event_activity);
  }, [event]);

  useEffect(() => {
    setEventUser(event_user);
  }, [event_user]);

  /*   useEffect(() => {
    setParam1(userId);
  }, []); */

  const handleReloadClick = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(getEventActivity());
  }, []);

  useEffect(() => {
    /*  dispatch(getEventUser(user_id)); */ //สำหรับใช้งานจริงผ่านมือถือ

    dispatch(getEventUser("tha-0012")); // สำหรับเทส เเค่ตัวเว็บ
  }, []);

  // Extract the query string from the URL
  const params1 = "tha-0012";
  useEffect(() => {
    const query = new URLSearchParams(
      window.location.hash.substring(window.location.hash.indexOf("?"))
    );
    const accessParams = query.get("params");

    if (accessParams) {
      dispatch(userId(accessParams));
    }
  }, []);

  const renderActivityDetails = (item, tickData, itemUser, indexItem) => {
    let tickId =
      eventUser && eventUser.some((user) => user.event_id == item.id);
    let tickDistance = itemUser && itemUser.distance > item && item.distance;
    let tickWalk_step = itemUser && itemUser.walk_step > item && item.walk_step;
    console.log("tickDistance", tickDistance);

    console.log("tickData", tickData);

    return (
      <Link
        to={
          tickData
            ? "/detailSucceed/" + item.id
            : tickId
            ? "/start-exercising/" + item.id
            : "/detail/" + item.id
        }
        key={indexItem}
      >
        <div className={style["activity-box-user"]}>
          {tickId && tickData && (
            <img src={Tick3x} className={style["img-tick3x"]} />
          )}
          <div className={style["activity-image"]}>
            <img
              src={Frame13716}
              className={`${style["img-activity"]} ${
                tickId && tickData && style["opacity-tick"]
              }`}
            />
          </div>
          <p className={style["details-text"]}>
            {item.event_name} {item.id}
          </p>
          <p className={style["details-text-date"]}>
            <span>
              <img src={dateIcon} className={style["date-icon"]} />
            </span>
            {formattedDate(item.start_date, item.end_date)}
          </p>
          {tickId && (
            <>
              <div
                className={`${style["success-text"]} ${style["justify-between"]}`}
              >
                <p className={`${!tickData && style["scores-text"]}`}>
                  <span>
                    <img src={Foot_step} className={style["date-icon"]} />
                  </span>
                  {itemUser && itemUser && itemUser.walk_step}
                </p>
                <p>
                  {new Intl.NumberFormat("en-US").format(item.walk_step)} ก้าว
                </p>
              </div>
              <div className={style["progress-activity"]}>
                <div
                  className={`${
                    !tickData
                      ? style["progress-bar-active"]
                      : style["progress-bar"]
                  }`}
                  style={{
                    width: `${
                      (itemUser &&
                        itemUser &&
                        itemUser.walk_step / item.walk_step) * 100
                    }%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
              <div
                className={`${style["success-text"]} ${style["justify-between"]}`}
              >
                <p className={!tickData && `${style["scores-text"]}`}>
                  <span>
                    <img src={Foot_step} className={style["date-icon"]} />
                  </span>
                  {itemUser && itemUser && itemUser.distance}
                </p>
                <p>
                  {new Intl.NumberFormat("en-US").format(item.distance)}{" "}
                  กิโลเมตร
                </p>
              </div>
              <div className={style["progress-activity"]}>
                <div
                  className={`${
                    !tickData
                      ? style["progress-bar-active"]
                      : style["progress-bar"]
                  }`}
                  style={{
                    width: `${
                      (itemUser &&
                        itemUser &&
                        itemUser.distance / item.distance) * 100
                    }%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </>
          )}
          {tickData && <p className={style["view-scores"]}>ดูผลคะแนน</p>}
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className={style["navbar-fixed-top"]} />
      <div className={style["fixed-top"]}>
        <div className={style["nav-activity"]}>
          <span className={style["text-activity"]}>กิจกรรม </span>
          <img
            src={History}
            onClick={handleReloadClick}
            id="re-load"
            className={style["history"]}
          />
        </div>
      </div>
      <div className={`sliding-bar ${barVisible ? "visible" : ""}`}>
        <div className={style["button-head"]}>
          <div
            className={style["head-box"]}
            onClick={() => setStatusHead("ทั้งหมด")}
          >
            <p
              className={
                statusHead == "ทั้งหมด"
                  ? style["head-active"]
                  : style["head-text"]
              }
            >
              ทั้งหมด
              <div
                className={
                  statusHead == "ทั้งหมด"
                    ? style["active-hr-button"]
                    : style["hr-button"]
                }
              />
            </p>
          </div>
          <div
            className={style["head-box"]}
            onClick={() => setStatusHead("ลงทะเบียนแล้ว")}
          >
            <p
              className={
                statusHead == "ลงทะเบียนแล้ว"
                  ? style["head-active"]
                  : style["head-text"]
              }
            >
              ลงทะเบียนแล้ว
              <div
                className={
                  statusHead == "ลงทะเบียนแล้ว"
                    ? style["active-hr-button"]
                    : style["hr-button"]
                }
              />
            </p>
          </div>
        </div>
      </div>

      <div className={style["box-activity"]}>
        {statusHead == "ทั้งหมด" ? (
          <>
            {event_activity && event_activity.length > 0 ? (
              <>
                {event_activity &&
                  event_activity.map((item, index) => {
                    const formattedEndDate = parse(
                      item.end_date,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    const formattedStartDateShow = parse(
                      item.start_date_show,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    const formattedEndDateShow = parse(
                      item.end_date_show,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    const foundItemUser =
                      eventUser &&
                      eventUser.find(
                        (itemUser) => item.id == itemUser.event_id
                      );
                    const tickData = dateNow > new Date(formattedEndDate);
                    const isDateInRange =
                      dateNow >= formattedStartDateShow &&
                      dateNow <= formattedEndDateShow;

                    return (
                      isDateInRange &&
                      renderActivityDetails(
                        item,
                        tickData,
                        foundItemUser,
                        index
                      )
                    );
                  })}
              </>
            ) : (
              <div>
                <img src={EmptyState} className={style["emptyState-icon"]} />
                <p className={style["no-activity"]}>ยังไม่มีกิจกรรม</p>
              </div>
            )}
          </>
        ) : (
          <>
            {event_activity && event_activity.length > 0 ? (
              <>
                {event_activity.map((item, index) => {
                  const formattedEndDate = parse(
                    item.end_date,
                    "dd-MM-yyyy",
                    new Date()
                  );
                  const formattedStartDateShow = parse(
                    item.start_date_show,
                    "dd-MM-yyyy",
                    new Date()
                  );
                  const formattedEndDateShow = parse(
                    item.end_date_show,
                    "dd-MM-yyyy",
                    new Date()
                  );

                  const foundItemUser =
                    eventUser &&
                    eventUser.find(
                      (itemUser) =>
                        dateNow >= formattedStartDateShow &&
                        dateNow <= formattedEndDateShow &&
                        item.id == itemUser &&
                        itemUser &&
                        itemUser.event_id
                    );

                  /*  return (
                    foundItemUser &&
                    renderActivityDetails(
                      item,
                      foundItemUser,
                      dateNow > new Date(formattedEndDate),
                      item.id === founditemUser && itemUser && itemUser.event_id,
                      index
                    )
                  ); */
                })}
              </>
            ) : (
              <div>
                <img src={EmptyState} className={style["emptyState-icon"]} />
                <p className={style["no-activity"]}>ยังไม่มีกิจกรรม</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
