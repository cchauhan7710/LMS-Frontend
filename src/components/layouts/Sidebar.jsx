  import { useNavigate, useLocation } from "react-router-dom";
  import {
    HomeIcon,
    BookOpenIcon,
    AwardIcon,
    InfoIcon,
    ShoppingCartIcon,
    LayoutDashboardIcon,
    UserCircleIcon,
    HelpCircleIcon,
    ChevronsLeftIcon,
  } from "../icons/IconLibrary";

  export default function Sidebar({ isCollapsed = false, toggleCollapse }) {
    const navigate = useNavigate();
    const location = useLocation();
    const authStatus = !!localStorage.getItem("token"); // login check

    const loggedOutMenus = [
      { label: "Home", to: "/", icon: HomeIcon },
      { label: "Courses", to: "/courses", icon: BookOpenIcon },
      { label: "Why Choose Us", to: "/why", icon: AwardIcon },
      { label: "About Us", to: "/about", icon: InfoIcon },
      { label: "Cart", to: "/cart", icon: ShoppingCartIcon },
    ];

    const loggedInMenus = [
      { label: "Home", to: "/", icon: HomeIcon },
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboardIcon },
      { label: "My Learning", to: "/my-learning", icon: BookOpenIcon },
      { label: "Courses", to: "/courses", icon: BookOpenIcon },
      { label: "Cart", to: "/cart", icon: ShoppingCartIcon },
      { label: "Support", to: "/support", icon: HelpCircleIcon },
      { label: "Profile", to: "/profile", icon: UserCircleIcon },
    ];

    const menus = authStatus ? loggedInMenus : loggedOutMenus;

    return (
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen z-50 flex flex-col
          bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-800
          p-4 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo/Logo.png"
            alt="Growth Academy"
            className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {!isCollapsed && (
            <span className="text-xl font-extrabold whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Growth Academy
            </span>
          )}
        </div>

        {/* Menu Items */}
        <nav className={`flex flex-col flex-1 space-y-2 ${isCollapsed ? "items-center" : ""}`}>
          {menus.map((m) => {
            const Icon = m.icon;
            const isActive = location.pathname === m.to;
            return (
              <button
                key={m.to}
                onClick={() => navigate(m.to)}
                className={`
                  relative flex items-center gap-3 w-full p-3 rounded-lg font-medium
                  transition-all duration-200
                  ${isCollapsed ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 w-1 h-full bg-orange-500 rounded-r-lg"></span>
                )}
                <Icon className="h-6 w-6" />
                {!isCollapsed && <span>{m.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          {!authStatus ? (
            <>
              <button
                onClick={() => navigate("/auth?mode=login")}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {!isCollapsed ? "Login" : "L"}
              </button>

              <button
                onClick={() => navigate("/auth?mode=signup")}
                className="w-full border border-orange-600 text-orange-600 dark:text-orange-400 py-2 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {!isCollapsed ? "Signup" : "S"}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
            >
              {!isCollapsed ? "Logout" : "X"}
            </button>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={toggleCollapse}
          className="mt-4 p-2 w-full rounded-lg bg-gray-100 dark:bg-gray-800 md:flex hidden justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronsLeftIcon
            className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </aside>
    );
  }
