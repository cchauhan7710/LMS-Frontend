import React, { useState, useMemo, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CourseCard from '../components/ui/CourseCard';

// Header Component
const PageHeader = ({ title, subtitle }) => (
  <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
    <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  </div>
);

const CoursesPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const authStatus = !!localStorage.getItem("token");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/courses/all").then(res => {
      setCourses(res.data);
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortOrder, setSortOrder] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (course) => {
    if (!authStatus) return navigate('/auth');
    addToCart(course);
    navigate('/cart');
  };

  const handleBuyNow = (course) => {
    if (!authStatus) return navigate('/auth');
    addToCart(course);
    navigate('/cart');
  };

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
      const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
      const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && levelMatch && searchMatch && course.thumbnail; // ✅ Only courses with thumbnail
    });

    switch (sortOrder) {
      case 'price-asc': return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc': return filtered.sort((a, b) => b.price - a.price);
      default: return filtered;
    }
  }, [courses, selectedCategory, selectedLevel, searchTerm, sortOrder]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <PageHeader title="Our Courses" subtitle="Explore our catalog of expert-led courses." />

      <div className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-grow w-full">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {filteredAndSortedCourses.length} results
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedCourses.map(course => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onAddToCart={() => handleAddToCart(course)}
                  onBuyNow={() => handleBuyNow(course)}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
