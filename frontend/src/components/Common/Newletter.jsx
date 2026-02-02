import React from "react";

const Newletter = () => {
  return (
    <div className="w-full border-t flex justify-center bg-gray-50 px-6 sm:px-10 lg:px-16 py-16">
      <div className="text-center">
        <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4">
          Newsletter
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-xl mx-auto">
          Subscribe to receive updates on new arrivals, exclusive drops, and
          special offers.
        </p>

        <p className="text-xs font-medium text-gray-700 mb-6">
          Get 10% off your first order.
        </p>

        <form className="flex max-w-xl mx-auto border border-gray-300 rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-3 text-sm focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 text-xs uppercase tracking-widest hover:bg-gray-900 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newletter;
