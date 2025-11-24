import React from "react";
import axios from "axios";

import {
  ArrowLeftIcon,
  BookOpenIcon,
  UsersIcon,
  TrendingUpIcon,
} from "../components/icons/IconLibrary";

const PageHeader = ({ title, subtitle, handleBack, showBackButton }) => (
  <div className="relative bg-gradient-to-b from-orange-100/60 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 py-20 overflow-hidden">

    {/* Soft Glow Effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-200/40 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-200/40 dark:bg-yellow-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex items-center
          text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400
          transition p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
        {title}
      </h1>

      <p className="text-lg mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

const AboutPage = ({ handleBack, history }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="About Coach Sushil Arora"
        subtitle="India’s Leading Business Coach & Motivational Speaker"
        handleBack={handleBack}
        showBackButton={history && history.length > 0}
      />

      <div className="p-6 md:p-12 max-w-6xl mx-auto">

        {/* Founder Section */}
        <section className="mb-20 flex flex-col md:flex-row items-center gap-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-12 shadow-xl">
          
          {/* Profile */}
          <div className="md:w-1/3 text-center flex flex-col items-center">
            <img
              src="/profileImage/ProfileImage.jpg"
              alt="Sushil Arora Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-orange-500 shadow-xl mb-5"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Coach Sushil Arora
            </h3>
            <p className="text-orange-600 dark:text-orange-400 font-semibold mt-1">
              India's Top Business Coach
            </p>
          </div>

          {/* Text Content */}
          <div className="md:w-2/3 space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <p>
              Coach <b>Sushil Arora</b> is a leading Business Coach & Motivational Speaker known for
              powerful trainings that drive transformation, leadership excellence, and performance growth.
            </p>
            <p>
              With <b>25+ years of experience</b> in business strategy, leadership development, and team
              transformation, he has mentored CEOs, entrepreneurs, managers, and corporates across India and globally.
            </p>
            <p>
              He holds a prestigious <b>Global Business Management Certification from IIM Ahmedabad</b>.
            </p>
            <p>
              His workshops across the <b>Middle East, U.S., South Africa</b> have helped thousands gain clarity,
              direction, and measurable results.
            </p>
            <p>
              Renowned brands like <b>HDFC Bank, DCB Bank, Tally Solutions, Mortein, YKK</b> rely on his expertise.
            </p>
            <p>
              His delivery style blends storytelling, real-case studies, and interactive activities that create
              memorable impact and transformation.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <BookOpenIcon className="w-10 h-10 text-orange-500" />,
              title: "Transformational Learning",
              desc: "Training that inspires deep change in mindset, performance & leadership."
            }, {
              icon: <UsersIcon className="w-10 h-10 text-orange-500" />,
              title: "People-First Approach",
              desc: "Focused on human growth, teamwork and real impact."
            }, {
              icon: <TrendingUpIcon className="w-10 h-10 text-orange-500" />,
              title: "Commitment to Excellence",
              desc: "Driving individuals and teams to perform at their highest potential."
            }].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700
                transition transform hover:-translate-y-2 hover:shadow-xl"
              >
                {item.icon}
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-3">
              Get in Touch
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
              Have a question or want to book a workshop? We'd love to hear from you.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const email = e.target.email.value;
                const message = e.target.message.value;

                try {
                  const res = await axios.post(
                    "https://lms-backend-fezb.onrender.com/support/contact",
                    { name, email, message }
                  );

                  if (res.data.success) {
                    alert("Message sent successfully!");
                    e.target.reset();
                  } else {
                    alert("Failed: " + res.data.message);
                  }
                } catch (err) {
                  alert("Error sending message");
                }
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required name="name" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Your Email</label>
                  <input type="email" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required name="email" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required name="message"></textarea>
              </div>

              <div className="text-center">
                <button className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-12 rounded-xl shadow-lg transition">
                  Send Message
                </button>
              </div>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
