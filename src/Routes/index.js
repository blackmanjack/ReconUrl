import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OtxApp from "../AlienVault/OtxApp";
import TesXss from "../xss";
import Login from "../New-path/login";
import PunycodeGenerator from "../PunyCode";
import Home from "../Home";

const SwitchRouter = () => {
  return (
    <>
      <Router>
        {/* Wrap your entire app with the Router */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/xss" element={<TesXss />} />
          <Route path="/" element={<Home />} />
          <Route path="/alienvault" element={<OtxApp />} />
          <Route path="/punycode" element={<PunycodeGenerator />} />
        </Routes>
      </Router>
    </>
  );
};

export default SwitchRouter;
