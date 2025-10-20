import React from "react";

const PaymentMethod = ({ submitting }) => {
  return (
    <div className="mt-12">
      <div className="inline-flex items-center gap-2 mb-3">
        <p className="text-gray-500">
          PAYMENT <span className="font-medium text-gray-700">METHOD</span>
        </p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
          <p className="min-w-3.5 h-3.5 border rounded-full bg-green-400"></p>
          <p className="mx-4 text-sm font-medium text-gray-500">
            CASH ON DELIVERY
          </p>
        </div>
      </div>

      <div className="w-full mt-8 text-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-16 py-3 text-sm text-white bg-black disabled:opacity-60"
        >
          {submitting ? "Placing..." : "PLACE ORDER"}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;