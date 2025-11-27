import React from 'react';
import { 
  ArrowLeftIcon, 
  AwardIcon, 
  BookOpenIcon, 
  UsersIcon, 
  TrendingUpIcon 
} from '../components/icons/IconLibrary';
import { useNavigate } from "react-router-dom"; // ⭐ Added — Required for navigation

const PageHeader = ({ title, subtitle, handleBack, showBackButton }) => (
  <div className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 py-16">
    <div className="mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
        {title}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

const FeatureDetail = ({ icon: Icon, title, children, iconBgColor }) => (
  <div className="flex flex-col sm:flex-row items-start gap-6 group">
    <div
      className={`shrink-0 p-5 rounded-2xl ${iconBgColor} shadow-md group-hover:shadow-lg transition-all duration-300`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
        {title}
      </h3>
      <div className="text-gray-600 dark:text-gray-400 space-y-3 leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  </div>
);

const WhyChooseUsPage = ({ handleBack, history }) => {
  const navigate = useNavigate(); // ⭐ Added — This fixes the error

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Why Choose Us?"
        subtitle="Discover the unique advantages that make our academy the best choice for your growth."
        handleBack={handleBack}
        showBackButton={history && history.length > 0}
      />

      <div className="p-8 md:p-12">
        <div className="max-w-4xl mx-auto space-y-16">

          <FeatureDetail icon={AwardIcon} title="Expert-Led Instruction" iconBgColor="bg-orange-500">
            <p>
              Learn directly from industry veterans and renowned experts like <b>Sushil Arora</b>. 
              Our instructors bring real-world experience, ensuring every lesson is practical and impactful.
            </p>
            <p>
              Get insights that go beyond textbooks—built from experience, success, and continuous innovation.
            </p>
          </FeatureDetail>

          <FeatureDetail icon={BookOpenIcon} title="Practical, Hands-On Curriculum" iconBgColor="bg-blue-500">
            <p>
              We focus on active learning through <b>projects, case studies,</b> and <b>real-world challenges</b>. 
              You’ll apply concepts immediately and build a portfolio that speaks for your skills.
            </p>
            <p>
              By learning through doing, you’ll gain confidence to tackle real development and design tasks right away.
            </p>
          </FeatureDetail>

          <FeatureDetail icon={UsersIcon} title="Supportive Learning Community" iconBgColor="bg-green-500">
            <p>
              Join a vibrant community of learners, mentors, and professionals who uplift each other. 
              Engage in peer learning, discussions, and project collaborations.
            </p>
            <p>
              Our supportive ecosystem keeps you inspired, accountable, and always growing.
            </p>
          </FeatureDetail>

          <FeatureDetail icon={TrendingUpIcon} title="Focus on Career Growth" iconBgColor="bg-purple-500">
            <p>
              Beyond skills, we prepare you for success—through <b>career guidance, resume building,</b> and 
              <b> interview preparation</b>. We care about your progress after the course too.
            </p>
            <p>
              Our goal: to help you grow, transition, and thrive in your career path with confidence.
            </p>
          </FeatureDetail>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Explore our course catalog and find the perfect program to help you achieve your goals.
          </p>
          <button
            onClick={() => navigate("/courses")} // ⭐ Works now, error solved
            className="
              bg-orange-600 text-white font-semibold py-3 px-10 rounded-xl 
              shadow-lg hover:shadow-xl hover:bg-orange-700 
              transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.97]
            "
          >
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsPage;
