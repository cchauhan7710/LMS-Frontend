import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ModuleBuilder from "./ModuleBuilder";

export default function EditCoursePage() {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [saving, setSaving] = useState(false);

  // 🔄 Update modules coming from ModuleBuilder
  const handleModulesChange = (updatedModules) => {
    setModules(updatedModules);
  };

  // 💾 Save changes to backend
  const saveChanges = async () => {
    if (!id) return;

    setSaving(true);
    try {
      const res = await axios.put(`https://lms-backend-fezb.onrender.com/courses/${id}`, {
        modules,
      });

      alert("✔ Course Updated Successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("❌ Failed to save changes");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10 transition-colors duration-300">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Edit Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Modify your course structure, modules, and lessons.
        </p>
      </div>

      {/* Editor Container */}
      <div className="
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg 
        border border-gray-200 dark:border-gray-700 
        p-8
      ">
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Course ID: <span className="text-orange-500">{id}</span>
          </h2>
        </div>

        {/* Module Builder */}
        <ModuleBuilder courseId={id} onChange={handleModulesChange} />

        {/* SAVE BUTTON */}
        <div className="mt-10 text-right">
          <button
            onClick={saveChanges}
            disabled={saving}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-500 
            text-white px-8 py-3 rounded-xl font-semibold shadow-md 
            transition active:scale-95"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>

    </div>
  );
}
