import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ⭐ Required

const ProfilePage = () => {
  const navigate = useNavigate(); // ⭐ Now navigation works
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://lms-backend-fezb.onrender.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch((err) => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  if (!user)
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No User Logged In
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please log in to view your profile.
        </p>
        <button
          onClick={() => navigate("/auth?mode=login")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Go to Login
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 md:p-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">

        {/* User Header */}
        <div className="flex flex-col md:flex-row justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user.role === "admin" ? "Administrator" : "Learner"}</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400 text-right">
            Last Active: <span className="font-medium text-gray-700 dark:text-gray-300">{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => navigate("/my-learning")}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Go to My Learning
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
              window.location.reload();
            }}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
