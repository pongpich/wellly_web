import "./App.css";

import { Amplify } from "aws-amplify";
import { awsConfig } from "./constants/defaultValues";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../src/views/Home";

Amplify.configure(awsConfig);

const App = () => {
  return (
    <Routes>
      {/* Empty path Route as the entry point */}
      <Route path="/" element={<Home />} />
      {/* Fallback route, redirects to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
