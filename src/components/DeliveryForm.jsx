import React from "react";

const DeliveryForm = ({ form, handleChange }) => {
  return (
    <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
      <div className="my-3 text-xl sm:text-2xl">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="text-gray-500">
            DELIVERY <span className="font-medium text-gray-700">INFORMATION</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      <div className="flex gap-3">
        <input  name="firstName" value={form.firstName} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
        <input  name="lastName" value={form.lastName} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
      </div>

      <input  name="email" value={form.email} onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
      <input  name="street" value={form.street} onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

      <div className="flex gap-3">
        <input  name="city" value={form.city} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
        <input name="state" value={form.state} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
      </div>

      <div className="flex gap-3">
        <input  name="zipcode" value={form.zipcode} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Zipcode" />
        <input  name="country" value={form.country} onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
      </div>

      <input  name="phone" value={form.phone} onChange={handleChange}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Phone" />
    </div>
  );
};

export default DeliveryForm;