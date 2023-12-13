import React, { useState, useEffect } from "react";
import style from "../../assets/css/login.module.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/icon/Logo.png";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import InputAdornment from '@mui/material/InputAdornment';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Login = () => {
  return (
    <>

      <div className={style["grid-container1"]}>
        <div className={style["grid-item1"]}>
          <img src={Logo} className={style["Logo"]} />
        </div>
        <div className={style["grid-item2"]}>
          <div className={style["grid-container2"]}>
            <div className={style["grid-item3"]}>

            </div>
            <div className={style["grid-item3"]}>
              <Link to="/login">
                <span className={style["content"]}>ติดต่อเรา</span>
              </Link>
            </div>
            <div className={style["grid-item4"]}>
              <Link to="/login">
                <span className={style["content"]}>Eng</span>
              </Link>
            </div>
          </div>
        </div>


      </div >


      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography component="h1" variant="h5">
          <p className={style["event-creator"]}>Event Creator </p>
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="อีเมล"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 , borderRadius: '25px'}}
            style={{  height: 48 }}
          >
            <p className={style["login-submit"]}>เข้าสู่ระบบ </p>
          </Button>
          <Link to="/login">
            <p className={style["forgot-password"]}>ลืมรหัสผ่าน ?</p>
          </Link>
        </Box>
      </Box>

    </>
  );
};

export default Login;
