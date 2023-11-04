import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OtxApp from "../OtxApp";
import Login from "../New-path/login";

const SwitchRouter = () => {
  return (
    <>
      <Router>
        {/* Wrap your entire app with the Router */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<OtxApp />} />
        </Routes>
      </Router>
    </>
  );
};

export default SwitchRouter;
