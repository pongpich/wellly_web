import "./App.css";
import React, { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import { awsConfig } from "./constants/defaultValues";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "../src/views/Home";
import Detail from "../src/views/Detail";
import StartExercising from "./views/StartExercising";
import DetailTimer from "../src/views/DetailTimer";
import DetailSucceed from "../src/views/DetailSucceed";
import GoogleAuth from "../src/views/GoogleAuth";
import Home2 from "../src/views/Home2";
import AllTest from "./views/AllTest";
import Scoreboard from "./views/Scoreboard";
import ScoreboardSucceed from "./views/ScoreboardSucceed";
import Login from "./views/backend/Login";
import ForgotPassword from "./views/backend/ForgotPassword";
import Contact from "./views/backend/Contact";
import CreateNewActivity from "./views/backend/CreateNewActivity";
import EventActivity from "./views/backend/EventActivity";

Amplify.configure(awsConfig);

const App = () => {
  const location = useLocation();
  const [statusPath, setStatusPath] = useState("#/");

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger the effect only on path change

  const hash = window.location.hash;
  const indexOfQuestionMark = hash.indexOf("?");

  // ถ้ามี "?" ให้ใช้ substring เพื่อดึงเฉพาะส่วนของ path
  const path =
    indexOfQuestionMark !== -1
      ? hash.substring(1, indexOfQuestionMark)
      : hash.substring(1);
  useEffect(() => {
    setStatusPath(path);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(path);
    } else {
      console.error("window.ReactNativeWebView is undefined");
    }
  }, [hash]);

  return (
    <Routes>
      {/*  frontend */}
      <Route path="/" element={<Home2 />} />
      <Route path="/all-test" element={<AllTest />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/start-exercising/:id" element={<StartExercising />} />
      <Route path="/detailSucceed/:id" element={<DetailSucceed />} />
      <Route path="/detailTimer" element={<DetailTimer />} />
      <Route path="/scoreboard/:id" element={<Scoreboard />} />
      <Route path="/scoreboardSucceed" element={<ScoreboardSucceed />} />
      <Route path="/googleAuth" element={<GoogleAuth />} />
      <Route path="/home_test" element={<Home />} />

      {/*  backend */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/create-new-activity" element={<CreateNewActivity />} />
      <Route path="/event-activity" element={<EventActivity />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
