import React, { useState, useEffect } from "react";
import style from "../../assets/css/createNewActivity.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th"; // import locale ภาษาไทย
import enUS from "date-fns/locale/en-US"; // import locale ภาษาอังกฤษ

import calendarIcon from "../../assets/image/icon/date.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน

const CreateNewActivity = () => {
  const [statusCreateActivity, setStatusCreateActivity] = useState("activity"); //activity = กิจกรรม, criteria = เกณฑ์ ,Rewards = ของรางวัล,badge = ตราสัญลักษณ์
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateActivity, setStartDateActivity] = useState(null);
  const [endDateActivity, setEndDateActivity] = useState(null);
  const [language, setLanguage] = useState("th");

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

  const selectedLocale = language === "th" ? th : enUS;

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
          <div>
            <p className={style["name-activity"]}>
              ชื่อกิจกรรม <span>*</span>
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
              <button className={style["btn-cancel"]}>ยกเลิก</button>
              <button className={style["btn-next"]}>ถัดไป</button>
            </div>
        </div>
      </div>
    </>
  );
};
export default CreateNewActivity;
