import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import MainTemplate from "../template/main-template";
import Home from "../pages/Home";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize('G-XZ8KL73TX9');
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null; 
};

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route index element={<MainTemplate><Home /></MainTemplate>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
