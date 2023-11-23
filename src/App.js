import "./App.css";

import { Amplify } from "aws-amplify";
import { awsConfig } from "./constants/defaultValues";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Home from "../src/views/Home";
import Detail from "../src/views/Detail";
import All from "../src/views/All";

Amplify.configure(awsConfig);

const App = () => {
  return (
    <Routes>
      {/* Empty path Route as the entry point */}
      <Route path="/" element={<Home />} />
      <Route path="/all" element={<All />} />
      <Route path="detail" element={<Detail />} />
      {/* Fallback route, redirects to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
