import React from "react";
import Navbar from "../../common/Navber";
import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* ✅ Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* ✅ Space for fixed navbar */}
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
