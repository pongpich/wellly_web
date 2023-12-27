import React, { useState, useEffect } from "react";
import iconUser from "../../assets/image/icon/User.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import style from "../../assets/css/createNewActivity.module.css";
import Logo_web from "../../assets/image/img/Logo_web.png"; // ปรับเปลี่ยนที่อยู่ของไฟล์รูปภาพปฏิทิน
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth";
import { getMyGoogleFit } from '../../../src/fitnessApi';
import { Link, useParams } from "react-router-dom";
const NavBackend_test = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user_admin_name, setUserAdminName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
    /*     console.log(user); */
  }, [user]);

  // useEffect(() => {
  //   if (!isLogged) {
  //     navigate("/login");
  //   }
  // });

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
  useEffect(() => {
    handleTokenFromQueryParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //เมื่อเปิดหน้ามาสั่งเด้งไปหน้า google auth อัตโนมัติ
    //createGoogleAuthLink();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch("https://api.planforfit.com/wellly/getUrlGoogleAuth", {
        method: "GET"
      });
      const response = await request.json();
      window.location.href = response.url;
    } catch (error) {
      console.log("home.js 12 | error", error);
      throw new Error("Issue with Login", error.message);
    }

  };

  const handleTokenFromQueryParams = () => {
    const query = new URLSearchParams(window.location.hash.substring(window.location.hash.indexOf('?')));
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    console.log("App.js 30 | expiration Date", expirationDate);

    if (accessToken && refreshToken) {
      storeTokenData(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
    }
  }

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeTokenData = async (token, refreshToken, expirationDate) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div className={style["nav-logo"]}>
      <Link to="/">
        <img src={Logo_web} className={style["img-Logo_web"]} />
      </Link>
      <div className={style["flex-row"]}>
        {/* <span className={style["user-name"]}>{user} </span> */}
        <span className={style["user-name"]}><a class="dropdown-item pointer" onClick={createGoogleAuthLink}>
                  Login
                  </a> </span>

        <div class="dropdown">
          {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button> */}
          <img
            src={iconUser}
            className={`${style["img-User"]} ${"dropdown-toggle"}`}
            // type="button"
            // data-bs-toggle="dropdown"
            // aria-expanded="false"
          />
          
        </div>
      </div>
    </div>
  );
};

export default NavBackend_test;
