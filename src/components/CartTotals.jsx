import React from "react";
import { useNavigate } from "react-router-dom";

const CartTotals = ({ subtotal }) => {
  const shippingFee = 0;
  const total = subtotal + shippingFee;
  const navigate = useNavigate()

  return (
    <div className="flex justify-end my-20">
      <div className="w-full sm:w-[450px]">
        <div className="inline-flex items-center gap-2 mb-4 text-2xl">
          <p>
            cart <span className="font-medium text-gray-700">totals</span>
          </p>
          <div className="w-8 sm:w-12 h-[2px] bg-gray-700"></div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>Rs {subtotal}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{shippingFee === 0 ? "Free always" : `Rs ${shippingFee}`}</p>
          </div>
          <hr />
          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>Rs {total}</p>
          </div>

          <div className="w-full text-end">
            <button 
            onClick={() => navigate("/placeorder")}
            className="px-8 py-3 my-8 text-sm text-white transition bg-black rounded-lg hover:bg-gray-800">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;