import React, { useState, useEffect } from "react";
import style from "../../assets/css/login.module.css";

const Login = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  เกี่ยวกับเรา
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  ติดต่อเรา
                </a>
              </li>
            </ul>
            <div>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>ภาษาไทย</option>
                <option value="1">ภาษาอังกฤษ</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <p className={style["event-creator"]}>Event Creator Log in</p>
      <div className={style["from-login"]}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="อีเมล"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="รหัสผ่านอย่างน้อย 8 หลัก"
          />
        </div>
        <button type="button" class={`${style["button-login"]}`}>
          ล็อกอิน
        </button>
        <p className={style["forgot-password"]}>ลืมรหัสผ่าน?</p>
      </div>
    </>
  );
};

export default Login;
