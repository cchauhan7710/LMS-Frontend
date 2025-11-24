import React, { useState, useMemo, useEffect } from 'react';
import { COURSES } from '../constants';
import { ArrowLeftIcon, PlayCircleIcon, CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '../components/icons/IconLibrary';

const base = COURSES;
const custom = JSON.parse(localStorage.getItem("custom_courses") || "[]");
const allCourses = [...base, ...custom];


// --- MOCK DATA ---
// In a real app, this would come from user data
const PURCHASED_COURSE_IDS = [1, 6];

// --- SUB-COMPONENTS ---
const ModuleAccordion = ({ module, activeLesson, onLessonClick }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-bold text-gray-800 dark:text-gray-200">{module.title}</h3>
                {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="pb-2">
                    {module.lessons.map(lesson => (
                        <button 
                            key={lesson.title}
                            onClick={() => onLessonClick(lesson)}
                            className={`w-full text-left p-4 flex items-start gap-3 curriculum-lesson ${activeLesson.title === lesson.title ? 'active' : ''}`}
                        >
                            <PlayCircleIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-700 dark:text-gray-300 lesson-title">{lesson.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const MyCoursesPage = ({ navigate }) => {
    const purchasedCourses = useMemo(() => COURSES.filter(c => PURCHASED_COURSE_IDS.includes(c.id)), []);
    
    const getInitialCourse = () => {
        const lastActiveId = localStorage.getItem('sushil-academy-active-course');
        if (lastActiveId) {
            localStorage.removeItem('sushil-academy-active-course'); // Use only once
            const lastActiveCourse = purchasedCourses.find(c => c.id === parseInt(lastActiveId, 10));
            if (lastActiveCourse) return lastActiveCourse;
        }
        return purchasedCourses[0];
    };
    
    const [activeCourse, setActiveCourse] = useState(getInitialCourse());
    const [activeLesson, setActiveLesson] = useState(activeCourse?.modules[0]?.lessons[0]);

    useEffect(() => {
        if (activeCourse) {
            try {
                const storedValue = localStorage.getItem('sushil-academy-recently-viewed');
                let recentlyViewed = storedValue ? JSON.parse(storedValue) : [];
                
                recentlyViewed = recentlyViewed.filter(id => id !== activeCourse.id);
                recentlyViewed.unshift(activeCourse.id);

                const updatedList = recentlyViewed.slice(0, 4);
                
                localStorage.setItem('sushil-academy-recently-viewed', JSON.stringify(updatedList));
            } catch (error) {
                console.error("Failed to update recently viewed courses:", error);
            }
        }
    }, [activeCourse]);


    if (!activeCourse || !activeLesson) {
        return (
             <div className="p-8 md:p-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">My Learning</h1>
                <p className="text-gray-600 dark:text-gray-400">You have not purchased any courses yet.</p>
                <button onClick={() => navigate('courses')} className="mt-4 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg">
                    Browse Courses
                </button>
            </div>
        );
    }
    
    return (
        <div className="w-full h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* --- Header --- */}
            <header className="w-full h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0">
                <button onClick={() => navigate('dashboard')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Back to Dashboard</span>
                </button>
                <div className="relative">
                     <select 
                        value={activeCourse.id}
                        onChange={(e) => {
                            const newCourse = purchasedCourses.find(c => c.id === parseInt(e.target.value, 10));
                            if (newCourse) {
                                setActiveCourse(newCourse);
                                setActiveLesson(newCourse.modules[0]?.lessons[0]);
                            }
                        }}
                        className="text-xl font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-0 focus:ring-0 appearance-none pr-8 cursor-pointer"
                        aria-label="Select course"
                    >
                        {purchasedCourses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="w-48"></div> {/* Spacer */}
            </header>

            {/* --- Main Content --- */}
            <div className="flex-grow flex overflow-hidden">
                {/* --- Video Player Pane --- */}
                <main className="flex-1 flex flex-col bg-gray-900 overflow-y-auto">
                    <div className="aspect-video w-full bg-black">
                         <video
                            key={activeLesson.videoUrl}
                            className="w-full h-full"
                            controls
                            autoPlay
                            src={activeLesson.videoUrl}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-white mb-4">{activeLesson.title}</h2>
                        {/* Add tabs for description, Q&A, etc. here */}
                    </div>
                </main>

                {/* --- Curriculum Sidebar --- */}
                <aside className="w-96 h-full bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Content</h2>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {activeCourse.modules.map(module => (
                            <ModuleAccordion 
                                key={module.title}
                                module={module}
                                activeLesson={activeLesson}
                                onLessonClick={setActiveLesson}
                            />
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default MyCoursesPage;