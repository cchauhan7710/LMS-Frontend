import React from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuthUser } from "../../hooks/useAuthUser";
import { MenuIcon, ShoppingCartIcon } from "../icons/IconLibrary";

const Navbar = ({ navigate, toggleSidebar, cartItemCount = 0 }) => {
  const user = useAuthUser();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Left side — Logo or Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 md:hidden transition"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Brand / Logo */}
            {/* <button
              onClick={() => navigate("/")}
              className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight hover:text-orange-500 dark:hover:text-orange-400 transition"
            >
              Growth Academy
            </button> */}
          </div>

          {/* Right side — Cart, Theme, User */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition"
              aria-label="Cart"
            >
              
              
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Greeting */}
            {user ? (
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Hi,{" "}
                <span className="text-orange-500 dark:text-orange-400 font-semibold">
                  {user.name.split(" ")[0]}
                </span>{" "}
                👋
              </span>
            ) : (
              <button
                onClick={() => navigate("/auth?mode=login")}
                className="text-sm sm:text-base font-semibold text-orange-500 hover:text-orange-600 transition"
              >
              
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
