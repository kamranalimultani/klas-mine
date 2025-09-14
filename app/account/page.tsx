"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { postRequest } from "../utils/api";
import { useAuthStore } from "../store/useAuthStore";
import pkg from "../../package.json";
export default function MyProfile() {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "/assets/images/service/van-gogh.jpg"
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [verifyEmail, setVerifyEmail] = useState(false); // <-- add state
  console.log(user);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const user_id = localStorage.getItem("user_id");
      const sess_id = localStorage.getItem("session_id");

      if (!user_id || !sess_id) return;

      try {
        const payload = {
          device: "android",
          app_version: pkg.version,
          latitude: "28.6139",
          longitude: "77.2090",
          user_id: user_id,
          sess_id: sess_id,
        };

        const res = await postRequest("/account/authorized", payload);

        if (res?.success && res?.data?.user) {
          setAuth(res.data.user); // ✅ update latest user in store
          if (res.data.user.image) {
            setProfilePic(res.data.user.image);
          }
        }
        // ✅ handle verify_email flag
        if (res?.verify_email) {
          setVerifyEmail(true);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [user?.user_id, user?.sess_id, setAuth]);
  return (
    <div className="bg-white min-h-screen py-12 space-y-6">
      <h1 className="ont-medium text-[#333333] text-[44px]">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-[#E6E6E6] p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="cursor-pointer relative group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={profilePic}
              alt="Profile"
              width={120}
              height={120}
              className="min-h-[120px]  rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-[rgba(0,0,0,0.48)] bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs">
              Change
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <p className="text-lg text-[#333333] font-semibold text-[24px]">
              {" "}
              <span>Ashish Sahu</span>
            </p>
            <p className="flex mb-2 mt-2 text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans']">
              <span className="mr-3 w-[20px] flex justify-center">
                <img src="/assets/images/icon/mail.svg" alt="mail" />
              </span>
              Ashishsahu3110@gmail.com
            </p>
            <p className="flex text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans']">
              <span className="mr-3 w-[20px] flex justify-center">
                <img src="/assets/images/icon/map.svg" alt="mail" />
              </span>
              Teliabgh, Lucknow, India
            </p>
          </div>
        </div>
        <div className=""></div>
        <div className="flex gap-3">
          {verifyEmail && ( // ✅ Conditionally render Verify Email button
            <button
              onClick={() => alert("Verify Email Clicked!")} // replace with API call
              className="text-white font-semibold text-[16px] font-['Open_Sans'] bg-blue-600 hover:bg-blue-700 cursor-pointer p-[16px] px-[20px] rounded-md flex items-center gap-1"
            >
              <img
                className="mr-2"
                src="/assets/images/icon/mail.svg"
                alt="Verify"
              />
              Verify Email
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] bg-[#F1F2F4] hover:bg-[#dedede] cursor-pointer p-[16px] px-[20px] rounded-md flex items-center gap-1"
          >
            <img
              className="mr-3"
              src="/assets/images/icon/edit.svg"
              alt="Edit"
            />
            Edit
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl border border-[#E6E6E6] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[#333333] font-semibold text-[32px]">
            Personal Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] bg-[#F1F2F4] hover:bg-[#dedede] cursor-pointer p-[16px] px-[20px] rounded-md flex items-center gap-1"
          >
            <img
              className="mr-3"
              src="/assets/images/icon/edit.svg"
              alt="Edit"
            />
            Edit
          </button>
        </div>
        <div className="flex flex-wrap max-w-[720px]">
          <div className="w-1/2">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              First name
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              Ashish
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Last name
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              Sahu
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Email Address
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              ashishsahu3110@gmail.com
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Phone Number
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              +91 8739097812
            </p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-xl border border-[#E6E6E6] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[#333333] font-semibold text-[32px]">Address</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] bg-[#F1F2F4] hover:bg-[#dedede] cursor-pointer p-[16px] px-[20px] rounded-md flex items-center gap-1"
          >
            <img
              className="mr-3"
              src="/assets/images/icon/edit.svg"
              alt="Edit"
            />
            Edit
          </button>
        </div>
        <div className=" mt-3">
          <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
            Building number/ Apartment name/ Area
          </p>
          <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
            A-504, Shaheen Bagh
          </p>
        </div>
        <div className="flex flex-wrap max-w-[720px]">
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              City/State
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              New Delhi
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Country
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              India
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Pincode
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              110084
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Edit Profile
            </Dialog.Title>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
