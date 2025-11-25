import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ArrowRightIcon, Trash2Icon } from "../components/icons/IconLibrary";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const taxRate = 0.1;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  if (cart.length === 0) {
    return (
      <div className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Your Cart is Empty 🛒
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Looks like you haven’t added any courses yet. Start learning today and
          grow your skills with expert guidance!
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
        >
          Browse Courses
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8 md:p-12">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="lg:w-2/3 w-full space-y-5">
          {cart.map((course) => (
            <div
              key={course._id}  {/* ✅ FIXED unique key */}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-5 transition-all duration-300"
            >
              {/* Thumbnail Placeholder */}
              <div className="w-24 h-24 flex-shrink-0 rounded-xl flex items-center justify-center bg-orange-100 dark:bg-orange-900/40 text-center">
                <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                  {course.category}
                </span>
              </div>

              {/* Course Info */}
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Level: {course.level}
                </p>
              </div>

              {/* Price & Remove */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-lg text-orange-600 dark:text-orange-400">
                  ₹{course.price.toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(course._id)}  {/* ✅ FIXED remove id */}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 mt-2 text-sm flex items-center gap-1 transition-colors"
                >
                  <Trash2Icon className="w-5 h-5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Taxes ({(taxRate * 100).toFixed(0)}%)</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-200 dark:border-gray-700 mt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout */}
            <button
              onClick={() => navigate("/payment")}
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-orange-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <ArrowRightIcon className="w-5 h-5" />
            </button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 mt-5 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
