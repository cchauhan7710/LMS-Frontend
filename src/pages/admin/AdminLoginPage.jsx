import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://lms-backend-fezb.onrender.com/auth/admin/login",
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        alert("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      {/* Container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 
                         text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg 
                       text-lg font-semibold shadow-md transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
