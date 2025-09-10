import { Facebook } from "lucide-react";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-black">
      <footer className=" text-white">
        <div className="px-6 md:px-16 lg:px-36 py-20 container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <span className="font-poppins  self-center text-2xl font-[600] bg-gradient-to-r from-[#C289FF] to-[#5555FF] bg-clip-text text-transparent">
                KLASS ART
              </span>
            </a>
           <div className="flex items-center gap-4 mt-4">
            <img
              src="/assets/images/icon/social-icon01.svg"
              alt="Facebook"
              className="w-[30px] h-[30px]"
            />
            <img
              src="/assets/images/icon/social-icon02.svg"
              alt="Instagram"
              className="w-[30px] h-[30px]"
            />
            <img
              src="/assets/images/icon/social-icon03.svg"
              alt="Twitter"
              className="w-[30px] h-[30px]"
            />
            <img
              src="/assets/images/icon/social-icon04.svg"
              alt="LinkedIn"
              className="w-[30px] h-[30px]"
            />
            <img
              src="/assets/images/icon/social-icon05.svg"
              alt="Pinterest"
              className="w-[30px] h-[30px]"
            />
          </div>

            <div className="rounded-md lg:bg-gray-100  lg:flex-row   flex-col flex items-center justify-between mt-4">
              <input
                type="text"
                name="email"
                className=" px-6 bg-gray-100  text-gray-900 placeholder:text-gray-500 focus:outline-none flex-1 w-full max-w-xl mx-auto lg:w-auto   lg:bg-transparent py-4"
                placeholder="Your email here..."
              />
              <button
                type="submit"
                className="font-openSans rounded-r-md px-7 bg-indigo-600 shadow-md  text-white font-semibold hover:bg-indigo-700 py-4"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="space-y-3 font-poppins">
            <h3 className=" tracking-wide uppercase text-white font-[600] text-2xl">
              Services
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel=" noopener noreferrer" href="#">
                  Prompt to image
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Prompt to image
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Prompt to image
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-white font-black text-2xl">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Product
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-white font-black text-2xl">
              Policy
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Policy 1
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="font-openSans py-3 text-sm text-center text-white  bg-[#0F0F0F]">
          © 2025 klassart. All Rights Reserved. Designed by GlanceTechy
        </div>
      </footer>
    </div>
  );
};