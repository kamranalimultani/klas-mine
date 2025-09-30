"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function ProductPreview() {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='h-[calc(100vh-65px)] bg-gray-100'>
      <div className="max-w-6xl mx-auto px-4 py-8  grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Main Preview */}
        <div>
          <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/assets/images/preview01.jpg"
                alt="Selected Frame"
                width={600}
                height={600}
                className="rounded-xl"
              />
             <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-3 font-medium hover:bg-black/80 focus:outline-none focus:ring-0"
            >
              Preview
            </button>
            </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl overflow-hidden relative max-w-full max-h-full shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 z-50"
              aria-label="Close Preview"
            >
              ✕
            </button>

            {/* Modal Image */}
            <Image
              src="/assets/images/preview01.jpg"
              alt="Full Preview"
              width={800}
              height={800}
              className="object-contain max-w-full max-h-[90vh]"
            />
          </div>
        </div>
      )}

          {/* Thumbnail Images */}
          <div className="mt-4 flex mx-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-20 h-16 w-[136px] h-[80px] relative overflow-hidden border-2 rounded-md ${i === 1 ? 'border-blue-500' : 'border-transparent'}`}>
                <Image
                  src={`/assets/images/print${i.toString().padStart(2, '0')}.jpg`}
                  alt={`Thumb ${i}`}
                  fill
                  className="object-cover rounded-md"
                />
            </div>
            ))}
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold leading-tight">
            Black border with Flat lay of photo frame on textured surface
          </h2>

          {/* Orientation */}
          <div>
            <p className="mb-1 font-medium">Orientation</p>
            <div className="flex gap-2 flex-wrap">
              {['1:1 Square', '2:3 Portrait', '3:4 Traditional', '4:3 Classic'].map((opt, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 border rounded-md ${i === 0 ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="mb-1 font-medium">Color</p>
            <div className="flex gap-3">
              {['Black', 'Golden', 'Brown'].map((color, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-md ${color === 'Black' ? 'bg-black text-white border-2 border-indigo-400' :
                    color === 'Golden' ? 'bg-yellow-500 text-white' :
                      'bg-[#7b4c3c] text-white'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="text-green-600 font-bold text-xl">
            ₹ 499 <span className="text-gray-500 text-sm font-normal">(inclusive of taxes)</span>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2">-</button>
              <input type="text" readOnly value={quantity.toString().padStart(2, '0')} className="w-10 text-center" />
              <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2">+</button>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-md shadow">
              Add to Cart
            </button>
          </div>

          <button className="border border-blue-500 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50">
            List Market Place
          </button>
        </div>
      </div>
    </div>
  );
}