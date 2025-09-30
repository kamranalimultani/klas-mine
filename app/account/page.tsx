"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useAuthStore } from "../store/useAuthStore";
import { postRequest, uploadProfileImage } from "../utils/api";
export default function MyProfile() {
  const user = useAuthStore((state) => state.user);
  // form states
  const [nameInput, setNameInput] = useState(user?.name ?? "");
  const [emailInput, setEmailInput] = useState(user?.email ?? "");
  const [phoneInput, setPhoneInput] = useState(user?.phone ?? "");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressLine, setAddressLine] = useState(
    user?.address?.address_line_1 ?? ""
  );
  const [city, setCity] = useState(user?.address?.city ?? "");
  const [zip, setZip] = useState(user?.address?.zip ?? "");
  const [stateCode, setStateCode] = useState(user?.address?.state_code ?? "");
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "/assets/images/service/van-gogh.jpg"
  );
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-lg text-gray-600">Loading profile...</span>
      </div>
    );
  }

  // ✅ handle address update
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      setLoading(true);
      const updated = await postRequest("/account/update-address", {
        user_id: user.user_id,
        sess_id: user.sess_id,
        address_line_1: addressLine,
        city,
        zip,
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        state_code: stateCode,
      });

      // Update state after success
      setAuth({
        ...user,
        address: {
          ...user.address,
          address_line_1: addressLine,
          city,
          zip,
          state_code: stateCode,
        },
      });

      setIsAddressModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || !user) return;

    setFile(selected);

    // show preview while uploading
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(selected);

    try {
      setLoading(true);

      // Step 1: upload image
      const res = await uploadProfileImage(selected, user);
      const fileUrl = res?.data?.file_obj?.file_url;

      if (!fileUrl) throw new Error("Failed to upload image");

      // Step 2: update profile immediately with new image
      await postRequest("/account/update-profile", {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        sess_id: user.sess_id,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: fileUrl, // ✅ use uploaded file URL
      });
      console.log(fileUrl);
      // Step 3: update state
      setAuth({
        ...user,
        image: fileUrl,
      });
      setProfilePic(fileUrl);
    } catch (err: any) {
      alert(err.message || "Image update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);

      // Step 2: Update profile
      const updated = await postRequest("/account/update-profile", {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        sess_id: user.sess_id,
        user_id: user.user_id,
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
      });

      // Step 3: Sync state
      setAuth({
        ...user,
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
      });

      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // ✅ Show loading if user not loaded yet
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
              src={user?.image ? user?.image : profilePic}
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
              <span>{user.name}</span>
            </p>
            <p className="flex mb-2 mt-2 text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans']">
              <span className="mr-3 w-[20px] flex justify-center">
                <img src="/assets/images/icon/mail.svg" alt="mail" />
              </span>
              {user.email}
            </p>
            <p className="flex text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans']">
              <span className="mr-3 w-[20px] flex justify-center">
                <img src="/assets/images/icon/map.svg" alt="mail" />
              </span>
              {user.address?.address_line_1 || "N/A"},{" "}
              {user.address?.city || "N/A"} - {user.address?.zip || "N/A"},{" "}
              {user.address?.state_code || "N/A"}{" "}
            </p>
          </div>
        </div>
        <div className=""></div>
        <div className="flex gap-3">
          {user?.is_email_verified === "0" && ( // ✅ Conditionally render Verify Email button
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
              First Name
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              {user.name}
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Last name
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]"></p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Email Address
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              {user.email}
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Phone Number
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              {user.phone ?? ""}
            </p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-white rounded-xl border border-[#E6E6E6] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[#333333] font-semibold text-[32px]">Address</h2>
          <button
            onClick={() => setIsAddressModalOpen(true)}
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
            Locality
          </p>
          <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
            {" "}
            {user.address?.address_line_1}
          </p>
        </div>
        <div className="flex flex-wrap max-w-[720px]">
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              City/State
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              {user.address?.city}
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Country
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              India
              {user.address?.country ?? ""}
            </p>
          </div>
          <div className="w-1/2 mt-3">
            <p className="text-[rgba(51,51,51,0.5)] font-semibold text-[16px] font-['Open_Sans'] mb-2">
              Pincode
            </p>
            <p className="font-semibold text-[16px] font-['Open_Sans'] text-[#333333]">
              {user.address?.zip}
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="First Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
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
      {/* Address Edit Modal */}
      <Dialog
        open={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Edit Address
            </Dialog.Title>
            <form className="space-y-4" onSubmit={handleAddressSubmit}>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Address Line 1"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip Code"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                placeholder="State Code"
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
