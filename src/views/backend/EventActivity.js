import React, { useState, useEffect, useRef } from "react";
import style from "../../assets/css/EventActivity.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Group7878 from "../../assets/image/icon/Group7878.png";
import DatePicker from "react-datepicker";
import calendarIcon from "../../assets/image/icon/date.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/icon/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth";
import NavBackend from "./NavBackend";
import { getEventActivity } from "../../redux/get"

const columns = [
    {
        name: "ลำดับ",
        selector: (row) => row.id,
        sortable: true,
    },
    {
        name: "สถานะ",
        selector: (row) => row.status,
        sortable: true,
    },
    {
        name: "ชื่อกิจกรรม",
        selector: (row) => row.event_name,
    },
    {
        name: "ระยะเวลากิจกรรม",
        selector: (row) => row.actTimeThai,
        sortable: true,
    },
    {
        name: "ช่วงที่แสดงผล",
        selector: (row) => row.showTimeThai,
        sortable: true,
    },
    {
        name: "วันที่สร้าง",
        selector: (row) => row.createformat,
        sortable: true,
    },
    {
        name: "แก้ไขล่าสุด",
        selector: (row) => row.updateformat,
        sortable: true,
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
    // const [activity, setActivity] = useState(null);
    // const { event } = useSelector(({ get }) => (get ? get : ""));
    const [test, setTest] = useState([]);
    const [afterformate, setAfterfotmat] = useState([]);


    
    // console.log(testjson[0].start_date);
    function toThaiDateString(date) {
        let monthNames = [
            "ม.ค", "ก.พ", "มี.ย.", "เม.ย.",
            "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค..",
            "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
        ];

        // console.log(date);
        let year = (date.getFullYear() + 543).toString().substr(-2);
        let month = monthNames[date.getMonth()];
        let numOfDay = date.getDate();

        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let second = date.getSeconds().toString().padStart(2, "0");

        return `${numOfDay} ${month} ${year}`
    }

    const datatodate = (file) => {
        const words = file.split('-');
        var f = new Date(words[2], words[1] - 1, words[0])
        return toThaiDateString(f);
        
    }
    useEffect(() => {
        console.log({ event });
        setTest(event)
        console.log(test);
        setActivity(event)

        const newState = test.map(obj => {

            return {
                ...obj
                , actTimeThai: datatodate(obj.start_date) + ' - ' + datatodate(obj.end_date)
                , showTimeThai: datatodate(obj.start_date_activity) + ' - ' + datatodate(obj.end_date_activity)
                , createformat: datatodate(((obj.created_at).split('T')[0]).split("-").reverse().join("-"))+' - ' + ((obj.created_at).split('T')[1]).split(":", 2).join(":") + ' น.' 
                , updateformat: datatodate(((obj.updated_at).split('T')[0]).split("-").reverse().join("-"))+' - ' + ((obj.updated_at).split('T')[1]).split(":", 2).join(":") + ' น.' 
            };
        });
        setAfterfotmat(newState);
        console.log(newState, 'data');

    }, [event]);

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

    // const selectedLocale = language === "th" ? th : enUS;
    // const [language, setLanguage] = useState("th");

    return (
        <>
            <NavBackend />
            <div className={style["flex-row"]}>
                <div className={style["challenge"]}>

                    <div className={style["challenge-title"]}>Challenge</div>

                    <div className={style["grid-container"]}>
                        <div className={style["grid-item1"]}>
                            <img
                                src={Group7878}
                                alt="filter"
                                className={style["filter-logo"]}
                            />
                        </div>
                        <div className={style["grid-item2"]}>
                            <div className={style["grid-container2"]}>
                                <div>
                                    <p className={style["name-activity"]}>
                                        ชื่อกิจกรรม/ผู้สร้าง/ผู้แก้ไข
                                    </p>
                                    <input
                                        type="email"
                                        // class="form-control"
                                        id="exampleFormControlInput1"
                                        className={style["input-name"]}
                                    />
                                </div>
                                <div>
                                    <p className={style["name-status"]}>สถานะ</p>

                                    <select
                                        id="cars"
                                        name="cars"
                                        className={style["input-status"]}
                                    >
                                        <option value="volvo">ทั้งหมด</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div>
                                    <p className={style["name-status"]}>ระยะเวลา</p>
                                    <div className={style["date-picker1"]}>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                handleStartDateChange(date, "results")
                                            }
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
                                            selected={startDate}
                                            onChange={(date) =>
                                                handleStartDateChange(date, "results")
                                            }
                                            selectsStart
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
                                        /*   onClick={onClick} */
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button className={style["btn-next"]} onClick={handleClick}>
                                        ค้นหา
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={style["btn-create"]} onClick={handleClick}>
                            + สร้างกิจกรรมใหม่
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
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default EventActivity;
