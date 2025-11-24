import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPaying, setIsPaying] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // ✅ Handle Pay Now Click
  const handlePay = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to complete your payment!");
      navigate("/auth?mode=login");
      return;
    }

    try {
      setIsPaying(true);

      // Loop through each course and mark it purchased
      for (const course of cart) {
        await axios.post(
          `https://lms-backend-fezb.onrender.com/courses/purchase/${course._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      clearCart();
      alert("✅ Payment successful! Courses added to your learning dashboard.");
      navigate("/my-learning");
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  // 🧭 Redirect if cart is empty
  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-transform hover:scale-[1.01] duration-300">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Secure Payment
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Review your total before confirming payment.
        </p>

        {/* Payment Summary */}
        <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-8">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
          <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span className="text-orange-500">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePay}
          disabled={isPaying}
          className={`w-full ${
            isPaying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-lg`}
        >
          {isPaying ? "Processing..." : "Pay Now 💳"}
        </button>

        {/* Footer text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
          Payments are encrypted and secure. You will be redirected to your
          courses upon success.
        </p>
      </div>
    </div>
  );
}
