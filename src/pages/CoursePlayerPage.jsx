import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext"; // ⭐ import your theme context

export default function CoursePlayerPage() {
  const { id } = useParams();
  const { theme } = useTheme(); // ⭐ get theme: "light" | "dark"

  const [course, setCourse] = useState(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [openModule, setOpenModule] = useState(null);

  const videoRef = useRef(null);

  /* FETCH COURSE */
  useEffect(() => {
    axios.get(`http://localhost:5000/courses/${id}`).then((res) => {
      setCourse(res.data);

      const saved = localStorage.getItem(`progress_${res.data._id}`);
      if (saved) {
        const p = JSON.parse(saved);
        setModuleIndex(p.moduleIndex);
        setLessonIndex(p.lessonIndex);
        setOpenModule(p.moduleIndex);
      }
    });
  }, [id]);

  const modules = course?.modules || [];
  const currentModule = modules[moduleIndex] || { lessons: [] };
  const currentLesson = currentModule.lessons?.[lessonIndex];

  /* SAVE PROGRESS */
  useEffect(() => {
    if (!course?._id) return;
    localStorage.setItem(
      `progress_${course._id}`,
      JSON.stringify({ moduleIndex, lessonIndex })
    );
  }, [moduleIndex, lessonIndex, course?._id]);

  /* SAVE VIDEO TIME */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !course?._id) return;

    const save = () => {
      localStorage.setItem(
        `time_${course._id}_${moduleIndex}_${lessonIndex}`,
        video.currentTime
      );
    };

    video.addEventListener("timeupdate", save);
    return () => video.removeEventListener("timeupdate", save);
  }, [course?._id, moduleIndex, lessonIndex]);

  /* RESTORE VIDEO TIME */
  useEffect(() => {
    if (!course?._id) return;

    const savedTime = localStorage.getItem(
      `time_${course._id}_${moduleIndex}_${lessonIndex}`
    );

    if (videoRef.current && savedTime) {
      videoRef.current.currentTime = Number(savedTime);
    }
  }, [course?._id, moduleIndex, lessonIndex]);

  /* COMPLETED LOGIC */
  const markCompleted = () => {
    localStorage.setItem(
      `completed_${course._id}_${moduleIndex}_${lessonIndex}`,
      "true"
    );
  };

  const isCompleted = (m, l) =>
    localStorage.getItem(`completed_${course?._id}_${m}_${l}`) === "true";

  const nextLesson = () => {
    markCompleted();

    if (lessonIndex + 1 < currentModule.lessons.length) {
      setLessonIndex(lessonIndex + 1);
      return;
    }

    if (moduleIndex + 1 < modules.length) {
      setModuleIndex(moduleIndex + 1);
      setLessonIndex(0);
      setOpenModule(moduleIndex + 1);
      return;
    }

    alert("🎉 Course Completed!");
  };

  if (!course)
    return <div className="text-center p-10 text-white">Loading Course...</div>;

  if (!currentLesson)
    return <div className="text-center p-10 text-white">No Lessons Found</div>;

  /* ------------------------------
     FINAL UI (Dark/Light Integrated)
  ------------------------------ */
  return (
    <div
      className={`flex h-screen overflow-hidden transition-all ${
        theme === "dark"
          ? "bg-[#0f0f0f] text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* LEFT SIDEBAR */}
      <aside
        className={`w-80 overflow-y-auto border-r sticky top-0 ${
          theme === "dark"
            ? "bg-[#111] border-gray-800"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="p-4 border-b font-bold text-xl">
          {course.title}
        </div>

        {modules.map((mod, mi) => (
          <div key={mi} className="border-b">
            <button
              onClick={() => setOpenModule(openModule === mi ? null : mi)}
              className={`w-full text-left px-4 py-3 font-semibold transition ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
              }`}
            >
              {mod.title}
            </button>

            {openModule === mi && (
              <div className="pl-4 pb-3">
                {mod.lessons.map((les, li) => (
                  <button
                    key={li}
                    onClick={() => {
                      setModuleIndex(mi);
                      setLessonIndex(li);
                    }}
                    className={`w-full text-left flex items-center gap-3 py-2 px-3 rounded transition
                      ${
                        mi === moduleIndex && li === lessonIndex
                          ? "bg-orange-600 text-white"
                          : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-800 hover:bg-gray-200"
                      }
                    `}
                  >
                    {isCompleted(mi, li) ? (
                      <span className="text-green-500">✔</span>
                    ) : (
                      <span>▶</span>
                    )}
                    {les.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* RIGHT SIDE */}
      <main className="flex-1 overflow-y-auto">
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            src={currentLesson.videoUrl}
            controls
            autoPlay
            onEnded={nextLesson}
            className="w-full h-full"
          />
        </div>

        <div className="p-6 flex justify-between">
          <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
          <button
            onClick={nextLesson}
            className="bg-orange-600 px-5 py-2 rounded hover:bg-orange-700"
          >
            Next ▶
          </button>
        </div>

        <div className="px-6 pb-20 text-lg opacity-80">
          <p>{course.description}</p>
        </div>
      </main>
    </div>
  );
}
