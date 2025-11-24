import React from "react";
import axios from "axios";   // ✅ REQUIRED for API call

const SupportPage = ({ navigate }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    try {
      const res = await axios.post("http://localhost:5000/support/contact", {
        name,
        email,
        message,
      });

      if (res.data.success) {
        alert("Your message has been sent! We’ll contact you soon.");
        e.target.reset();
      } else {
        alert("Failed to send message. Try again.");
      }

    } catch (error) {
      console.error("Support form error:", error);
      alert("Error sending message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 md:p-12 transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Need Help? <span className="text-orange-600 dark:text-orange-400">We’re Here for You</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Reach out to our support team anytime — we’ll make sure your
          experience is smooth and issue-free.
        </p>
      </div>

      {/* Support Card */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Contact Support
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                rounded-lg text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                rounded-lg text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                rounded-lg text-gray-900 dark:text-white focus:ring-orange-500 focus:border-orange-500"
              placeholder="Describe your issue or question..."
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md 
              transition transform hover:scale-[1.02]"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>
          For urgent inquiries, email us directly at{" "}
          <a href="mailto:chauhan9378961@gmail.com" className="text-orange-600 dark:text-orange-400 font-medium">
            support@growthacademy.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
