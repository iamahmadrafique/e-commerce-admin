import React, { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../Pages/Login/Login.tsx";
import PublicRoute from "./PublicRouters.js";
import PrivateRoute from "./PrivateRouters.js";
import Revenue from "../Pages/RevenueAnalysis/Revenue.tsx";
import ServicesSection from "../Pages/ServicesSection/ServicesSection.tsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function CustomRouter() {
  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/Login" element={<PublicRoute />}>
            <Route path="/Login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Revenue/>} />
            <Route path="*" element={<Revenue />} />
            <Route path="/InventoryManagement" element={<ServicesSection />}/>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default CustomRouter;