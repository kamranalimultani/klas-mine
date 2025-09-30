'use client';

import React from 'react';
import OrderSummary from '../components/OrderSummary';
const items = [1, 2, 3]; // Simulated cart items

const cart = () => {
  return (
  <div className="mx-auto pr-0">
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Cart Section */}
      <div className="flex-1 px-20 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">
            Cart <span className="text-sm font-normal text-gray-500">({items.length} items)</span>
          </h2>
          <button className="flex items-center gap-1 text-red-600 border border-red-300 px-4 py-2 rounded-md shadow-sm hover:bg-red-50 transition">
            <img className='w-[20px] h-[20px]' src="assets/images/icon/empty.png" alt="Empty Cart" /> Empty cart
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg mb-4 shadow-sm relative">
            <img
              src="assets/images/order-img.png"
              alt="Art"
              className="w-[200px] h-[128px] object-cover rounded-lg"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium mb-1">Goddess Saraswati Kalighat Art Painting</h3>
              <p className="text-sm text-gray-500">Size: 50 x 40 inches</p>
              <p className="text-green-600 font-semibold text-lg mt-2">
                ₹5,499.00 <span className="text-gray-400 text-sm font-normal">(inclusive of taxes)</span>
              </p>
            </div>
            <button className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-lg bg-red-100 p-3 rounded-lg"><img className='w-[20px] h-[20px]' src="assets/images/icon/empty.png" alt="Empty Cart" /></button>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-[588px]">
        <OrderSummary />
      </div>

    </div>
  </div>

  );
};

export default cart;