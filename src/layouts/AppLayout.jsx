import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(v => !v);
  const toggleMobile = () => setMobileOpen(v => !v);

  const sidebarWidth = collapsed ? "5rem" : "15rem";

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">

      {/* Desktop Sidebar - USER ONLY */}
      <div className="hidden md:block fixed left-0 top-0 h-full">
        <Sidebar isCollapsed={collapsed} toggleCollapse={toggleCollapse} />
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-0 z-30 ${mobileOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/30" onClick={toggleMobile}></div>
        <div className="absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900">
          <Sidebar isCollapsed={false} toggleCollapse={() => {}} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="flex-1 flex flex-col overflow-hidden transition-all"
        style={{ marginLeft: window.innerWidth >= 768 ? sidebarWidth : 0 }}
      >
        <Navbar toggleSidebar={toggleMobile} />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
