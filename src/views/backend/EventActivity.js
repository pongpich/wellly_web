import React, { useState, useEffect, useRef } from "react";
import style from "../../assets/css/EventActivity.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Group7878 from "../../assets/image/icon/Group7878.png";
import active from "../../assets/image/icon/active.png";
import mag from "../../assets/image/icon/mag.png";
import search_but from "../../assets/image/icon/search_but.png";
import DatePicker from "react-datepicker";
import calendarIcon from "../../assets/image/icon/date.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/icon/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth";
import NavBackend from "./NavBackend";
import { getEventActivity } from "../../redux/get";
import formattedDate from "../../components/formatDate";
import { format, parse } from "date-fns";

let dateNew = new Date();

const customStyles = {
  rows: {
    style: {
      // minHeight: '72px', // override the row height
      // backgroundColor:'black'
      borderRightStyle: "solid",
      borderRightWidth: "1px",
      borderRightColor: "#D2E6EA",
    },
  },
  headCells: {
    style: {
      // fontWeight:'Regular',
      fontFamily: "Bold",
      fontSize: "14px",
      // borderBottomStyle: 'solid',
      // borderBottomWidth: '1px',
      // borderBottomColor: '#D2E6EA',

      fontSize: "14px",
    },
  },
  cells: {
    style: {
      // backgroundColor:'red'
      fontFamily: "Regular",
      // borderBottomStyle: 'solid',
      // borderBottomWidth: '1px',
      // borderBottomColor: '#D2E6EA',
      borderLeftStyle: "solid",
      borderLeftWidth: "1px",
      borderLeftColor: "#D2E6EA",

      fontSize: "14px",
    },
  },
  headRow: {
    style: {},
  },
};

const columns = [
  {
    name: "ลำดับ",
    selector: (row) => row.id,
    sortable: true,
    width: "5%",
  },
  {
    name: "สถานะ",
    selector: (row) => row.status,
    sortable: true,

    cell: (row) => (
      <div>
        {/*   {parse(row.start_date, "dd-MM-yyyy", new Date()) >= dateNew &&
        parse(row.end_date, "dd-MM-yyyy", new Date()) <= dateNew ? (
          <div className={style["active-text"]}>Active</div>
        ) : (
          <div>Waiting</div>
        )} */}
        {parse(row.start_date, "dd-MM-yyyy", new Date()) <= dateNew &&
        dateNew <= parse(row.end_date, "dd-MM-yyyy", new Date()) ? (
          <div className={style["active-text"]}>Active</div>
        ) : (
          <div>Waiting</div>
        )}
      </div>
    ),
    width: "6%",
  },
  {
    name: "ชื่อกิจกรรม",
    // selector: (row) => row.event_name,
    cell: (row) => (
      <div style={{ fontFamily: "Bold" }}>
        <p>{row.event_name}</p>
      </div>
    ),
    width: "40%",
  },
  {
    name: "ระยะเวลากิจกรรม",
    selector: (row) => row.actTimeThai,
    sortable: true,
    width: "12%",
  },
  {
    name: "ช่วงที่แสดงผล",
    selector: (row) => row.showTimeThai,
    sortable: true,
    width: "12%",
  },
  {
    name: "วันที่สร้าง",
    // selector: (row) => row.createformat,
    cell: (row) => (
      <div>
        <p>{row.createformat}</p>
        {row.creator && (
          <div style={{ marginTop: "-10px", marginBottom: "8px" }}>
            <img alt={row.createformat} src={mag}></img> &nbsp;{row.creator}
          </div>
        )}
      </div>
    ),
    sortable: true,
    width: "12.75%",
  },
  {
    name: "แก้ไขล่าสุด",
    cell: (row) => (
      <div>
        <p>{row.updateformat}</p>
        {row.editor && (
          <div style={{ marginTop: "-10px", marginBottom: "8px" }}>
            <img alt={row.createformat} src={mag}></img> &nbsp;{row.editor}
          </div>
        )}
      </div>
    ),
    sortable: true,
    width: "12.75%",
  },
];

const data = [
  {
    id: 1,
    status: "Active",
    event_name: "วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง",
    start_date: "1/1/2566 - 30/1/66",
    end_date: "นานะ (1/1/2566 16:00)",
    updated_at: "นานะ (1/1/2566 16:00)",
  },
  {
    id: 2,
    status: "Active",
    event_name: "วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง",
    start_date: "1/1/2566 - 30/1/66",
    end_date: "นานะ (1/1/2566 16:00)",
    updated_at: "นานะ (1/1/2566 16:00)",
  },
  {
    id: 3,
    status: "Active",
    event_name: "วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง",
    start_date: "1/1/2566 - 30/1/66",
    end_date: "นานะ (1/1/2566 16:00)",
    updated_at: "นานะ (1/1/2566 16:00)",
  },
];

const EventActivity = () => {
  const [user_admin_name, setUserAdminName] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { event } = useSelector(({ get }) => (get ? get : ""));
  const [activity, setActivity] = useState(event);
  // const { event } = useSelector(({ get }) => (get ? get : ""));
  const [afterformate, setAfterfotmat] = useState([]);

  // console.log(testjson[0].start_date);
  function toThaiDateString(date) {
    let monthNames = [
      "ม.ค",
      "ก.พ",
      "มี.ย.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค..",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    // console.log(date);
    let year = (date.getFullYear() + 543).toString().substr(-2);
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    return `${numOfDay} ${month} ${year}`;
  }

  const datatodate = (file) => {
    const words = file.split("-");
    var f = new Date(words[2], words[1] - 1, words[0]);

    return toThaiDateString(f);
  };

  const newFotomatData = () => {
    const newState = activity.map((obj) => {
      return {
        ...obj,
        actTimeThai:
          datatodate(obj.start_date) + " - " + datatodate(obj.end_date),
        showTimeThai:
          datatodate(obj.start_date_show) +
          " - " +
          datatodate(obj.end_date_show),
        createformat:
          datatodate(
            obj.created_at.split("T")[0].split("-").reverse().join("-")
          ) +
          " - " +
          obj.created_at.split("T")[1].split(":", 2).join(":") +
          " น.",
        updateformat:
          datatodate(
            obj.updated_at.split("T")[0].split("-").reverse().join("-")
          ) +
          " - " +
          obj.updated_at.split("T")[1].split(":", 2).join(":") +
          " น.",
      };
    });
    setAfterfotmat(newState);
  };
  useEffect(() => {
    setActivity(event);
    newFotomatData();
  }, [event]);

  useEffect(() => {
    newFotomatData();
  }, [activity]);

  useEffect(() => {
    getUser();
    /* console.log(user); */
  }, [user]);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
    dispatch(getEventActivity());
  }, []);

  const getUser = async () => {
    const currUser = await sessionStorage.getItem("login_status");
    if (currUser != null) {
      setUser(currUser);
    }
  };

  const isLogged = !!sessionStorage.getItem("login_status");

  const handelLogout = async () => {
    await sessionStorage.removeItem("login_status");
    setUser(null);
    dispatch(logout());
    navigate("/login");
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateActivity, setStartDateActivity] = useState(null);
  const [endDateActivity, setEndDateActivity] = useState(null);
  const [selectStatusActive, setSelectStatusActive] = useState("All");
  const handleEndDateChange = (date, event) => {
    if (event == "activity") {
      setEndDateActivity(date);
    } else {
      setEndDate(date);
    }
  };

  const handleStartDateChange = (date, event) => {
    if (event == "activity") {
      setStartDateActivity(date);
    } else {
      setStartDate(date);
    }
  };

  const navigate = useNavigate();

  function handleClick() {
    navigate("/create-new-activity");
  }

  const handelSearch = (e) => {
    const filteredEvents = activity.filter((item) =>
      item.event_name.toLowerCase().includes(e)
    );
    console.log("filteredEvents", filteredEvents);
    if (filteredEvents.length > 0) {
      setActivity(filteredEvents);
    }
    if (e.length < 1) {
      setActivity(event);
    }
  };

  const handelSearchDate = () => {
    handleClickClear();
    const filteredEvents = activity.filter((item) => {
      const startDateInRange =
        parse(item.start_date, "dd-MM-yyyy", new Date()) >= startDate;
      const endDateInRange =
        parse(item.end_date, "dd-MM-yyyy", new Date()) <= endDate;

      return startDateInRange && endDateInRange;
    });
    // Check if filteredEvents has items
    if (filteredEvents.length > 0) {
      setActivity(filteredEvents);
    } else {
      // Do something when there are no matching events
      console.log("No matching events found.");
    }
  };

  useEffect(() => {
  
    if (selectStatusActive == "Active") {
      const filteredEvents = activity.filter((item) => {
        const startDateInRange =
          dateNew >= parse(item.start_date, "dd-MM-yyyy", new Date());
        const endDateInRange =
          dateNew <= parse(item.end_date, "dd-MM-yyyy", new Date());

        return startDateInRange && endDateInRange;
      });

      // Check if filteredEvents has items
      if (filteredEvents.length > 0) {
        setActivity(filteredEvents);
      }
    } else if (selectStatusActive == "Waiting") {
      const filteredEvents = activity.filter((item) => {
        const dateIsBeforeStart =
          dateNew < parse(item.start_date, "dd-MM-yyyy", new Date());
        const dateIsAfterEnd =
          dateNew > parse(item.end_date, "dd-MM-yyyy", new Date());
        return dateIsBeforeStart || dateIsAfterEnd;
      });
      if (filteredEvents.length > 0) {
        setActivity(filteredEvents);
      }
    }
  }, [selectStatusActive]);

  const handleClickClear = () => {
    setSelectStatusActive("All");
    setActivity(event);
    setStartDate(null);
    setEndDate(null);
  };
  /* 
  console.log("dateNew", dateNew); */
  return (
    <>
      <NavBackend />
      <div className={style["flex-row"]}>
        <div className={style["challenge"]}>
          <div className={style["grid-item2"]}>
            <div className={style["grid-container2"]}>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  className={style["input-name"]}
                  onChange={(e) => handelSearch(e.target.value)}
                />
              </div>
              <div>
                <select
                  id="cars"
                  name="cars"
                  value={selectStatusActive}
                  onChange={(e) => setSelectStatusActive(e.target.value)}
                  className={style["input-status"]}
                >
                  <option value="All">ทั้งหมด</option>
                  <option value="Active">Active</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>
              <div>
                <div className={style["date-picker1"]}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="เริ่มต้น"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    // locale={selectedLocale}
                  />
                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                    /*   onClick={onClick} */
                  />
                </div>
              </div>
              <div>
                <div className={style["date-picker2"]}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="สิ้นสุด"
                    dateFormat="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงใน input
                    dateFormatCalendar="dd MMMM yyyy" // กำหนดรูปแบบวันที่ที่แสดงในปฏิทิน
                    // locale={selectedLocale}
                  />
                  <img
                    src={calendarIcon}
                    alt="calendar"
                    className={style["calendar"]}
                  />
                </div>
              </div>
              <div>
                <img
                  src={search_but}
                  alt="search_but"
                  // className={style["calendar"]}
                  onClick={handelSearchDate}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={style["title-header"]}>กิจกรรม</div>
            <div className={style["clear-search"]} onClick={handleClickClear}>
              ล้างการค้นหา
            </div>
            <button className={style["btn-create"]} onClick={handleClick}>
              สร้างกิจกรรม
            </button>
          </div>

          <div className={style["table"]}>
            <DataTable
              columns={columns}
              data={afterformate}
              // dense
              direction="auto"
              fixedHeaderScrollHeight="300px"
              noContextMenu
              noHeader
              highlightOnHover
              striped
              pagination
              responsive
              subHeaderAlign="right"
              subHeaderWrap
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EventActivity;
