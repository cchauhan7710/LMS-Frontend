import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowRightIcon } from "../components/icons/IconLibrary";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 🕒 Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 📦 Fetch User + Purchased Courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/auth?mode=login");

        // Get user
        const userRes = await axios.get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.data.success) setUser(userRes.data.user);

        // Get purchased courses
        const courseRes = await axios.get("http://localhost:5000/courses/my-learning", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (courseRes.data.success) setPurchasedCourses(courseRes.data.courses);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Date & Time Format
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 animate-pulse text-lg">
          Loading your dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6 md:p-10">
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
          Welcome,&nbsp;
          <span className="text-orange-600 dark:text-orange-400">
            {user?.name || "Learner"} 👋
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {formattedDate} — <span className="font-medium">{formattedTime}</span>
        </p>
      </header>

      {/* Stats - Only 2 Now */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        <StatCard title="Courses Enrolled" count={purchasedCourses.length} color="from-orange-500 to-yellow-400" emoji="📘" />

        <StatCard title="Assignments Due" count={Math.max(purchasedCourses.length - 0, 0)} color="from-amber-500 to-orange-400" emoji="📝" />
      </section>

      {/* Purchased Courses */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h2>
          <button
            onClick={() => navigate("/my-learning")}
            className="text-orange-600 dark:text-orange-400 text-sm font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        {purchasedCourses.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              You haven’t enrolled in any courses yet.
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// -------------------
// Stat Card Component
// -------------------
const StatCard = ({ title, count, color, emoji }) => (
  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition overflow-hidden">
    <div className={`absolute inset-0 opacity-[0.08] bg-gradient-to-r ${color}`} />
    <div className="relative z-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">{title}</h3>
        <span className="text-2xl">{emoji}</span>
      </div>
      <p className="text-5xl font-extrabold text-gray-900 dark:text-white mt-3">{count}</p>
    </div>
  </div>
);

// -------------------
// Course Card (with Thumbnail)
// -------------------
const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition flex flex-col">
      
      <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4">
        <img
          src={
            course.thumbnail
              ? course.thumbnail
              : "https://placehold.co/600x400/FF7A00/FFFFFF?text=No+Thumbnail"
          }
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {course.title}
      </h4>

      <button
        onClick={() => navigate(`/course/${course._id}`)}
        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg flex items-center justify-center transition"
      >
        Continue <ArrowRightIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};
