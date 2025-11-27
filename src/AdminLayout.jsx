import AdminSidebar from "./components/layouts/AdminSidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ======= 🟧 DESKTOP SIDEBAR (Always Shown on Desktop) ======= */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* ======= 📱 MOBILE SIDEBAR (Slide Drawer) ======= */}
      {/* Opens only when mobileOpen = true */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute left-0 top-0 w-64 h-full bg-gray-900 text-white shadow-lg">
            <AdminSidebar close={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* ======= MAIN CONTENT ======= */}
      <main
        className="flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300"
        style={{ marginLeft: "0", paddingLeft: "0" }}
      >
        {/* Push right only on desktop */}
        <div className="md:ml-64">
          {children}
        </div>
      </main>

      {/* Floating Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        Menu
      </button>
    </div>
  );
}
