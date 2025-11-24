import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRightIcon } from "../components/icons/IconLibrary";

export default function MyLearningPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user info (with purchased courses)
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://lms-backend-fezb.onrender.com/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          console.error("Failed to load user data:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const courses = user?.purchasedCourses || [];

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium animate-pulse">
          Loading your learning journey...
        </p>
      </div>
    );
  }

  // 🚫 Not Logged In
  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Please Log In
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Log in to access your purchased courses and continue learning.
        </p>
        <button
          onClick={() => navigate("/auth?mode=login")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-[1.02]"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // 🧠 No Purchased Courses
  if (courses.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Welcome back,{" "}
          <span className="text-orange-600 dark:text-orange-400">
            {user?.name || "Learner"} 👋
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          You haven’t purchased any courses yet.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-[1.02]"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  // ✅ Purchased Courses View
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Welcome back,{" "}
          <span className="text-orange-600 dark:text-orange-400">
            {user?.name || "Learner"} 👋
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Continue your learning journey below.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition"
          >
            {/* Thumbnail */}
            <div className="h-40 w-full rounded-lg overflow-hidden mb-4">
              <img
                src={
                  course.thumbnail ||
                  "https://placehold.co/600x400/FF7A00/FFFFFF?text=Course"
                }
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Course Info */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {course.description || "No description available."}
            </p>

            {/* Continue Button */}
           <button
  onClick={() => navigate(`/course/${course._id}`)}
  className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md flex items-center justify-center transition"
>
  Continue Learning
  <ArrowRightIcon className="w-5 h-5 ml-2" />
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
