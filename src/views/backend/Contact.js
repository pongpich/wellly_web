import React, { useState, useEffect } from "react";
import style from "../../assets/css/Contact.module.css";
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
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Key from "../../assets/image/icon/key.png";
import Phone from "../../assets/image/icon/Phone.png";
import Email from "../../assets/image/icon/Email.png";
const Contact = () => {
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
          marginTop: 17,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={Key} className={style["key"]} />
        <Typography component="h1" variant="h5">
          <p className={style["event-creator"]}>ติดต่อเรา </p>
        </Typography>
        <Box component="section" sx={{
          width: 327,
          height: 74,
          borderRadius: 1,
          bgcolor: '#E5EEF9',
          marginTop: 3
        }}>
          <Grid container spacing={2} >
            <Grid item xs={2} >
              <img src={Phone} className={style["phone"]} />
            </Grid>
            <dl className={style["detail-group"]}>
              <p className={style["calling"]}>โทร</p>
              <p className={style["calling_number"]}>086-899-9089</p>
            </dl>
          </Grid>
        </Box>
        <Box component="section" sx={{
          width: 327,
          height: 74,
          borderRadius: 1,
          bgcolor: '#E5EEF9',
          marginTop: 3
        }}>
          <Grid container spacing={2} >
            <Grid item xs={2} >
              <img src={Email} className={style["phone"]} />
            </Grid>
            <dl className={style["detail-group"]}>
              <p className={style["calling"]}>อีเมล</p>
              <p className={style["calling_number"]}>support@welliness</p>
            </dl>
          </Grid>
        </Box>
      </Box>

    </>
  );
};

export default Contact;
