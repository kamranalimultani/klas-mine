import { Lock } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export default function ImagesToImages() {
  const lockedImages = [1, 2, 3]; // dummy array for locked thumbnails
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Images */}
      <div className="flex flex-col md:flex-row mb-5 gap-4">
        {/* Original Image */}
        <div className="w-full md:w-1/2">
            <img
            src="/assets/images/ai-imagetoimage01.jpg" // replace with actual image
            alt="Original"
            className="w-full rounded-md object-cover"
            />
        </div>

        {/* Enhanced Image with Preview Overlay */}
        <div className="w-full md:w-1/2 relative">
            <img
                src="/assets/images/ai-imagetoimage02.jpg" // replace with actual image
                alt="Enhanced"
                className="w-full rounded-md object-cover"
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
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 py-6">
    <div className="bg-white rounded-[20px] max-w-6xl w-full relative overflow-hidden shadow-2xl">

   

      <div className="">
      <div className="px-6 py-4 bg-[rgba(241,242,244,1)]">
            {/* Heading */}
        <h2 className="text-[20px] font-semibold text-gray-900">Add to Market Place</h2>
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-5 right-7 text-black text-2xl hover:text-gray-600 z-50"
          aria-label="Close"
        >
          ✕
      </button>
      </div>

        <div className="flex flex-col lg:flex-row gap-8 p-8">
          {/* Left Image Area */}
          <div className="w-full lg:w-[45%] flex justify-center">
             <Image
              src="/assets/images/market-place.png"
              alt="Full Preview"
              width={540}
              height={401}
              className="object-contain max-w-full max-h-[90vh]"
            />
          </div>

          {/* Right Form Area */}
          <div className="w-full lg:w-[55%]">
            {/* Product Name */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium mb-1 block">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border border-gray-300 bg-[rgba(241,242,244,1)] rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium mb-1 block">Discription</label>
              <textarea
                rows={4}
                placeholder="Enter product discription"
                className="w-full border border-gray-300 bg-[rgba(241,242,244,1)] rounded-md px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              ></textarea>
            </div>

            {/* Category & Subcategory */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="text-gray-700 font-medium mb-1 block">Category</label>
                <select className="w-full border border-gray-300 rounded-md bg-[rgba(241,242,244,1)] px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400">
                  <option>Select category</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="text-gray-700 font-medium mb-1 block">Subcategory</label>
                <select className="w-full border border-gray-300 rounded-md bg-[rgba(241,242,244,1)] px-4 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400">
                  <option>Select subcategory</option>
                </select>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between bg-[#F2F3F6] rounded-md overflow-hidden w-full">
              {/* Price Section */}
              <div className="flex items-center bg-[#D9D9D9] px-4 py-2 rounded-tl-md border-l border-black rounded-bl-md border-r border-gray-300">
                <span className="text-[20px] font-semibold text-gray-800">₹</span>
              </div>
              <div className="px-4 text-green-600 font-bold text-[20px]">
                499
              </div>

              {/* Taxes Note */}
              <div className="ml-auto pr-4 text-sm text-gray-500 italic">
                (inclusive of taxes)
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pb-8">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-8 py-3 text-indigo-500 border border-indigo-300 rounded-[6px] hover:bg-indigo-50 transition shadow-md"
          >
            Cancel
          </button>
          <button
            className="px-8 py-3 bg-gradient-to-r from-[#6A5BFF] to-[#9F61FF] text-white font-medium rounded-[6px] shadow-md hover:from-[#5a4cfb] hover:to-[#8f51fb] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>

      {/* Thumbnail Row */}
      <div className="flex gap-3 justify-center p-5">
        {/* First Unlocked Thumbnail */}
        <div className="relative max-w-[217px] max-h-[145px] overflow-hidden">
        <img
          src="/assets/images/ai-sm-imagetoimage.jpg"
          alt="Thumbnail 1"
          className="w-full h-full object-cover"
        />
      </div>
        {/* Locked Thumbnails */}
        {lockedImages.map((id) => (
          <div
            key={id}
            className="relative max-w-[217px] max-h-[145px] overflow-hidden"
          >
            <img
              src="/assets/images/ai-sm-imagetoimage.jpg"
              alt={`Locked ${id}`}
              className="w-full h-full object-cover blur-sm brightness-95"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="text-white w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center items-center p-4">
        {/* List market place button */}
        <button className="px-6 py-3 text-blue-600 font-semibold border border-blue-500 rounded-md bg-white shadow-md hover:bg-blue-50 transition">
            List market place
        </button>

        {/* Customize button */}
      <Link href="/Customize">
        <button className="px-6 py-3 text-white font-semibold rounded-md bg-gradient-to-r from-purple-400 to-blue-500 shadow-lg hover:opacity-90 transition">
          Customize
        </button>
      </Link>
      </div>
    </div>
  );
}
