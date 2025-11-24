import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = ({ authStatus, handleSignOut }) => {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-gray-950 text-gray-300 overflow-hidden">
      {/* Decorative gradient circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Description */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4">
              Sushil Arora Growth Academy
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering learners worldwide with top-notch courses and
              personalized mentorship to achieve growth and success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Browse Courses", path: "/courses" },
                { label: "Why Choose Us", path: "/why" },
                { label: "About Us", path: "/about" },
                { label: "Cart", path: "/cart" },
                { label: "My Learning", path: "/mylearning" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li>
                {authStatus ? (
                  <button
                    onClick={handleSignOut}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/auth?mode=login")}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => alert("COMING SOON")}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  Become an Instructor
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("COMING SOON")}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  For Business
                </button>
              </li>
<li>
  {!localStorage.getItem("adminToken") ? (
    <button
      onClick={() => navigate("/admin/login")}
      className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
    >
      Admin Login
    </button>
  ) : (
    <button
      onClick={() => navigate("/admin/login")}
      className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
    >
      Admin Panel
    </button>
  )}
</li>


            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              support@growthacademy.com
            </p>
            <p className="text-gray-400 text-sm mt-2">+91 98765 43210</p>
            <p className="text-gray-400 text-sm mt-2">
              Ludhiana, Punjab, India
            </p>
          </div>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="relative border-t border-gray-800/60 py-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-orange-500 font-semibold">
              Sushil Arora Growth Academy
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
