"use client";

import React from "react";
import ImageToImageGenerator from "@/app/components/Sidebar/ImageToImageGenerator";
import ImagesToImages from "@/app/components/ImagestoImages";
import ImageToImagerRghtSidebar from "@/app/components/imagetoimagerightsidebar";
import { useSidebarStore } from "../../store/sidebarStore";

export default function ImageToImage() {


  return (
    <>
      {/* Mobile Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white w-[90%] max-w-[400px] p-4 shadow-lg transform transition-transform duration-300 ease-in-out 2xl:hidden ${
            "-translate-x-full"
        }`}
      >
        <button
          
          className="mb-4 text-red-500 font-semibold"
        >
          ✕ Close
        </button>
        <ImageToImageGenerator />
      </div>

      {/* Mobile Right Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white w-[90%] max-w-[400px] p-4 shadow-lg transform transition-transform duration-300 ease-in-out 2xl:hidden ${
           "translate-x-full"
        }`}
      >
        <button
          
          className="mb-4 text-red-500 font-semibold"
        >
          ✕ Close
        </button>
        <ImageToImagerRghtSidebar />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row w-full">
        {/* Left Sidebar (visible on 2xl+) */}
        <div className="hidden xl:w-[380px] lg:block 2xl:w-[420px]">
          <ImageToImageGenerator />
        </div>

        {/* Center Content */}
        <div className="w-full xl:flex-1 max-w-full bg-gray-100 p-4 lg:p-10 2xl:p-20 mb-[30px] lg:mb-[0]">
          <ImagesToImages />
        </div>

        {/* Right Sidebar (visible on 2xl+) */}
        <div className="hidden xl:w-[380px] lg:block 2xl:w-[420px]">
          <ImageToImagerRghtSidebar />
        </div>
      </div>
    </>
  );
}
