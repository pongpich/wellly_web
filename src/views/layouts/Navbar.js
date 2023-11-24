// ตัวอย่าง
import React, { useRef } from "react";
import styles from "../../assets/css/navbar.module.css";
import Chevron from "../../assets/image/icon/Chevron.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ path }) => {
  const navigate = useNavigate();
  const goBack = () => {
    if (path) {
     
        navigate(path);
      
    }
  };
  return (
    <nav className={styles["navbar"]} onClick={goBack}>
      <img className={styles.chevron} src={Chevron} alt="" />
    </nav>
  );
};

export default Navbar;
