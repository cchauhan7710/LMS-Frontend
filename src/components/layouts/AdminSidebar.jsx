import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  UsersIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "../icons/IconLibrary";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false); // mobile toggle
  const location = useLocation();
  const navigate = useNavigate();

  // Active Link Styles
  const active = (path) =>
    location.pathname.startsWith(path)
      ? "bg-orange-600 text-white shadow-lg"
      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>

      {/* OVERLAY (MOBILE) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-full w-64 
          bg-white dark:bg-gray-900 
          border-r border-gray-300 dark:border-gray-800
          p-5 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden mb-4 text-gray-700 dark:text-gray-300"
          onClick={() => setOpen(false)}
        >
          ✕ Close
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-extrabold mb-10 text-gray-900 dark:text-white">
          Admin Panel
        </h1>

        {/* NAVIGATION */}
        <nav className="space-y-2">
          <Link
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active(
              "/admin/dashboard"
            )}`}
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboardIcon className="w-5 h-5" />
            Dashboard
          </Link>

          <Link
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active(
              "/admin/course/create"
            )}`}
            to="/admin/course/create"
            onClick={() => setOpen(false)}
          >
            <BookOpenIcon className="w-5 h-5" />
            Create Course
          </Link>

          <Link
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active(
              "/admin/courses"
            )}`}
            to="/admin/courses"
            onClick={() => setOpen(false)}
          >
            <BookOpenIcon className="w-5 h-5" />
            Manage Courses
          </Link>

          <Link
            className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active(
              "/admin/users"
            )}`}
            to="/admin/users"
            onClick={() => setOpen(false)}
          >
            <UsersIcon className="w-5 h-5" />
            Manage Users
          </Link>
        </nav>

        {/* FOOTER BUTTONS */}
        <div className="mt-10 space-y-3">
          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-3 rounded-lg
                       bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-200
                       hover:bg-gray-400 dark:hover:bg-gray-700 transition"
          >
            <ShieldCheckIcon className="w-5 h-5" />
            View Main Site
          </button>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-5 py-3 rounded-lg
                      bg-red-600 hover:bg-red-700 text-white shadow transition"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
