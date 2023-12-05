import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarImg from "./layouts/NavbarImg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";

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
  const navigate = useNavigate();
  const [statusManu, setStatusManu] = useState("score");
  const [statusProgressBar, setStatusProgressBar] = useState(true);
  const [isLeft, setIsLeft] = useState(true);
  const [position, setPosition] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
        <p className={style["message-content"]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum
        </p>
      </>
    );
  };

  const rewardActivity = () => {
    return (
      <div className={style["mt-box-reward"]}>
        <div className={style["box-reward"]}>
          <div className={style["reward-img"]}>
            <img src={Reward1} className={style["img-reward"]} />
          </div>
          <div>
            <div className={style["reward-one"]}>
              <span className={style["reward-1"]}>รางวัลที่ 1</span>
              <span className={style["reward-2"]}>1 รางวัล</span>
            </div>
            <span className={style["reward-detail"]}>
              เครื่องอบขนมปังลายทหารอากาศจากอิตาลี
            </span>
          </div>
        </div>
        <div className={style["box-reward"]}>
          <div className={style["reward-img"]}>
            <img src={Reward2} className={style["img-reward"]} />
          </div>
          <div>
            <div className={style["reward-one"]}>
              <span className={style["reward-1"]}>รางวัลที่ 2</span>
              <span className={style["reward-2"]}>2 รางวัล</span>
            </div>
            <span className={style["reward-detail"]}>
              เครื่องเขียนถ่านไฟฉายตากบอ๋บๆ
            </span>
          </div>
        </div>
        <div className={style["box-reward"]}>
          <div className={style["reward-img"]}>
            <img src={Reward3} className={style["img-reward"]} />
          </div>
          <div>
            <div className={style["reward-one"]}>
              <span className={style["reward-1"]}>รางวัลที่ 3</span>
              <span className={style["reward-2"]}>3 รางวัล</span>
            </div>
            <span className={style["reward-detail"]}>เงินจำนวน 10 บาท</span>
          </div>
        </div>
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
      setTimeout(() => {
        navigate("/detailTimer");
      }, 400);
    }
  }, [isLeft]);
  const rewardScore = () => {
    /*     console.log("isLeft", isLeft); */
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
            1500
          </p>
          <p className={style["tex-pace"]}>400,000 ก้าว</p>
        </div>
        <div className={style["progress-activity"]}>
          <div
            className={`${
              statusProgressBar
                ? style["progress-bar-active"]
                : style["progress-bar"]
            }`}
            style={{ width: "40%" }}
          ></div>
        </div>
        <div className={`${style["mt-bar"]} ${style["justify-between"]}`}>
          <p className={style["scores-text"]}>
            <span>
              <img src={Distance} className={style["date-icon"]} />
            </span>
            400
          </p>
          <p className={style["tex-pace"]}>1000 กิโลเมตร</p>
        </div>
        <div className={style["progress-activity"]}>
          <div
            className={`${
              statusProgressBar
                ? style["progress-bar-active"]
                : style["progress-bar"]
            }`}
            style={{ width: "30%" }}
          ></div>
        </div>
        <div className={style["box-frame13754"]}>
          <img
            src={Frame13}
            className={`${style["frame13"]} ${
              isLeft ? style["left"] : style["right"]
            }`}
            style={{ left: `${position}px` }}
            draggable="true"
            onTouchMove={handleTouchMove}
          />
          <p className={style["start-exercising"]}>เริ่มออกกำลังกาย</p>
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
          วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ขององค์กร ABCDF group{" "}
        </p>
        <p className={`${style["mt--16"]} "details-text-date"`}>
          <span>
            <img src={dateIcon} className="date-icon" />
          </span>
          1 ม.ค. - 30 ม.ค. 2566
        </p>
        <div
          className={` ${
            statusManu == "score" ? "btn-manu-active" : "btn-manu"
          } ${style["mr-9"]}`}
          onClick={() => setStatusManu("score")}
        >
          คะแนน
        </div>
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
