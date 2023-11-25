import React, { useState, useEffect } from "react";
import NavbarWeb from "./NavbarWeb";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "../../assets/css/detail.module.css";
import CloseButton from "../../assets/image/icon/CloseButton.png";

const NavbarImg = ({ path }) => {
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setBarVisible(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`sliding-bar2 ${barVisible ? "visible" : ""}`}>
      {barVisible ? (
        <NavbarWeb path={path} />
      ) : (
        <Link to={path}>
          <img src={CloseButton} className={style["close-button"]} />
        </Link>
      )}
    </div>
  );
};
export default NavbarImg;
