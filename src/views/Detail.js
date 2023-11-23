import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarImg from "./layouts/NavbarImg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import Ads from "../assets/image/img/Ads.png";
import CloseButton from "../assets/image/icon/CloseButton.png";
import dateIcon from "../assets/image/icon/🗓️.png";
import Reward1 from "../assets/image/img/Reward1.png";
import Reward2 from "../assets/image/img/Reward2.png";
import Reward3 from "../assets/image/img/Reward3.png";

const Detail = () => {
  const navigate = useNavigate();
  const [statusManu, setStatusManu] = useState("details");

  const register = () => {
    navigate("/");
  };

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

        <div className="box-button">
          <div className="btn-persianBlue" onClick={register}>
            ลงทะเบียน
          </div>
        </div>
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
