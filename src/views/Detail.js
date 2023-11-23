import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "../assets/css/detail.module.css";
import Ads from "../assets/image/img/Ads.png";
import CloseButton from "../assets/image/icon/CloseButton.png";
import dateIcon from "../assets/image/icon/🗓️.png";

const Detail = () => {
  const navigate = useNavigate();
  const [statusManu, setStatusManu] = useState("details");

  const register = () => {
    navigate("/");
    console.log("888");
  };
  return (
    <>
      <div className={style["box-head-img"]}>
        <Link to="/">
          <img src={CloseButton} className={style["close-button"]} />
        </Link>
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
        <p>
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
      </div>
    </>
  );
};

export default Detail;
