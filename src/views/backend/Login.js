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
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from "react-redux";
import { login_admin } from "../../redux/auth"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const statusLoginAdmin = useSelector(({ auth }) => (auth ? auth.statusLoginAdmin : ""));
  const AdminUserData = useSelector(({ auth }) => (auth ? auth.user : ""));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (statusLoginAdmin === "success") {
      console.log(AdminUserData);
      sessionStorage.setItem("login_status", JSON.stringify(AdminUserData.display_name));
      // console.log(sessionStorage.getItem('login_status'));
      // console.log('เข้าสู่ระบบสำเร็จ');
      navigate("/event-activity");
    }
    if (statusLoginAdmin === "fail") {
      sessionStorage.setItem("login_status", 'fail');
      // console.log(sessionStorage.getItem('login_status'));
      // console.log('เข้าสู่ระบบไม่สำเร็จ');
    }
  }, [statusLoginAdmin]);

  // useEffect(() => {
  //   // storing input name
  //   localStorage.setItem("name", JSON.stringify(name));
  // }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setEmail(data.get('email'));
    dispatch(login_admin(data.get('email'), data.get('password')));
  };

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
              <Link to="/Contact">
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

        <Typography component="h1" variant="h5">
          <p className={style["event-creator"]}>Event Creator </p>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              endAdornment: (
                <InputAdornment position="start" >
                  <Visibility />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1, borderRadius: '25px' }}
            style={{ height: 48 }}
          >
            <p className={style["login-submit"]}>เข้าสู่ระบบ </p>
          </Button>
          <Link to="/forgot_password">
            <p className={style["forgot-password"]}>ลืมรหัสผ่าน ?</p>
          </Link>
        </Box>
        {/* {(statusLoginAdmin === "success") && <p className="success-message">เข้าสู่ระบบสำเร็จ!</p>} */}
        {(statusLoginAdmin === "fail") && <p >เข้าสู่ระบบไม่สำเร็จ!</p>}
      </Box>

    </>
  );
};

export default Login;
