import React from "react";

const CartSummary = ({ subtotal, shippingFee, loadingCart }) => {
  const total = subtotal + shippingFee;

  return (
    <div className="mt-8 min-w-80">
      <div className="text-2xl">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            CART <span className="font-medium text-gray-700">TOTALS</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rs {loadingCart ? "..." : subtotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>Rs {shippingFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>Rs {loadingCart ? "..." : total}</b>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;