import { useEffect, useState } from "react";
import axios from "axios";

export default function ModuleBuilder({ courseId }) {
  const [course, setCourse] = useState(null);

  const [moduleName, setModuleName] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");

  // Load Course
  const loadCourse = () => {
    axios
      .get(`https://lms-backend-fezb.onrender.com/courses/${courseId}`)
      .then((res) => setCourse(res.data));
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  if (!course)
    return <div className="text-center text-gray-500 py-5">Loading...</div>;

  // Add Module
  const addModule = async () => {
    if (!moduleName.trim()) return alert("Module name required!");

    await axios.post(
      `https://lms-backend-fezb.onrender.com/courses/${courseId}/module`,
      { title: moduleName, lessons: [] }
    );

    setModuleName("");
    loadCourse();
  };

  // Delete Module
  const deleteModule = async (mIndex) => {
    if (!window.confirm("Delete this entire module?")) return;

    await axios.delete(
      `https://lms-backend-fezb.onrender.com/courses/${courseId}/module/${mIndex}`
    );

    setSelectedModule(null);
    loadCourse();
  };

  // Upload Video
  const uploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("video", file);

    try {
      const res = await axios.post(
        "https://lms-backend-fezb.onrender.com/upload/video",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setVideoUrl(res.data.url);
      alert("Video Uploaded ✔");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  // Add Lesson
  const addLesson = async () => {
    if (!title.trim()) return alert("Lesson title required!");
    if (!videoUrl.trim()) return alert("Upload video first!");

    await axios.post(
      `https://lms-backend-fezb.onrender.com/courses/${courseId}/module/${selectedModule}/lesson`,
      { title, videoUrl, description }
    );

    setTitle("");
    setVideoUrl("");
    setDescription("");
    loadCourse();
  };

  // Delete Lesson
  const deleteLesson = async (lIndex) => {
    if (!window.confirm("Delete this lesson?")) return;

    await axios.delete(
      `https://lms-backend-fezb.onrender.com/courses/${courseId}/module/${selectedModule}/lesson/${lIndex}`
    );

    loadCourse();
  };

  return (
    <div className="mt-10 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">

      {/* Course Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center sm:text-left">
        Editing Course:{" "}
        <span className="text-orange-500">{course.title}</span>
      </h2>

      {/* Add Module */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white outline-none"
          placeholder="Enter Module Title"
        />
        <button
          onClick={addModule}
          className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold text-white w-full sm:w-auto"
        >
          + Add Module
        </button>
      </div>

      {/* Module List */}
      <div className="space-y-3 mb-10">
        {course.modules.map((m, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex justify-between items-center cursor-pointer transition ${
              selectedModule === index
                ? "bg-orange-600 text-white"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
            onClick={() => setSelectedModule(index)}
          >
            <span className="font-medium">{m.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteModule(index);
              }}
              className="text-red-400 hover:text-red-500 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Lessons Section */}
      {selectedModule !== null && (
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Lessons in:{" "}
            <span className="text-orange-500">
              {course.modules[selectedModule].title}
            </span>
          </h3>

          {/* Existing Lessons */}
          {course.modules[selectedModule].lessons.map((lesson, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-600 p-3 rounded-lg flex justify-between items-center mb-2"
            >
              <span>{lesson.title}</span>
              <button
                onClick={() => deleteLesson(i)}
                className="text-red-400 hover:text-red-500 font-semibold"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Add Lesson Form */}
          <div className="mt-6 space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Lesson Title"
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none"
            />

            <input
              type="file"
              accept="video/*"
              onChange={uploadVideo}
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none"
            />

            <input
              value={videoUrl}
              readOnly
              placeholder="Uploaded Video URL"
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white outline-none"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lesson Description"
              className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white h-24 outline-none"
            />

            <button
              onClick={addLesson}
              className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg text-white font-semibold"
            >
              + Add Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
