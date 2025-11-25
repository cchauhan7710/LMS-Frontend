import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ModuleBuilder from "./ModuleBuilder";

export default function EditCoursePage() {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [saving, setSaving] = useState(false);

  // 🔄 Receive updated modules from ModuleBuilder
  const handleModulesChange = (updatedModules) => {
    setModules(updatedModules);
  };

  // 💾 Save changes (module reorder, lesson delete, etc.)
  const saveChanges = async () => {
    if (!id) return;
    setSaving(true);

    try {
      await axios.put(
        `https://lms-backend-fezb.onrender.com/courses/${id}`,
        { modules }
      );

      alert("✔ Course Updated Successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("❌ Failed to save changes");
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 md:px-10 py-10 transition">

      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Edit Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mt-2">
          Modify course modules, lessons, or upload new videos.
        </p>
      </div>

      {/* Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">

        <div className="mb-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            Course ID:{" "}
            <span className="text-orange-500 break-all text-base md:text-xl">
              {id}
            </span>
          </h2>
        </div>

        {/* Module Builder */}
        <ModuleBuilder courseId={id} onChange={handleModulesChange} />

        {/* 🔥 EXTRA FEATURE: ADD NEW LESSON TO EXISTING MODULE */}
        <div className="mt-12 p-6 rounded-xl bg-gray-100 dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Add New Lesson to Existing Module
          </h2>

          <AddLessonToExistingModule courseId={id} />
        </div>

        {/* SAVE BUTTON */}
        <div className="mt-10 flex justify-center md:justify-end">
          <button
            onClick={saveChanges}
            disabled={saving}
            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 
            disabled:bg-gray-500 text-white px-8 py-3 rounded-xl 
            font-semibold shadow-md transition active:scale-95"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------
      ⭐ ADD LESSON TO EXISTING MODULE COMPONENT
------------------------------------------------------------------ */

function AddLessonToExistingModule({ courseId }) {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  // Load modules for dropdown
  useEffect(() => {
    axios
      .get(`https://lms-backend-fezb.onrender.com/courses/${courseId}`)
      .then((res) => setModules(res.data.modules))
      .catch((err) => console.error(err));
  }, [courseId]);

  // Upload video
  const uploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("video", file);

    try {
      const res = await axios.post(
        "https://lms-backend-fezb.onrender.com/upload/video",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },

          onUploadProgress: (p) => {
            setUploadProgress(Math.round((p.loaded * 100) / p.total));
          },
        }
      );

      setVideoUrl(res.data.url);
      setUploadProgress(0);
      alert("Video Uploaded Successfully ✔");
    } catch (err) {
      console.error(err);
      alert("❌ Video Upload Failed");
    }
  };

  // Add lesson
  const addLesson = async () => {
    if (!selectedModule) return alert("Select a module!");
    if (!title.trim()) return alert("Enter lesson title!");
    if (!videoUrl) return alert("Upload video first!");

    try {
      await axios.post(
        `https://lms-backend-fezb.onrender.com/courses/${courseId}/module/${selectedModule}/lesson`,
        {
          title,
          description,
          videoUrl,
        }
      );

      alert("✔ Lesson Added Successfully!");

      setTitle("");
      setDescription("");
      setVideoUrl("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add lesson");
    }
  };

  return (
    <div className="space-y-4">

      {/* Select Module */}
      <select
        value={selectedModule}
        onChange={(e) => setSelectedModule(e.target.value)}
        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 
                   border border-gray-300 dark:border-gray-600 
                   text-gray-900 dark:text-white"
      >
        <option value="">Select Module</option>
        {modules.map((m, idx) => (
          <option key={idx} value={idx}>
            {m.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border 
                   dark:border-gray-600 text-gray-900 dark:text-white"
      />

      <textarea
        placeholder="Lesson Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-28 p-3 rounded-lg bg-white dark:bg-gray-800 border 
                   dark:border-gray-600 text-gray-900 dark:text-white"
      />

      <input
        type="file"
        accept="video/*"
        onChange={uploadVideo}
        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border 
                   dark:border-gray-600"
      />

      {/* Progress Bar */}
      {uploadProgress > 0 && (
        <div className="w-full bg-gray-300 h-3 rounded-lg">
          <div
            className="h-3 bg-orange-500 rounded-lg"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={addLesson}
        className="w-full bg-green-600 hover:bg-green-700 
                   text-white py-3 rounded-xl font-semibold shadow"
      >
        + Add Lesson
      </button>
    </div>
  );
}
