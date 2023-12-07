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

  const [language, setLanguage] = useState("th");
  const [rewardsNumber, setRewardsNumber] = useState(1);
  const fileInputRef = useRef(null);

  // ส่วนเก็บข้อมูล  กิจกรรม, nameActivity
  const [event_name, setEvent_name] = useState(""); // ชื่อกิจกรรม
  const [event_detail, setEvent_detail] = useState(""); //รายละเอียด กิจกรรม
  const [startDate, setStartDate] = useState(null); //ระยะเวลาการแสดงผล start
  const [endDate, setEndDate] = useState(null); //ระยะเวลาการแสดงผล end
  const [startDateActivity, setStartDateActivity] = useState(null); //ระยะเวลากิจกรรม start
  const [endDateActivity, setEndDateActivity] = useState(null); //ระยะเวลากิจกรรม * end

  // error  ส่วนเก็บข้อมูล กิจกรรม
  const [errorEvent_name, setErrorEvent_name] = useState(""); // ชื่อกิจกรรม
  const [errorEvent_detail, setErrorEvent_detail] = useState(""); //รายละเอียด กิจกรรม
  const [errorStartDate, setErrorStartDate] = useState(null); //ระยะเวลาการแสดงผล
  const [errorEndDate, setErrorEndDate] = useState(null); //ระยะเวลากิจกรรม
  const [errorStartDateActivity, setErrorStartDateActivity] = useState(null); //ระยะเวลากิจกรรม start
  const [errorEndDateActivity, setErrorEndDateActivity] = useState(null); //ระยะเวลากิจกรรม * end

  //   ส่วนเก็บข้อมูล   เกณฑ์  activityType
  const [activityType, setActivityType] = useState(""); // ชื่อกิจกรรม
  const [limited, setLimited] = useState(true);
  const [limitedNumber, setLimitedNumber] = useState(null);
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
  const [errorRewards, setErrorRewards] = useState([
    { number: 1, name: "", image: "", quantity: "" },
    { number: 2, name: "", image: "", quantity: "" },
  ]);
  const [errorNumber, setErrorNumber] = useState(false);

  const addReward = () => {
    const newReward = {
      number: rewards.length + 1,
      name: "",
      image: "",
      quantity: "",
    };

    setRewards((prevRewards) => [...prevRewards, newReward]);
    setErrorRewards((prevRewards) => [...prevRewards, newReward]);
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

  const validateActivity = () => {
    let isValid = true;
    setErrorEvent_name("");
    setErrorEvent_detail("");
    setErrorStartDate("");
    setErrorEndDate("");
    setErrorStartDateActivity("");
    setErrorEndDateActivity("");
    //
    if (!event_name.trim()) {
      setErrorEvent_name("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!event_detail.trim()) {
      setErrorEvent_detail("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!startDate) {
      setErrorStartDate("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!endDate) {
      setErrorEndDate("กรุณาระบุข้อมูล");
      isValid = false;
    }

    if (!startDateActivity) {
      setErrorStartDateActivity("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!endDateActivity) {
      setErrorEndDateActivity("กรุณาระบุข้อมูล");
      isValid = false;
    }

    return isValid;
  };
  const validateCriteria = () => {
    let isValid = true;
    setErrorActivityType("");
    setErrorLimitedNumber("");
    setErrorDistance("");
    setErrorWalk_step("");

    //
    if (!activityType.trim()) {
      setErrorActivityType("กรุณาระบุข้อมูล");
      isValid = false;
    }

    if (!limitedNumber && limited) {
      setErrorLimitedNumber("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!distance) {
      setErrorDistance("กรุณาระบุข้อมูล");
      isValid = false;
    }
    if (!walk_step) {
      setErrorWalk_step("กรุณาระบุข้อมูล");
      isValid = false;
    }

    return isValid;
  };
  const validationRewards = () => {
    let isValid = true;
    setErrorNumber(false);

    // ทำการตรวจสอบ errorRewards ทุกรายการ
    const validatedRewards = errorRewards.map((errorReward) => {
      // ตรวจสอบตามเงื่อนไขที่คุณต้องการ
      const hasError =
        errorReward.name.trim() === "" ||
        errorReward.image.trim() === "" ||
        errorReward.quantity.trim() === "";

      // ในกรณีมีข้อผิดพลาด
      if (hasError) {
        isValid = false;

        // ให้เอาค่าจาก errorReward ไปใส่ใน rewards
        const newReward = rewards.find(
          (reward) => reward.number === errorReward.number
        );

        // แสดงค่า reward.number ใน console.log
        if (newReward) {
          console.log(`Number ${newReward.number} มีข้อมูลไม่ถูกต้อง`);
        }

        // นำ newReward มาใส่ใน validatedRewards
        return newReward || errorReward;
      }

      return errorReward;
    });

    // ทำการอัพเดท state หรือดำเนินการต่อไปตามที่คุณต้องการ
    setErrorRewards(validatedRewards);
    setErrorNumber(true);

    // สามารถใช้ isValid เพื่อทำสิ่งที่ต้องการในกรณีที่ค่าไม่ถูกต้อง
    if (!isValid) {
      // ทำสิ่งที่คุณต้องการ เช่น แสดงข้อความผิดพลาด
      console.log("มีข้อมูลไม่ถูกต้อง");

      // แสดงข้อมูล rewards ที่มีข้อผิดพลาด
      validatedRewards.forEach((reward, index) => {
        if (reward.hasError) {
          console.log(`Number ${reward.number} มีข้อมูลไม่ถูกต้อง`);
          console.log("Replaced rewards:", reward);
        }
      });
    }

    return isValid;
  };

  console.log("rewards", rewards);
  const handleEventChange = (event) => {
    console.log("event", event);
    if (event == "activity") {
      if (validateActivity()) {
        setStatusCreateActivity("criteria");
      }
    } else if (event == "criteria") {
      if (validateCriteria()) {
        setStatusCreateActivity("rewards");
      }
    } else {
      if (validationRewards()) {
        /*  setStatusCreateActivity("rewards"); */
      }
    }
  };

  console.log("errorRewards", errorRewards);

  const createActivity = () => {
    const selectedLocale = language === "th" ? th : enUS;
    return (
      <>
        <div>
          <p className={style["name-activity"]}>
            ชื่อกิจกรรม <span>*</span>
          </p>
          <input
            type="text"
            name="event_name"
            onChange={(event) => setEvent_name(event.target.value)}
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="รายละอียดกิจกรรม"
          />
          {errorEvent_name && (
            <div className="error-from">{errorEvent_name}</div>
          )}
        </div>
        <div>
          <p className={style["name-activity"]}>
            รายละเอียด/เงื่อนไขกิจกรรม <span>*</span>
          </p>
          <textarea
            class="form-control"
            name="event_detail"
            onChange={(event) => setEvent_detail(event.target.value)}
            id="exampleFormControlTextarea1"
            rows="5"
          ></textarea>
          {errorEvent_detail && (
            <div className="error-from">{errorEvent_detail}</div>
          )}
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
            {errorStartDate && (
              <div className="error-from">{errorStartDate}</div>
            )}
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
            {errorEndDate && <div className="error-from">{errorEndDate}</div>}
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
            {errorStartDateActivity && (
              <div className="error-from">{errorStartDateActivity}</div>
            )}
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
            {errorEndDateActivity && (
              <div className="error-from">{errorEndDateActivity}</div>
            )}
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
            onClick={() => handleEventChange("activity")}
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
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="activityType"
                id="flexRadioDisabled"
                onChange={() => setActivityType("เดี่ยว")}
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
                onChange={() => setActivityType("เดี่ยว")}
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
                onChange={() => setActivityType("กำหนดเอง")}
              />
              <label class="form-check-label" for="flexRadioDisabled">
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
                  onChange={(event) => setLimitedNumber(event.target.value)}
                  placeholder="จำนวนผู้เข้าร่วม"
                  checked={limited}
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
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="criteria_walk_step"
                  id="flexCheckDefault"
                  onChange={() => setCriteria_walk_step(true)}
                  checked={criteria_walk_step}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              {/* <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="criteria_walk_step"
                  id="flexCheckChecked"
                  onChange={() => setCriteria_walk_step(false)}
                />
                <label class="form-check-label" for="flexCheckChecked">
                  ผู้ที่ได้ระยะทางสูงสุด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div> */}
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="number"
                  class="form-control "
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
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="flexCheckDefault"
                  checked={criteria_distance}
                  /*  disabled={criteria_walk_step} */
                />
                <label class="form-check-label" for="flexCheckDefault">
                  ครบระยะทางที่กำหนด{" "}
                  <span className={style["span-red"]}>*</span>
                </label>
              </div>
              {/* <div class="form-check">
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
              </div> */}
            </div>
            <div>
              <div className={`${style["box-person"]} ${style["ml"]}`}>
                <input
                  type="number"
                  class="form-control "
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
    console.log("errorNumber", errorNumber);
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
                  {errorNumber &&
                    errorRewards[rewardsNumber - 1].name == "" && (
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
                  {errorNumber &&
                    errorRewards[rewardsNumber - 1].image == "" && (
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
                  {errorNumber &&
                    errorRewards[rewardsNumber - 1].quantity == "" && (
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
