import React from "react";
import { Route, Routes, Outlet, NavLink, Link } from "react-router-dom";
import AdminPage from "../pages/Admin";

const AdminFeature = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
};

export default AdminFeature;
