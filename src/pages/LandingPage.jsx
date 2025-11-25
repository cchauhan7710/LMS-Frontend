import React from "react";
import {
  ArrowRightIcon,
  TvIcon,
  PaletteIcon,
  BarChartIcon,
} from "../components/icons/IconLibrary";
import ImageSlider from "../components/ui/ImageSlider";
import BrandCarousel from "../components/ui/BrandCarousel";
import TestimonialCard from "../components/ui/TestimonialCard";
import CategoryCard from "../components/ui/CategoryCard";
import InstructorCard from "../components/ui/InstructorCard";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const slides = [
    { url: "/banners/Banner6.jpg" },
    { url: "/banners/Banner4.jpg" },
    { url: "/banners/Banner5.jpg" },
    { url: "/banners/Banner3.jpg" },
    { url: "/banners/Banner7.jpg" },
  ];

  const testimonials = [
    {
      quote:
        "This platform completely changed how I approach business growth. The strategies are practical and easy to apply.",
      name: "Priya Sharma",
      title: "Business Growth Consultant",
      avatar: "/testimonials/img3.png",
    },
    {
      quote:
        "The AI in Business course helped me automate processes and make smarter decisions.",
      name: "Kulwinder Singh",
      title: "AI & Automation Specialist",
      avatar: "/testimonials/img2.jpg",
    },
    {
      quote:
        "This platform gave me clarity and the tools to overcome business challenges.",
      name: "Sandeep Mehta",
      title: "Business Strategy Manager",
      avatar: "/testimonials/img1.png",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* HERO SLIDER */}
      <section className="w-full h-[32vh] xs:h-[38vh] sm:h-[45vh] md:h-[55vh] overflow-hidden">
        <ImageSlider slides={slides} />
      </section>

      {/* INTRO */}
      <section className="py-10 px-4 sm:py-16 md:py-20 text-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold leading-tight">
          Master New Skills,
          <span className="text-orange-600 dark:text-orange-500"> Achieve Your Goals</span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mt-3 text-sm xs:text-base sm:text-lg leading-relaxed">
          Learn from industry experts and build the skills that make you valuable in today’s world.
        </p>

        <div className="flex justify-center mt-6 sm:mt-8 gap-3 sm:gap-4 flex-wrap">
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 sm:px-10 sm:py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg text-sm sm:text-base"
          >
            Browse Courses
          </button>

          <button
            onClick={() => navigate("/auth?mode=signup")}
            className="px-6 py-2 sm:px-10 sm:py-3 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800 text-sm sm:text-base"
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-10 px-4 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-xl mt-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Explore by <span className="text-primary-600">Category</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md mx-auto">
            Find the right course for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <CategoryCard
            navigate={navigate}
            category="AI In Business"
            icon={TvIcon}
            description="Intelligent Business Automation , AI-Powered Business Growth"
          />
          <CategoryCard
            navigate={navigate}
            category="Business Growth Challenges"
            icon={PaletteIcon}
            description="Barriers to Expansion , Challenges in Scaling"
          />
          <CategoryCard
            navigate={navigate}
            category="Growth"
            icon={BarChartIcon}
            description="Grow your business skills, Sustained Upward Movement"
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 px-4 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 rounded-xl mt-6">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold">What Our Students Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>
      </section>

      {/* BRAND CAROUSEL */}
      <BrandCarousel />

      {/* INSTRUCTOR */}
      <section className="py-10 px-4 sm:py-16 md:py-20 bg-white dark:bg-gray-800 rounded-xl mt-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold">Learn from Experts</h2>
        </div>

        <div className="flex justify-center items-center py-8 px-3 sm:px-4 bg-gradient-to-b from-orange-50/50 dark:from-gray-800/50 rounded-xl">
          <div className="max-w-xs sm:max-w-md w-full transition-all hover:-translate-y-1 hover:shadow-xl">
            <InstructorCard
              name="Sushil Arora"
              title="Founder & Head Coach"
              bio="A renowned growth coach and developer with a passion for teaching and mentorship."
              avatar="/profileImage/ProfileImage.jpg"
              onLearnMore={() => navigate("/about")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
