import React, { useState, useEffect, useRef } from "react";
import style from "../../assets/css/createNewActivity.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; // import locale ภาษาไทย
import enUS from "date-fns/locale/en-US"; // import locale ภาษาอังกฤษ

import calendarIcon from "../../assets/image/icon/date.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import Group7728 from "../../assets/image/icon/Group7728.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน

const CreateNewActivity = () => {
  const [statusCreateActivity, setStatusCreateActivity] = useState("activity"); //activity = กิจกรรม, criteria = เกณฑ์ ,Rewards = ของรางวัล,badge = ตราสัญลักษณ์
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateActivity, setStartDateActivity] = useState(null);
  const [endDateActivity, setEndDateActivity] = useState(null);
  const [language, setLanguage] = useState("th");
  const [limited, setLimited] = useState(true);
  const [limitedNumber, setLimitedNumber] = useState("จำกัด");
  const [rewardsNumber, setRewardsNumber] = useState(1);
  const fileInputRef = useRef(null);
  const [rewards, setRewards] = useState([
    { number: 1, name: "", image: "", quantity: "" },
    { number: 2, name: "", image: "", quantity: "" },
  ]);

  const addReward = () => {
    const newReward = {
      number: rewards.length + 1,
      name: "",
      image: "",
      quantity: "",
    };

    setRewards((prevRewards) => [...prevRewards, newReward]);
  };
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
    console.log("Selected file:", selectedFile);
  };

  const createActivity = () => {
    const selectedLocale = language === "th" ? th : enUS;
    return (
      <>
        <div>
          <p className={style["name-activity"]}>
            ประเภทกิจกรรม <span>*</span>
          </p>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="รายละอียดกิจกรรม"
          />
        </div>
        <div>
          <p className={style["name-activity"]}>
            รายละเอียด/เงื่อนไขกิจกรรม <span>*</span>
          </p>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
          ></textarea>
        </div>
        <p className={style["period"]}>
          ระยะเวลาการแสดงผล <span>*</span>
        </p>
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
          <span>&nbsp;&nbsp;{" - "}&nbsp;&nbsp;</span>
          <div className={style["date-picker"]}>
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
        <p className={style["period"]}>
          ระยะเวลากิจกรรม <span>*</span>
        </p>
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
            />
          </div>
          <span>&nbsp;&nbsp;{" - "}&nbsp;&nbsp;</span>
          <div className={style["date-picker"]}>
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
        <div className={style["flex-row-btn"]}>
          <button
            className={style["btn-cancel"]}
            onClick={() => setStatusCreateActivity("activity")}
          >
            ยกเลิก
          </button>
          <button
            className={style["btn-next"]}
            onClick={() => setStatusCreateActivity("criteria")}
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
            ชื่อกิจกรรม <span>*</span>
          </p>
          <div className={style["flex-row-radios"]}>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
              />
              <label class="form-check-label" for="flexRadioDisabled">
                เดี่ยว
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
              />
              <label class="form-check-label" for="flexRadioDisabled">
                กลุ่ม
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
              />
              <label class="form-check-label" for="flexRadioDisabled">
                กำหนดเอง
              </label>
            </div>
          </div>
          <p className={style["name-activity"]}>
            จำกัดผู้เข้าร่วม <span>*</span>
          </p>
          <div className={style["flex-row-radios"]}>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="limited"
                id="flexRadioDisabled"
                onClick={() => setLimited(true)}
                checked={limited}
              />
              <label class="form-check-label" for="flexRadioDisabled">
                จำกัด
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="limited"
                id="flexRadioDisabled"
                onClick={() => setLimited(false)}
              />
              <label class="form-check-label" for="flexRadioDisabled">
                ไม่จำกัด
              </label>
            </div>
          </div>
          <div className="mt-3 mb-3 col-4">
            {limited && (
              <div className={style["box-person"]}>
                <input
                  type="text"
                  class="form-control "
                  id="exampleFormControlInput1"
                  placeholder="จำนวนผู้เข้าร่วม"
                />
                <div className={style["person"]}>คน</div>
              </div>
            )}
          </div>
          <p className={style["name-activity"]}>
            เป้าหมาย ระยะทาง <span>*</span>
          </p>
          <div className={style["flex-row"]}>
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  ผู้ที่ได้ระยะทางสูงสุด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="text"
                  class="form-control "
                  id="exampleFormControlInput1"
                  placeholder="จำนวนระยะทาง"
                />
                <div className={style["person"]}>กิโลเมตร</div>
              </div>
            </div>
          </div>
          <p className={style["name-activity"]}>
            เป้าหมาย ก้าวเดิน <span>*</span>
          </p>
          <div className={style["flex-row"]}>
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  ผู้ที่ได้ระยะทางสูงสุด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="text"
                  class="form-control "
                  id="exampleFormControlInput1"
                  placeholder="จำนวนระยะทาง"
                />
                <div className={style["person"]}>กิโลเมตร</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style["flex-row-btn-ml"]}>
          <button className={style["btn-cancel"]}>ยกเลิก</button>
          <button
            className={style["btn-next"]}
            onClick={() => setStatusCreateActivity("rewards")}
          >
            ถัดไป 555
          </button>
        </div>
      </>
    );
  };

  const createRewards = () => {
    console.log("rewards", rewards);
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
                  <p className={style["name-activity"]}>
                    อัพโหลดรูปของรางวัล <span>*</span>
                  </p>
                  <img
                    src={reward.image !== "" ? reward.image : Group7728}
                    alt="calendar"
                    className={style["group7728"]}
                    onClick={() => handleImageClick(reward.number)}
                  />
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
                </div>
              )
            );
          })}
        <div className={style["flex-row-btn-ml"]}>
          <button className={style["btn-cancel"]}>ยกเลิก</button>
          <button
            className={style["btn-next"]}
            onClick={() => setStatusCreateActivity("rewards")}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={style["flex-row"]}>
        <div className={style["box-challenge"]}>{">"} Challenge </div>
        <div className={style["challenge"]}>
          <div className={style["box-new-activity"]}>สร้างกิจกรรมใหม่</div>
          <div className={style["flex-row-criteria"]}>
            <div>
              <div>กิจกรรม</div>
              {statusCreateActivity == "activity" && (
                <div className={style["hr"]} />
              )}
            </div>
            <div>
              <div>Criteria</div>
              {statusCreateActivity == "criteria" && (
                <div className={style["hr"]} />
              )}
            </div>
            <div>
              <div>ของรางวัล</div>
              {statusCreateActivity == "rewards" && (
                <div className={style["hr"]} />
              )}
            </div>
            <div>
              <div>Badge</div>
              {statusCreateActivity == "badge" && (
                <div className={style["hr"]} />
              )}
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
