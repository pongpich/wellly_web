// ตัวอย่าง
import React from "react";
import styles from "../../assets/css/navbar.module.css";
import Chevron from "../../assets/image/icon/Chevron.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ path }) => {
  const navigate = useNavigate();
  console.log("path", path);
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
