import React, { useState, useEffect, useRef } from "react";
import style from "../../assets/css/createNewActivity.module.css";
import { createEventActivity } from "../../redux/createEv";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; // import locale ภาษาไทย
import enUS from "date-fns/locale/en-US"; // import locale ภาษาอังกฤษ
import { format } from "date-fns";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

import calendarIcon from "../../assets/image/icon/Calendar.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Group7728 from "../../assets/image/icon/Group7728.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import User from "../../assets/image/icon/User.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Col1 from "../../assets/image/icon/Col1.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Col2 from "../../assets/image/icon/Col2.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Col3 from "../../assets/image/icon/Col3.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Logo_web from "../../assets/image/img/Logo_web.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน

const CreateNewActivity = () => {
  const dispatch = useDispatch();
  const [statusCreateActivity, setStatusCreateActivity] = useState("activity"); //activity = กิจกรรม, criteria = เกณฑ์ ,Rewards = ของรางวัล,badge = ตราสัญลักษณ์

  const [language, setLanguage] = useState("th");
  const [rewardsNumber, setRewardsNumber] = useState(1);
  const fileInputRef = useRef(null);

  // ส่วนเก็บข้อมูล  กิจกรรม, nameActivity
  const [eventName, setEventName] = useState(""); // ชื่อกิจกรรม
  const [eventDetail, setEventDetail] = useState(""); //รายละเอียด กิจกรรม
  const [startDate, setStartDate] = useState(null); //ระยะเวลาการแสดงผล start
  const [endDate, setEndDate] = useState(null); //ระยะเวลาการแสดงผล end
  const [startDateActivity, setStartDateActivity] = useState(null); //ระยะเวลากิจกรรม start
  const [endDateActivity, setEndDateActivity] = useState(null); //ระยะเวลากิจกรรม * end

  //   ส่วนเก็บข้อมูล   เกณฑ์  activityType
  const [activityType, setActivityType] = useState(""); // ชื่อกิจกรรม
  const [limited, setLimited] = useState(true); //จำกัดผู้เข้าร่วม
  const [limitedNumber, setLimitedNumber] = useState(0); //จำนวนผู้เข้าร่วม
  const [criteria_distance, setCriteria_distance] = useState(true);
  const [distance, setDistance] = useState(null);
  const [criteria_walk_step, setCriteria_walk_step] = useState(true);
  const [walk_step, setWalk_step] = useState(null);

  // error  ส่วนเก็บข้อมูล  criteria ,เกณฑ์
  const [errorActivityType, setErrorActivityType] = useState(""); // ชื่อกิจกรรม
  const [errorLimitedNumber, setErrorLimitedNumber] = useState(null);
  const [errorDistance, setErrorDistance] = useState(null);
  const [errorWalk_step, setErrorWalk_step] = useState(null);

  //   ส่วนเก็บข้อมูล   Rewards รางวัล
  const [rewards, setRewards] = useState([
    { number: 1, name: "", image: "", quantity: "" },
    { number: 2, name: "", image: "", quantity: "" },
  ]);

  // error  ส่วนเก็บข้อมูล    Rewards รางวัล
  const [errorRewards, setErrorRewards] = useState(true);

  const addReward = () => {
    const newReward = {
      number: rewards.length + 1,
      name: "",
      image: "",
      quantity: "",
    };

    setRewards((prevRewards) => [...prevRewards, newReward]);
  };

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const handleStartDateChange = (date, event) => {
    if (event == "activity") {
      setStartDateActivity(date);
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date, event) => {
    if (event == "activity") {
      setEndDateActivity(date);
    } else {
      setEndDate(date);
    }
  };

  const handleTextareaChange = (number, value, name) => {
    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.number === number ? { ...reward, [name]: value } : reward
      )
    );
  };

  const handleImageClick = () => {
    // เมื่อคลิกที่รูปภาพ
    // เรียก click() method ของไฟล์อินพุท
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // เมื่อมีการเปลี่ยนแปลงในไฟล์อินพุท
    // ทำตามต้องการ เช่น ดึงข้อมูลไฟล์, อัปโหลดไปที่เซิร์ฟเวอร์, เปลี่ยนสถานะ, ฯลฯ
    const selectedFile = e.target.files[0];

    // สร้าง URL ของไฟล์ที่ถูกเลือก
    const imageUrl = URL.createObjectURL(selectedFile);
    setRewards((prevRewards) =>
      prevRewards.map((reward) =>
        reward.number === rewardsNumber
          ? { ...reward, image: imageUrl }
          : reward
      )
    );
  };

  const handleEventChange = (event) => {
    console.log("888", eventName);
    /*  dispatch(
      createEventActivity(
        "5555",
        "444",
        "12-12-2566",
        "12-12-2566",
        "12-12-2566",
        "12-12-2566",
        "1",
        "100",
        "113",
        "555",
        "asdasd",
        "9999",
        "assd",
        [
          {
            number: 1,
            name: "aa",
            image: "ddd",
            quantity: "fff",
          },
          {
            number: 2,
            name: "bb",
            image: "wss",
            quantity: "eeee",
          },
        ],
        "aaaa"
      )
    ); */
    if (event == "activity") {
      setStatusCreateActivity("criteria");
    } else if (event == "criteria") {
      setStatusCreateActivity("rewards");
    } else {
      console.log("888", eventName);
      const qty = "150";
      const creator = "thanet";

      /*       dispatch(
          createEventActivity(
            eventName,
            eventDetail,
            format(startDate, "dd-MM-yyyy"),
            format(endDate, "dd-MM-yyyy"),
            format(startDateActivity, "dd-MM-yyyy"),
            format(endDateActivity, "dd-MM-yyyy"),
            activityType,
            qty,
            limitedNumber,
            criteria_distance,
            distance,
            criteria_walk_step,
            walk_step,
            rewards,
            creator
          )
        ); */

      //createEventActivity
    }
  };

  const handleProcedureContentChange = (content) => {
    setEventDetail(content);
  };

  const repeal = (event) => {
    if (event == "activity") {
      setEventName("");
      setEventDetail("");
      setStartDate(null);
      setEndDate(null);
      setStartDateActivity(null);
      setEndDateActivity(null);
    } else if (event == "criteria") {
    } else {
    }
  };
  const createActivity = () => {
    const selectedLocale = language === "th" ? th : enUS;

    console.log("EventName", eventName);
    return (
      <>
        <div className={style["flex-row-date"]}>
          <div className="col-6">
            <p className={style["name-activity"]}>ชื่อกิจกรรม</p>
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={(event) => setEventName(event.target.value)}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="รายละอียดกิจกรรม"
            />
            {/*   {errorEventName && <div className="error-from">{errorEventName}</div>} */}
          </div>
          <div className="col-6 ml-3">
            <div className="col-12 ">
              <p className={style["name-activity"]}>ระยะเวลากิจกรรม</p>
              <div className={style["flex-row"]}>
                <div className={style["date-picker"]}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => handleStartDateChange(date, "results")}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="เริ่มต้น"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    locale={selectedLocale}
                  />

                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                    /*   onClick={onClick} */
                  />
                </div>
                <div className={`${style["date-picker"]} ${"ml-3"}`}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => handleEndDateChange(date, "results")}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="สิ้นสุด"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    locale={selectedLocale}
                  />
                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className={style["name-activity"]}>ช่วงที่แสดงผล</p>
              <div className={style["flex-row"]}>
                <div className={style["date-picker"]}>
                  <DatePicker
                    selected={startDateActivity}
                    onChange={(date) => handleStartDateChange(date, "activity")}
                    selectsStart
                    startDate={startDateActivity}
                    endDate={endDateActivity}
                    placeholderText="เริ่มต้น"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    locale={selectedLocale}
                  />
                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                    /*   onClick={onClick} */
                  />
                </div>
                <div className={`${"ml-3"} ${style["date-picker"]}`}>
                  <DatePicker
                    selected={endDateActivity}
                    onChange={(date) => handleEndDateChange(date, "activity")}
                    selectsEnd
                    startDate={startDateActivity}
                    endDate={endDateActivity}
                    minDate={startDateActivity}
                    placeholderText="สิ้นสุด"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    locale={selectedLocale}
                  />
                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                  />
                </div>
              </div>
            </div>

            {/*   {errorEventName && <div className="error-from">{errorEventName}</div>} */}
          </div>
        </div>
        <div className="mb-5">
          <p className={style["name-activity"]}>รายละเอียด/เงื่อนไขกิจกรรม</p>
          {/* <textarea
            className="form-control"
            name="eventDetail"
            onChange={(event) => setEventDetail(event.target.value)}
            id="exampleFormControlTextarea1"
            rows="5"
          ></textarea> */}
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={eventDetail}
            onChange={handleProcedureContentChange}
            style={{ height: "320px" }}
          />
        </div>

        <div className={style["flex-row-btn"]}>
          <button
            className={style["btn-cancel"]}
            onClick={() => repeal("activity")}
          >
            ละทิ้ง
          </button>

          <button
            className={
              eventName != "" &&
              eventDetail != "" &&
              startDate != null &&
              endDate != null &&
              startDateActivity != null &&
              endDateActivity != null
                ? style["btn-next-active"]
                : style["btn-next"]
            }
            onClick={
              eventName != "" &&
              eventDetail != "" &&
              startDate != null &&
              endDate != null &&
              startDateActivity != null &&
              endDateActivity != null
                ? () => handleEventChange("activity")
                : null
            }
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  };

  const createCriteria = () => {
    return (
      <>
        <div>
          <p className={style["name-activity"]}>
            ประเภทกิจกรรม <span>*</span>
          </p>
          <div className={style["flex-row-radios"]}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
                onChange={() => setActivityType("เดี่ยว")}
              />
              <label className="form-check-label" for="flexRadioDisabled">
                เดี่ยว
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
                onChange={() => setActivityType("เดี่ยว")}
              />
              <label className="form-check-label" for="flexRadioDisabled">
                กลุ่ม
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
                onChange={() => setActivityType("กำหนดเอง")}
              />
              <label className="form-check-label" for="flexRadioDisabled">
                กำหนดเอง
              </label>
            </div>
          </div>
          {errorActivityType && (
            <div className="error-from">{errorActivityType}</div>
          )}
          <p className={style["name-activity"]}>
            จำกัดผู้เข้าร่วม <span>*</span>
          </p>
          <div className={style["flex-row-radios"]}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="limited"
                id="flexRadioDisabled"
                onClick={() => setLimited(true)}
                checked={limited}
              />
              <label className="form-check-label" for="flexRadioDisabled">
                จำกัด
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="limited"
                id="flexRadioDisabled"
                onClick={() => setLimited(false)}
              />
              <label className="form-check-label" for="flexRadioDisabled">
                ไม่จำกัด
              </label>
            </div>
          </div>
          <div className="mt-3 mb-3 col-4">
            {limited && (
              <div className={style["box-person"]}>
                <input
                  type="number"
                  className="form-control "
                  id="exampleFormControlInput1"
                  onChange={(event) => setLimitedNumber(event.target.value)}
                  placeholder="จำนวนผู้เข้าร่วม"
                  min={0}
                />
                <div className={style["person"]}>คน</div>
              </div>
            )}
          </div>
          {errorLimitedNumber && (
            <div className="error-from">{errorLimitedNumber}</div>
          )}
          <p className={style["name-activity"]}>
            เป้าหมาย ระยะทาง <span>*</span>
          </p>
          <div className={style["flex-row"]}>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criteria_walk_step"
                  id="flexCheckDefault"
                  onChange={() => setCriteria_walk_step(true)}
                  checked={criteria_walk_step}
                />
                <label className="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criteria_walk_step"
                  id="flexCheckChecked"
                  onChange={() => setCriteria_walk_step(false)}
                />
                <label className="form-check-label" for="flexCheckChecked">
                  ผู้ที่ได้ระยะทางสูงสุด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div> */}
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="number"
                  className="form-control "
                  id="exampleFormControlInput1"
                  placeholder="จำนวนระยะทาง"
                  min={0}
                  onChange={(event) => setDistance(event.target.value)}
                />
                <div className={style["person"]}>กิโลเมตร</div>
              </div>
            </div>
          </div>
          {errorDistance && <div className="error-from">{errorDistance}</div>}
          <p className={style["name-activity"]}>
            เป้าหมาย ก้าวเดิน <span>*</span>
          </p>
          <div className={style["flex-row"]}>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="flexCheckDefault"
                  checked={criteria_distance}
                  /*  disabled={criteria_walk_step} */
                />
                <label className="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label className="form-check-label" for="flexCheckChecked">
                  ผู้ที่ได้ระยะทางสูงสุด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div> */}
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="number"
                  className="form-control "
                  id="exampleFormControlInput1"
                  placeholder="จำนวนก้าวเดิน"
                  min={0}
                  onChange={(event) => setWalk_step(event.target.value)}
                />
                <div className={style["person"]}>ก้าว</div>
              </div>
            </div>
          </div>
          {errorWalk_step && <div className="error-from">{errorWalk_step}</div>}
        </div>
        <div className={style["flex-row-btn-ml"]}>
          <button
            className={style["btn-cancel"]}
            onClick={() => setStatusCreateActivity("activity")}
          >
            ยกเลิก
          </button>
          <button
            className={style["btn-next"]}
            onClick={() => handleEventChange("criteria")}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  };

  const createRewards = () => {
    return (
      <>
        <div className={style["overflow-x"]}>
          <div className={`${style["box-rewards"]} ${style["flex-row"]}`}>
            {rewards &&
              rewards.map((reward) => (
                <div key={reward.number}>
                  <div
                    className={
                      reward.number === rewardsNumber
                        ? style["rewards-active"]
                        : style["rewards"]
                    }
                    onClick={() => {
                      setRewards((prevRewards) =>
                        prevRewards.map((prevReward) =>
                          prevReward.number === reward.number
                            ? { ...prevReward }
                            : prevReward
                        )
                      );
                      setRewardsNumber(reward.number);
                    }}
                  >
                    รางวัลที่ {reward.number}
                  </div>
                </div>
              ))}
            <div style={{ width: 170 }}>
              <div className={style["add-rewards"]} onClick={addReward}>
                +เพิ่มของรางวัล
              </div>
            </div>
          </div>
        </div>
        {rewards &&
          rewards.map((reward) => {
            return (
              rewardsNumber == reward.number && (
                <div key={reward.number}>
                  <p className={style["name-activity"]}>
                    ชื่อรางวัลที่ {reward.number} (ห้ามเกิน 2 บรรทัด){" "}
                    <span>*</span>
                  </p>
                  <textarea
                    className="form-control"
                    value={reward.name}
                    id={`exampleFormControlTextarea${reward.number}`}
                    rows="2"
                    name="name"
                    onChange={(e) =>
                      handleTextareaChange(
                        reward.number,
                        e.target.value,
                        e.target.name
                      )
                    }
                  ></textarea>
                  {!errorRewards && rewards[rewardsNumber - 1].name == "" && (
                    <div className="error-from">กรุณาระบุข้อมูล</div>
                  )}

                  <p className={style["name-activity"]}>
                    อัพโหลดรูปของรางวัล <span>*</span>
                  </p>
                  <img
                    src={reward.image !== "" ? reward.image : Group7728}
                    alt="calendar"
                    className={style["group7728"]}
                    onClick={() => handleImageClick(reward.number)}
                  />
                  {!errorRewards && rewards[rewardsNumber - 1].image == "" && (
                    <div className="error-from">กรุณาระบุข้อมูล</div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <p className={style["name-activity"]}>
                    จำนวนของรางวัล <span>*</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    id={`exampleFormControlInput${reward.number}`}
                    placeholder="ใส่ตัวเลข"
                    value={reward.quantity}
                    name="quantity"
                    onChange={(e) =>
                      handleTextareaChange(
                        reward.number,
                        e.target.value,
                        e.target.name
                      )
                    }
                  />
                  {!errorRewards &&
                    rewards[rewardsNumber - 1].quantity == "" && (
                      <div className="error-from">กรุณาระบุข้อมูล</div>
                    )}
                </div>
              )
            );
          })}
        <div className={style["flex-row-btn-ml"]}>
          <button
            className={style["btn-cancel"]}
            onClick={() => setStatusCreateActivity("criteria")}
          >
            ยกเลิก
          </button>
          <button
            className={style["btn-next"]}
            onClick={() => handleEventChange("rewards")}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={style["nav-logo"]}>
        <img src={Logo_web} className={style["img-Logo_web"]} />
        <div className={style["flex-row"]}>
          <span className={style["user-name"]}>Vudhinond Pri.</span>
          <img src={User} className={style["img-User"]} />
        </div>
      </div>
      <div className={style["flex-row"]}>
        <div className={style["challenge"]}>
          <div className={style["box-new-activity"]}>
            <p className={style["new-activity"]}>สร้างกิจกรรมใหม่</p>
            <div className={style["flex-row"]}>
              <img
                src={
                  statusCreateActivity == "activity"
                    ? Col2
                    : statusCreateActivity != "activity"
                    ? Col3
                    : Col1
                }
                className={style["img-col"]}
              />
              <div className={style["span-col"]} />
              <img
                src={
                  statusCreateActivity == "criteria"
                    ? Col2
                    : statusCreateActivity == "rewards"
                    ? Col3
                    : Col1
                }
                className={style["img-col"]}
              />
              <div className={style["span-col"]} />
              <img
                src={
                  statusCreateActivity == "rewards"
                    ? Col2
                    : statusCreateActivity == "rewards"
                    ? Col3
                    : Col1
                }
                className={style["img-col"]}
              />
            </div>
          </div>

          {statusCreateActivity == "activity"
            ? createActivity()
            : statusCreateActivity == "criteria"
            ? createCriteria()
            : createRewards()}
        </div>
      </div>
    </>
  );
};
export default CreateNewActivity;
