import "./App.css";
import React, { useEffect } from "react";

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
import DetailRegister from "../src/views/DetailRegister";
import DetailTimer from "../src/views/DetailTimer";
import DetailSucceed from "../src/views/DetailSucceed";
import AllTest from "./views/AllTest";
import Scoreboard from "./views/Scoreboard";
import ScoreboardSucceed from "./views/ScoreboardSucceed";
import Login from "./views/backend/Login";
import CreateNewActivity from "./views/backend/CreateNewActivity";
import EventActivity from "./views/backend/EventActivity";

Amplify.configure(awsConfig);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger the effect only on path change

  return (
    <Routes>
      {/*  frontend */}
      <Route path="/" element={<Home />} />
      <Route path="/all-test" element={<AllTest />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/detailRegister" element={<DetailRegister />} />
      <Route path="/detailSucceed" element={<DetailSucceed />} />
      <Route path="/detailTimer" element={<DetailTimer />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
      <Route path="/scoreboardSucceed" element={<ScoreboardSucceed />} />

      {/*  backend */}
      <Route path="/login" element={<Login />} />
      <Route path="/create-new-activity" element={<CreateNewActivity />} />
      <Route path="/event-activity" element={<EventActivity />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
