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
import Group13719 from "../assets/image/icon/Group13719.png";

const Detail = () => {
  const navigate = useNavigate();
  const [statusManu, setStatusManu] = useState("reward");

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
      <div className={style["mb-box-reward"]}>
        <div className={style["reward-too-user"]}>
          <p className={` ${style["reward-tee"]} `}>
            <span className={style["reward-user"]}>ผู้ได้รับรางวัล</span>
            <Link to="/scoreboardSucceed">
              <span className={style["reward-scoreboard"]}>ตารางคะแนน</span>
            </Link>
          </p>
        </div>

        <div className={style["box-reward-succeed"]}>
          <div className={style["reward-too"]}>
            <span className={style["reward-1"]}>รางวัลที่ 1</span>
            <span className={style["reward-2"]}>1 รางวัล</span>
          </div>
          <p className={style["reward-detail-2"]}>
            เครื่องอบขนมปังลายทหารอากาศจากอิตาลี
          </p>
          <img src={Reward1} className={style["img-reward-succeed"]} />
          <p className={style["tec"]}>
            <span>
              <img src={Group13719} className={style["img-right"]} />
            </span>
            Borpitbull Tec.
          </p>
        </div>
        <div className={style["box-reward-succeed"]}>
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
