import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  BookOpenIcon,
  UsersIcon,
  ShieldCheckIcon,
  LogOutIcon
} from "../icons/IconLibrary";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Active tab style
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
    <aside className="w-64 min-h-screen border-r border-gray-300 dark:border-gray-800 
                       bg-white dark:bg-gray-900 p-5 transition-colors duration-300">

      {/* Logo / Header */}
      <h1 className="text-2xl font-extrabold mb-10 text-gray-900 dark:text-white">
        Admin Panel
      </h1>

      {/* NAVIGATION */}
      <nav className="space-y-2">

        <Link
          className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active("/admin/dashboard")}`}
          to="/admin/dashboard"
        >
          <LayoutDashboardIcon className="w-5 h-5" />
          Dashboard
        </Link>

        <Link
          className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active("/admin/course/create")}`}
          to="/admin/course/create"
        >
          <BookOpenIcon className="w-5 h-5" />
          Create Course
        </Link>

        <Link
          className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active("/admin/courses")}`}
          to="/admin/courses"
        >
          <BookOpenIcon className="w-5 h-5" />
          Manage Courses
        </Link>

        <Link
          className={`flex items-center gap-3 px-5 py-3 rounded-lg transition ${active("/admin/users")}`}
          to="/admin/users"
        >
          <UsersIcon className="w-5 h-5" />
          Manage Users
        </Link>

      </nav>

      {/* FOOTER BUTTONS */}
      <div className="mt-10 space-y-3">

        {/* View Main Website */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-lg
                   bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-200
                   hover:bg-gray-400 dark:hover:bg-gray-700 transition"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          View Main Site
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-lg
                    bg-red-600 hover:bg-red-700 text-white shadow transition"
        >
          <LogOutIcon className="w-5 h-5" />
          Logout
        </button>

      </div>
    </aside>
  );
}
