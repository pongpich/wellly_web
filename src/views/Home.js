import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { getEventActivity } from "../redux/get";
import { useSelector, useDispatch } from "react-redux";

import style from "../assets/css/home.module.css";
import History from "../assets/image/icon/History.png";
import Frame13716 from "../assets/image/img/Frame13716.png";
import Frame13717 from "../assets/image/img/Frame13717.png";
import dateIcon from "../assets/image/icon/schedule.png";
import Foot_step from "../assets/image/icon/Foot_step.png";
import Distance from "../assets/image/icon/Distance.png";
import Tick3x from "../assets/image/icon/Tick3x.png";
import EmptyState from "../assets/image/icon/EmptyState.png";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusHead, setStatusHead] = useState("ทั้งหมด");
  const [tickData, setTickData] = useState(true);
  const [success, setSuccess] = useState(true);
  const [dataState, setDataState] = useState(true);
  const [barVisible, setBarVisible] = useState(false);
  const [param1, setParam1] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setBarVisible(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleReloadClick = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(getEventActivity());
  }, []);

  // Extract the query string from the URL
  const params1 = "tha-0012";
  useEffect(() => {
    const query = new URLSearchParams(
      window.location.hash.substring(window.location.hash.indexOf("?"))
    );
    const accessParams = query.get("params");

    if (accessParams) {
      setParam1(accessParams);
    } else {
      setParam1("ไม่มี params");
    }
    console.log(accessParams); // ผลลัพธ์คือ 'tha-0012'
  }, []); // ใช้ useEffect โดยให้ dependencies เป็น [] เ

  return (
    <>
      <div className={style["navbar-fixed-top"]} />
      <div className={style["fixed-top"]}>
        <div className={style["nav-activity"]}>
          <span className={style["text-activity"]}>กิจกรรม</span>
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
            {dataState ? (
              <>
                <Link to="/detail">
                  <div className={style["activity-box-user"]}>
                    {!tickData && (
                      <img src={Tick3x} className={style["img-tick3x"]} />
                    )}
                    <div className={style["activity-image"]}>
                      <img
                        src={Frame13716}
                        className={`${style["img-activity"]} ${
                          !tickData && style["opacity-tick"]
                        }`}
                      />
                    </div>{" "}
                    <p className={style["details-text"]}>
                      วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร
                      ABCDF group 1
                    </p>
                    <p className={style["details-text-date"]}>
                      <span>
                        <img src={dateIcon} className={style["date-icon"]} />
                      </span>
                      1 ม.ค. - 30 ม.ค. 2566
                    </p>
                    {success == false && (
                      <>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </>
                    )}
                    {!tickData && (
                      <p className={style["view-scores"]}>ดูผลคะแนน</p>
                    )}
                  </div>
                </Link>
                <Link to="/all-test">
                  <div className={style["activity-box-user"]}>
                    {!tickData && (
                      <img src={Tick3x} className={style["img-tick3x"]} />
                    )}
                    <div className={style["activity-image"]}>
                      <img
                        src={Frame13716}
                        className={`${style["img-activity"]} ${
                          !tickData && style["opacity-tick"]
                        }`}
                      />
                    </div>{" "}
                    <p className={style["details-text"]}>
                      วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร
                      ABCDF group 1
                    </p>
                    <p className={style["details-text-date"]}>
                      <span>
                        <img src={dateIcon} className={style["date-icon"]} />
                      </span>
                      1 ม.ค. - 30 ม.ค. 2566
                    </p>
                    {success == true && (
                      <>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </>
                    )}
                    {!tickData && (
                      <p className={style["view-scores"]}>ดูผลคะแนน</p>
                    )}
                  </div>
                </Link>
                <Link to="/detailSucceed">
                  <div className={style["activity-box-user"]}>
                    <img src={Tick3x} className={style["img-tick3x"]} />
                    <div className={style["activity-image"]}>
                      <img
                        src={Frame13717}
                        className={`${style["img-activity"]} ${
                          tickData && style["opacity-tick"]
                        }`}
                      />
                    </div>{" "}
                    <p className={style["details-text"]}>
                      วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร
                      ABCDF group 1
                    </p>
                    <p className={style["details-text-date"]}>
                      <span>
                        <img src={dateIcon} className={style["date-icon"]} />
                      </span>
                      1 ม.ค. - 30 ม.ค. 2566
                    </p>
                    <div
                      className={`${style["success-text"]} ${style["justify-between"]}`}
                    >
                      <p className={`${!tickData && style["scores-text"]}`}>
                        <span>
                          <img src={Foot_step} className={style["date-icon"]} />
                        </span>
                        1500
                      </p>
                      <p>400,000 ก้าว</p>
                    </div>
                    <div className={style["progress-activity"]}>
                      <div
                        className={style["progress-bar"]}
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div
                      className={`${style["success-text"]} ${style["justify-between"]}`}
                    >
                      <p className={`${!tickData && style["scores-text"]}`}>
                        <span>
                          <img src={Distance} className={style["date-icon"]} />
                        </span>
                        1500
                      </p>
                      <p>400,000 ก้าว</p>
                    </div>
                    <div className={style["progress-activity"]}>
                      <div
                        className={`${
                          !tickData
                            ? style["progress-bar-active"]
                            : style["progress-bar"]
                        }`}
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    {tickData && (
                      <p className={style["view-scores"]}>ดูผลคะแนน</p>
                    )}
                  </div>
                </Link>
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
            {dataState ? (
              <>
                <Link to="/detailRegister">
                  <div className={style["activity-box-user"]}>
                    {!tickData && (
                      <img src={Tick3x} className={style["img-tick3x"]} />
                    )}
                    <div className={style["activity-image"]}>
                      <img
                        src={Frame13716}
                        className={`${style["img-activity"]} ${
                          !tickData && style["opacity-tick"]
                        }`}
                      />
                    </div>{" "}
                    <p className={style["details-text"]}>
                      วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร
                      ABCDF group 1
                    </p>
                    <p className={style["details-text-date"]}>
                      <span>
                        <img src={dateIcon} className={style["date-icon"]} />
                      </span>
                      1 ม.ค. - 30 ม.ค. 2566
                    </p>
                    {success == true && (
                      <>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                        <div
                          className={`${style["success-text"]} ${style["justify-between"]}`}
                        >
                          <p className={`${tickData && style["scores-text"]}`}>
                            <span>
                              <img
                                src={Foot_step}
                                className={style["date-icon"]}
                              />
                            </span>
                            1500
                          </p>
                          <p>400,000 ก้าว</p>
                        </div>
                        <div className={style["progress-activity"]}>
                          <div
                            className={`${
                              tickData
                                ? style["progress-bar-active"]
                                : style["progress-bar"]
                            }`}
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </>
                    )}
                    {!tickData && (
                      <p className={style["view-scores"]}>ดูผลคะแนน</p>
                    )}
                  </div>
                </Link>
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
