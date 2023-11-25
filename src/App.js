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
import All from "../src/views/All";
import DetailSucceed from "../src/views/DetailSucceed";

Amplify.configure(awsConfig);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top when the location changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger the effect only on path change

  return (
    <Routes>
      {/* Empty path Route as the entry point */}
      <Route path="/" element={<Home />} />
      <Route path="/all" element={<All />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/DetailSucceed" element={<DetailSucceed />} />
      {/* Fallback route, redirects to the home page */}
     {/*  <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};

export default App;
