import React from "react";
import { Route, Routes, Outlet, NavLink, Link } from "react-router-dom";
import PublicFeature from "./PublicFeature";
import AdminFeature from "./AdminFeature";
import SignInPage from "../pages/SignIn";

const MainRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicFeature />} />
      <Route path="/admin/*" element={<AdminFeature />} />
      <Route path="/dang-nhap" element={<SignInPage />} />
    </Routes>
  );
};

export default MainRouting;
