import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all published courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/courses/all");
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium animate-pulse">
          Loading courses...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Welcome to Your Learning Dashboard 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Browse and explore all available courses below.
        </p>
      </div>

      {/* Course Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-4xl font-bold text-orange-500">{courses.length}</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Available Courses
          </div>
        </div>
      </div>

      {/* All Courses */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        All Courses
      </h2>

      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No Courses Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            No published courses are available right now. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-lg hover:-translate-y-1 transition"
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

              {/* Price */}
              <div className="text-orange-500 font-semibold mb-4">
                ₹{course.price || "Free"}
              </div>

              {/* View / Enroll Button */}
              <button
                onClick={() => (window.location.href = `/course/${course._id}`)}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md flex items-center justify-center transition"
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
