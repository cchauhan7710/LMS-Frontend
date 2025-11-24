import { useState } from "react";
import axios from "axios";

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [modules, setModules] = useState([]);

  // ADD MODULE
  const addModule = () => {
    setModules([...modules, { title: "", lessons: [] }]);
  };

  // ADD LESSON
  const addLesson = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].lessons.push({ title: "", videoUrl: "" });
    setModules(updated);
  };

  // VIDEO UPLOAD
  const uploadVideo = async (e, m, l) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    const res = await axios.post("https://lms-backend-fezb.onrender.com/upload/video", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const updated = [...modules];
    updated[m].lessons[l].videoUrl = res.data.url;
    setModules(updated);

    alert("Video Uploaded 👍");
  };

  // THUMBNAIL UPLOAD
  const uploadThumbnail = async () => {
    if (!thumbnail) return "";

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const res = await axios.post("https://lms-backend-fezb.onrender.com/upload/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  };

  // CREATE COURSE
  const handleCreate = async () => {
    try {
      const thumbnailUrl = await uploadThumbnail();

      const res = await axios.post("https://lms-backend-fezb.onrender.com/courses/create", {
        title,
        price: Number(price),
        category,
        level,
        description,
        thumbnail: thumbnailUrl,
        modules,
      });

      if (res.data.success) {
        alert("Course Created Successfully 🎉");
        setTitle("");
        setPrice("");
        setCategory("");
        setLevel("");
        setDescription("");
        setThumbnail(null);
        setModules([]);
      }
    } catch (err) {
      console.log("CREATE ERROR:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Create New Course
      </h1>

      {/* BASIC INFO */}
      <div className="space-y-4 max-w-xl">
        <input
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <textarea
          className="w-full p-3 h-32 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* MODULES */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">
        Modules & Lessons
      </h2>

      <button
        onClick={addModule}
        className="px-5 py-2 mb-4 rounded-lg bg-orange-600 hover:bg-orange-700 
                   text-white font-semibold shadow"
      >
        + Add Module
      </button>

      <div className="space-y-6">
        {modules.map((mod, m) => (
          <div
            key={m}
            className="border border-gray-300 dark:border-gray-700 rounded-xl p-5 
                       bg-white dark:bg-gray-800 shadow-sm"
          >
            {/* Module Title */}
            <input
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 mb-3"
              placeholder="Module Title"
              value={mod.title}
              onChange={(e) => {
                const updated = [...modules];
                updated[m].title = e.target.value;
                setModules(updated);
              }}
            />

            <button
              onClick={() => addLesson(m)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                         text-white font-medium mb-3 shadow"
            >
              + Add Lesson
            </button>

            {/* Lessons */}
            {mod.lessons.map((les, l) => (
              <div
                key={l}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 
                           bg-gray-100 dark:bg-gray-700 mt-3"
              >
                <input
                  className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                             dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 mb-2"
                  placeholder="Lesson Title"
                  value={les.title}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[m].lessons[l].title = e.target.value;
                    setModules(updated);
                  }}
                />

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => uploadVideo(e, m, l)}
                  className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                             dark:border-gray-700 text-gray-900 dark:text-white"
                />

                {les.videoUrl && (
                  <p className="text-green-500 mt-2 text-sm font-semibold">Video Uploaded ✓</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleCreate}
        className="mt-10 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 
                   text-white font-bold shadow-lg"
      >
        Create Course
      </button>
    </div>
  );
}
