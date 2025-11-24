import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const res = await axios.get("https://lms-backend-fezb.onrender.com/courses/all");
      setCourses(res.data);
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await axios.delete(`https://lms-backend-fezb.onrender.com/courses/${id}`);
    loadCourses();
  };

  const togglePublish = async (id) => {
    try {
      await axios.patch(`https://lms-backend-fezb.onrender.com/courses/${id}/publish`);
      loadCourses();
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  return (
    <div className="p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Manage Courses
      </h1>

      <div className="space-y-4">
        {courses.map((c) => (
          <div
            key={c._id}
            className="
              p-6 rounded-xl border shadow-sm 
              bg-white dark:bg-gray-800 
              border-gray-200 dark:border-gray-700
              flex justify-between items-center transition
            "
          >
            {/* Course Info */}
            <div>
              <div className="font-bold text-xl text-gray-900 dark:text-white">
                {c.title}
              </div>

              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {c.category}
              </div>

              <div
                className={`text-sm mt-2 font-semibold ${
                  c.isPublished ? "text-green-500" : "text-red-500"
                }`}
              >
                {c.isPublished ? "Published" : "Unpublished"}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/course/${c._id}`)}
                className="
                  bg-yellow-400 hover:bg-yellow-500 
                  text-black font-semibold px-4 py-2 rounded 
                  transition
                "
              >
                Edit
              </button>

              <button
                onClick={() => togglePublish(c._id)}
                className={`
                  px-4 py-2 rounded font-semibold transition
                  ${c.isPublished 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-gray-600 hover:bg-gray-700 text-white"}
                `}
              >
                {c.isPublished ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => deleteCourse(c._id)}
                className="
                  bg-red-600 hover:bg-red-700 
                  text-white font-semibold px-4 py-2 rounded transition
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
