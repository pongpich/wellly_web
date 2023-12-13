import React, { useState, useEffect } from "react";
import iconUser from "../../assets/image/icon/User.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import style from "../../assets/css/createNewActivity.module.css";
import Logo_web from "../../assets/image/img/Logo_web.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth";

const NavBackend = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user_admin_name, setUserAdminName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  });

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

  console.log("user", user);
  return (
    <div className={style["nav-logo"]}>
      <img src={Logo_web} className={style["img-Logo_web"]} />
      <div className={style["flex-row"]}>
        <span className={style["user-name"]}>{user} </span>
        <div class="dropdown">
          {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button> */}
          <img
            src={iconUser}
            className={`${style["img-User"]} ${"dropdown-toggle"}`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul class="dropdown-menu">
            {/*  <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li> */}
            <li>
              <a class="dropdown-item pointer" onClick={handelLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBackend;
