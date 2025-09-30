"use client";

import React, { useState } from "react";
import { Sparkles } from 'lucide-react'; // Optional, replace with custom SVG if needed


const options = [
  { label: "Square", size: "1:1", icon: "/assets/images/icon/square.svg" },
  { label: "Widescreen", size: "16:9", icon: "/assets/images/icon/widescreen.svg" },
  { label: "Social story", size: "9:16", icon: "/assets/images/icon/social-story.svg" },
  { label: "Portrait", size: "2:3", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Traditional", size: "3:4", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Vertical", size: "1:2", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Horizontal", size: "2:1", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Social post", size: "4:5", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Standard", size: "3:2", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Classic", size: "4:3", icon: "/assets/images/icon/rectangle.svg" },
  { label: "Orientation", size: "4:5", icon: "/assets/images/icon/rectangle.svg" },
];

const artisticStyles = [
  { label: "Van Gogh", icon: "/assets/images/service/van-gogh.jpg" },
  { label: "Picasso", icon: "/assets/images/service/picasso.jpg" },
  { label: "Monet", icon: "/assets/images/service/monet.jpg" },
  { label: "Da Vinci", icon: "/assets/images/service/da-vinci.jpg" },
];

const modernIllustrations = [
  { label: "Van Gogh", icon: "/assets/images/service/van-gogh.jpg" },
  { label: "Picasso", icon: "/assets/images/service/picasso.jpg" },
  { label: "Monet", icon: "/assets/images/service/monet.jpg" },
  { label: "Da Vinci", icon: "/assets/images/service/da-vinci.jpg" },
];

export default function ImageGeneratorOption() {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [value, setValue] = useState(1); // Default value

  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(artisticStyles[0]);

  const handleSelectSize = (option: { label: string; size: string; icon: string }) => {
    setSelectedOption(option);
    setIsSizeOpen(false);
  };

  const handleSelectStyle = (style: { label: string; icon: string }) => {
    setSelectedStyle(style);
    setIsStyleOpen(false);
  };

  const generateImage = () => {
    alert(`Generating image with ${selectedOption.label} (${selectedOption.size})`);
    alert(`Generating image with ${selectedStyle.label}`);
  };

    const [enabled, setEnabled] = useState(false);


  return (
    <div className="h-[calc(100vh-65px)] text-black w-[360px] 2xl:w-[420px] p-6 border-r border-gray-300 bg-white flex">
      <div className="w-full">
        <h2 className="text-xl font-normal mb-4">Generate an Image</h2>

        <textarea
          className="w-full h-24 p-3 border border-gray-400 rounded-md"
          placeholder="Enter your prompt..."
        />

        <div className="flex items-center justify-between py-2 w-full max-w-md bg-white rounded-lg">
          {/* Left Icon + Text */}
          <div className="flex items-center gap-3">
            <div className="">
              <img className="w-[32px]" src="/assets/images/icon/enhance.svg" alt="enhance" />
            </div>
            <span className="text-lg font-medium text-gray-800">Enhance</span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
              enabled ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                enabled ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>

        {/* Size Dropdown */}
        <div onClick={() => setIsSizeOpen(!isSizeOpen)} className="w-full max-w-sm flex items-center mt-4 justify-between p-3 border border-gray-300 rounded-md bg-white cursor-pointer relative">
          <div className="flex">
            <label className="w-[170px] flex items-center gap-2 cursor-pointer">
              <img src={selectedOption.icon} alt={selectedOption.label} />
              <span className="text-gray-700 font-medium">{selectedOption.label}</span>
            </label>
            <span className="text-sm text-gray-700/50">#{selectedOption.size}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isSizeOpen ? "rotate-180" : "rotate-0"}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {isSizeOpen && (
          <div className="absolute max-w-[370px] w-full left-[590px] top-[200px] mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10">
            <ul className="p-2">
              {options.map((option) => (
                <li
                  key={option.label}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => handleSelectSize(option)}
                >
                  <img src={option.icon} alt={option.label} className="w-6 h-6" />
                  <span>{option.size}</span>
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Style Dropdown */}
        <div onClick={() => setIsStyleOpen(!isStyleOpen)} className="w-full max-w-sm flex items-center mt-4 justify-between p-3 border border-gray-300 rounded-md bg-white cursor-pointer relative">
          <div className="flex">
            <label className="flex w-[170px] items-center gap-2 cursor-pointer">
              <img src="/assets/images/icon/style-list.svg" alt="style" />
              <span className="text-gray-700 font-medium">Style Selection</span>
            </label>
            <span className="text-sm text-gray-700/50">#{selectedStyle.label}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isStyleOpen ? "rotate-180" : "rotate-0"}`}
              viewBox="0 0 24 24"
              fill="none">
              <path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {isStyleOpen && (
          <div className="absolute max-w-[370px] pt-5 w-full left-[590px] top-[200px] mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10">
            {/* Artistic Styles */}
            <h4 className="text-sm font-semibold text-[16px] text-black px-4 mb-2">Artistic Styles</h4>
            <ul className="p-2 flex flex-wrap">
              {artisticStyles.map((style, index) => (
                <li key={`artistic-${index}`} className="flex w-1/2 items-center gap-2 c-select-image p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => handleSelectStyle(style)}>
                  <input type="checkbox" id={`artistic-${index}`} className="Faccent-blue-500 absolute" />
                  <label htmlFor={`artistic-${index}`} className="flex relative items-center gap-2 cursor-pointer w-full">
                    <img src={style.icon} alt={style.label} className="w-full h-auto" />
                    <p className="text-sm absolute bg-white/10 bottom-0  w-full backdrop-blur-sm text-center p-[4px_0px] text-white">{style.label}</p>
                  </label>
                </li>
              ))}
            </ul>
              {/* Modern Illustration */}
              <h4 className="text-sm font-semibold text-[16px] text-black px-4 mt-4 mb-2">Modern Illustration</h4>
              <ul className="p-2 flex flex-wrap">
              {modernIllustrations.map((style, index) => (
                <li key={`modern-${index}`} className="flex w-1/2 items-center gap-2 c-select-image p-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => handleSelectStyle(style)}>
                  <input type="checkbox" id={`modern-${index}`} className="accent-blue-500 absolute" />
                  <label htmlFor={`modern-${index}`} className="flex relative items-center gap-2 cursor-pointer w-full">
                    <img src={style.icon} alt={style.label} className="w-full h-auto" />
                    <p className="text-sm absolute bg-white/10 bottom-0  w-full backdrop-blur-sm text-center p-[4px_0px] text-white">{style.label}</p>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      <div className="mt-5">
        <h4 className="text-lg text-left font-normal mb-5">Image to create</h4>
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
          <div className="relative w-full">
            {/* Slider Input */}
            <input
              type="range"
              min="1"
              max="4"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full relative cursor-pointer bg-transparentrelative z-[99999] top-[-6px] opacity-0"
            />

            {/* Custom Track */}
            <div className="absolute top-[0px] inset-0 h-2 bg-gray-300 rounded-full"></div>

            {/* Custom Handle */}
            <div
              className="absolute  left-0 translate-y-[-33px]  translate-x-[-10px] w-6 h-6 rounded-full bg-[linear-gradient(112.06deg,#C289FF_-6.95%,#5555FF_59.24%)] transition-all"
              style={{ left: `${(value - 1) * 33.3}%` }} // Adjust position dynamically
            ></div>

            {/* Number Labels */}
            <div className="flex justify-between mt-1">
              {[1, 2, 3, 4].map((num) => (
                <span key={num} className="text-sm font-medium">
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Generate Button */}
        <button
          onClick={generateImage}
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Generate Image
        </button>
      </div>
    </div>
  );
}
