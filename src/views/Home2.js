import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import NavBar from "../views/backend/NavBackend";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import style from "../assets/css/home2.module.css";
import description_BG from "../assets/home/description_BG.png";
import description from "../assets/home/description.png";
import description_pic from "../assets/home/description_pic.png";
import step_count from "../assets/home/step_count.png";
import tracking from "../assets/home/tracking.png";
import result from "../assets/home/result.png";
import how_we from "../assets/home/how_we.png";
import appendix from "../assets/home/appendix.png";
import appendix2 from "../assets/home/appendix2.png";
import footer_detail from "../assets/home/footer_detail.png";


const Home2 = ({ match }) => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <>
      <div className="page">
        <NavBar />
        <Box sx={{
          backgroundImage: `url(${description_BG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // height: "100%",
          width: "100%",
        }}
        >
          <Grid container spacing={2} sx={{
            padding: `2px`,
            textAlign: 'center',
            height: "500px",
          }}>
            <Grid xs={6} sx={{
              alignSelf: 'center'
            }}>
              <img
                src={description}
                className={style["description"]}
              />
            </Grid>
            <Grid xs={6} sx={{
              alignSelf: 'center'
            }}>
              <img
                src={description_pic}
                className={style["description_pic"]}
              />
            </Grid>

          </Grid>
        </Box>
        <Box sx={{
          width: "100%",
          textAlign: 'center',
          paddingBottom: '85px'
        }}
        >
          <img
            src={step_count}
            className={style["content-margin"]}
          />
          <img
            src={tracking}
            className={style["content-margin"]}
          />
          <img
            src={result}
            className={style["content-margin"]}
          />
        </Box>
        <Box sx={{
          width: "100%",
          textAlign: 'center',
          paddingBottom: '85px',
          backgroundColor: '#DEF5FA'
        }}
        >
          <img
            src={how_we}
            className={style["content-margin"]}
          />
        </Box>
        <Box sx={{
          width: "100%",
          textAlign: 'center',
          paddingBottom: '85px',
        }}
        >
          <img
            src={appendix}
            className={style["content-margin"]}
          />
          <img
            src={appendix2}
            className={style["content-margin"]}
          />
        </Box>
        <Box sx={{
          width: "100%",
          textAlign: 'center',
          paddingBottom: '85px',
          backgroundColor: '#3762FC'
        }}
        >
          <img
            src={footer_detail}
            className={style["content-margin"]}
          />
        </Box>
        <Box sx={{
          width: "100%",
          textAlign: '-webkit-center',
          // paddingBottom: '85px',
          backgroundColor: '#4A4A4A'
        }}
        >
          <Grid container spacing={0} sx={{
            padding: `2px`,
            // textAlign: 'center',
            // height: "15px",
            fontFamily: 'Bold',
            fontSize: 'smaller',
            width: '50%',
            padding: '30px',
            color: 'white'
          }}>
            <Grid xs={4.5} sx={{ borderRight: `2px solid white` }}>
              © 2022 BBPF RIGHTS RESERVED
            </Grid>
            <Grid xs={2.2} sx={{ borderRight: `2px solid white` }}>
              <a
                className={style["pointer"]}
                onClick={() => openInNewTab('https://wellly.planforfit.com/privacy_policy.html')}
              >
                Privacy Policy
              </a>
            </Grid>
            <Grid xs={2.2} sx={{ borderRight: `2px solid white` }}>
              Cookies Policy
            </Grid>
            <Grid xs={2.2} >
              Cookies Setting
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Home2;
