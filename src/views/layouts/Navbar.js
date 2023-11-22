// ตัวอย่าง
import React from "react";
import styles from "../../assets/css/navbar.module.css";
import Chevron from "../../assets/image/icon/Chevron.png";

const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <img className={styles.chevron} src={Chevron} alt="" />
    </nav>
  );
};

export default Navbar;
