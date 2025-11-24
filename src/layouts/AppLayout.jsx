import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/layouts/Sidebar"
import AdminSidebar from "../components/layouts/AdminSidebar"
import Navbar from "../components/layouts/Navbar"
import Footer from "../components/layouts/Footer"

export default function AppLayout() {
  const location = useLocation()
const isAdmin = location.pathname.includes("/admin")


  const [collapsed, setCollapsed] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapse = () => setCollapsed(v => !v)
  const toggleMobile = () => setMobileOpen(v => !v)

  const sidebarWidth = collapsed ? "5rem" : "15rem"

  const SidebarComponent = isAdmin ? AdminSidebar : Sidebar

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">

      {/* DESKTOP SIDEBAR (hidden when mobileOpen true) */}
      <div className={`hidden md:block fixed top-0 left-0 h-full z-20 ${mobileOpen ? "hidden" : ""}`}>
        <SidebarComponent isCollapsed={collapsed} toggleCollapse={toggleCollapse} />
      </div>
{/* MOBILE DRAWER */}
<div className={`md:hidden fixed inset-0 z-30 ${mobileOpen ? "block" : "hidden"}`}>
  
  {/* overlay */}
  <div className="absolute inset-0 bg-black/20" onClick={toggleMobile}></div>

  {/* animated sliding sidebar */}
 <div
  className={`
    absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900
    transform transition-transform duration-300 ease-in-out
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>

    <SidebarComponent isCollapsed={false} toggleCollapse={() => {}} />
  </div>
</div>



      {/* MAIN CONTENT */}
      <div
        className="flex-1 flex flex-col overflow-hidden max-w-full transition-all duration-300"
      style={{
  marginLeft: isAdmin
    ? (window.innerWidth >= 768 ? "17rem" : 0)
    : (window.innerWidth >= 768 ? sidebarWidth : 0)
}}


      >
        {!isAdmin && <Navbar toggleSidebar={toggleMobile} />}

        <div className="flex-1 overflow-y-auto overflow-x-hidden max-w-full
                bg-gray-50 dark:bg-gray-900 
                text-gray-900 dark:text-gray-100">

          <Outlet />
          {!isAdmin && <Footer />}
        </div>
      </div>
    </div>
  )
}
