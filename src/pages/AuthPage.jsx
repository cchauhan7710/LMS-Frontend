import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const mode = params.get("mode") || "login";
  const title = mode === "signup" ? "Create Account" : "Welcome Back";

  // OTP states
  const [otpSent, setOtpSent] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  /* =========================
     SEND OTP
  ========================== */
  const sendOtp = async () => {
    const email = document.getElementById("email").value;

    if (!email) return alert("Enter email first");

    const res = await fetch("http://localhost:5000/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP sent to your email!");
      setOtpSent(true);
    } else {
      alert("Failed to send OTP");
    }
  };

  /* =========================
     VERIFY OTP
  ========================== */
  const verifyOtp = async () => {
    const email = document.getElementById("email").value;

    const res = await fetch("http://localhost:5000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Email Verified Successfully!");
      setVerified(true);
    } else {
      alert(data.message);
    }
  };

  /* =========================
     MAIN FORM SUBMIT
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name")?.value;

    /* SIGNUP FLOW */
    if (mode === "signup") {
      if (!verified) return alert("Please verify your email first!");

      const registerRes = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const registerData = await registerRes.json();
      if (!registerData.success)
        return alert("Error: " + registerData.message);
    }

    /* LOGIN FLOW */
    const loginRes = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();
    if (!loginData.success) return alert("Login failed: " + loginData.message);

    localStorage.setItem("token", loginData.token);

    const meRes = await fetch("http://localhost:5000/auth/me", {
      headers: { Authorization: "Bearer " + loginData.token },
    });

    const meData = await meRes.json();
    localStorage.setItem("user", JSON.stringify(meData.user));

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-12">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {mode === "signup"
              ? "Join the Growth Academy today 🚀"
              : "Login to continue your learning journey 🎯"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name input for signup */}
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Full Name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
            />
          </div>

          {/* OTP Section (Signup Only) */}
          {mode === "signup" && (
            <div className="space-y-3">
              {!otpSent && (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
                >
                  Send OTP
                </button>
              )}

              {otpSent && !verified && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg mt-2"
                  />

                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full bg-green-600 text-white py-2 mt-2 rounded-lg"
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {verified && (
                <p className="text-green-600 font-semibold">
                  ✔ Email Verified Successfully
                </p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
          >
            {mode === "signup" ? "Create Account" : "Login"}
          </button>

          {/* Switch Mode */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={() =>
                navigate(
                  mode === "login" ? "/auth?mode=signup" : "/auth?mode=login"
                )
              }
              className="ml-2 font-semibold text-orange-600 hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
