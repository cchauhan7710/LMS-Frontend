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

  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);
  const [creatingCourse, setCreatingCourse] = useState(false);

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

  // ⭐ VIDEO UPLOAD WITH PROGRESS
  const uploadVideo = async (e, m, l) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await axios.post(
        "https://lms-backend-fezb.onrender.com/upload/video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progEvt) => {
            const percent = Math.round(
              (progEvt.loaded * 100) / progEvt.total
            );
            setUploadProgress(percent);
          },
        }
      );

      const updated = [...modules];
      updated[m].lessons[l].videoUrl = res.data.url;
      setModules(updated);

      setUploadProgress(0);
      alert("Video Uploaded 👍");
    } catch (error) {
      console.error("Video Upload Error", error);
      alert("Video upload failed ❌");
    }
  };

  // ⭐ THUMBNAIL UPLOAD WITH PROGRESS
  const uploadThumbnail = async () => {
    if (!thumbnail) return "";

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    const res = await axios.post(
      "https://lms-backend-fezb.onrender.com/upload/image",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setThumbProgress(percent);
        },
      }
    );

    setThumbProgress(0);
    return res.data.url;
  };

  // ⭐ CREATE COURSE
  const handleCreate = async () => {
    try {
      setCreatingCourse(true);

      const thumbnailUrl = await uploadThumbnail();

      await axios.post(
        "https://lms-backend-fezb.onrender.com/courses/create",
        {
          title,
          price: Number(price),
          category,
          level,
          description,
          thumbnail: thumbnailUrl,
          modules,
        }
      );

      alert("🎉 Course Created Successfully!");

      // RESET FIELDS
      setTitle("");
      setPrice("");
      setCategory("");
      setLevel("");
      setDescription("");
      setThumbnail(null);
      setModules([]);

      setCreatingCourse(false);
    } catch (err) {
      console.log("CREATE ERROR:", err);
      alert("Something went wrong ❌");
      setCreatingCourse(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-10 transition">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center md:text-left">
        Create New Course
      </h1>

      {/* BASIC INFO */}
      <div className="space-y-4 max-w-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                       dark:border-gray-700 text-gray-900 dark:text-white"
          />

          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-40 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                       dark:border-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white"
        />

        <input
          placeholder="Level (Beginner, Intermediate, Advanced)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white"
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-32 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white"
        />

        {/* THUMBNAIL */}
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                     dark:border-gray-700 text-gray-900 dark:text-white"
        />

        {/* Thumbnail Upload Progress Bar */}
        {thumbProgress > 0 && (
          <div className="w-full bg-gray-300 rounded-lg h-3 mt-4">
            <div
              className="bg-purple-600 h-3 rounded-lg transition-all"
              style={{ width: `${thumbProgress}%` }}
            ></div>
          </div>
        )}
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
            <input
              placeholder="Module Title"
              value={mod.title}
              onChange={(e) => {
                const updated = [...modules];
                updated[m].title = e.target.value;
                setModules(updated);
              }}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 
                         dark:border-gray-600 text-gray-900 dark:text-white mb-3"
            />

            <button
              onClick={() => addLesson(m)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                         text-white font-medium mb-3 shadow"
            >
              + Add Lesson
            </button>

            {mod.lessons.map((les, l) => (
              <div
                key={l}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 
                           bg-gray-100 dark:bg-gray-700 mt-3"
              >
                <input
                  placeholder="Lesson Title"
                  value={les.title}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[m].lessons[l].title = e.target.value;
                    setModules(updated);
                  }}
                  className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
                             dark:border-gray-700 text-gray-900 dark:text-white mb-2"
                />

                <input
  type="file"
  accept="video/*,.mkv,.mov,.avi,.wmv,.flv,.mpeg,.mp4"
  onChange={(e) => uploadVideo(e, m, l)}
  className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 
             dark:border-gray-700 text-gray-900 dark:text-white"
  style={{ maxWidth: "100%" }}
/>


                {/* Video Progress */}
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-300 rounded-lg h-3 mt-3">
                    <div
                      className="bg-blue-600 h-3 rounded-lg transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                {les.videoUrl && (
                  <p className="text-green-500 mt-2 text-sm font-semibold">
                    Video Uploaded ✓
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* CREATE BUTTON */}
      {creatingCourse && (
        <p className="mt-4 text-center text-orange-500 font-semibold">
          Creating course… Please wait ⏳
        </p>
      )}

      <button
        onClick={handleCreate}
        disabled={creatingCourse}
        className="mt-10 px-6 py-3 w-full sm:w-auto rounded-xl bg-green-600 hover:bg-green-700 
                   text-white font-bold shadow-lg disabled:bg-gray-500"
      >
        {creatingCourse ? "Creating..." : "Create Course"}
      </button>
    </div>
  );
}
