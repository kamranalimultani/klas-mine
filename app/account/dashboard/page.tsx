'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiEye, FiFilter } from 'react-icons/fi';

const productsData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: 'Product Name',
  category: 'Category',
  price: (2560).toLocaleString(),
  image: '/assets/images/product-image.jpg', // Replace with actual image
}));

const tabs = ['All', 'Active', 'Sale'];

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div className="min-h-[200px] py-12">
        <h1 className="font-medium text-[#333333] text-[44px] mb-2">Dashboard</h1>
        <p className="text-[24px] font-semibold text-[rgba(123,74,231,1)] font-['Open_Sans'] mb-1">Welcome Back, Muneer Khan!</p>
        <p className="text-[14px] font-normal text-[#ADB8C9] font-['Open_Sans']">Here’s what happening with your business today</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {/* Total Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-purple-100 rounded-full p-4">
              <Image src="/assets/images/icon/store.svg" alt="Total Products Icon" width={30} height={30} />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Total Products</p>
              <p className="text-[34px] font-bold text-[#333333]">421</p>
            </div>
          </div>

          {/* Active Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-indigo-100 rounded-full p-4">
              <Image src="/assets/images/icon/analytics.svg" alt="Active Products Icon" width={30} height={30} />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Active Products</p>
              <p className="text-[34px] font-bold text-[#333333]">3421</p>
            </div>
          </div>

          {/* Sale Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-red-100 rounded-full p-4">
              <Image src="/assets/images/icon/date.svg" alt="Sale Products Icon" width={30} height={30} />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Sale Products</p>
              <p className="text-[34px] font-bold text-[#333333]">491</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='p-8 pt-0'>
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        {/* Tabs + Search + Filter */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex rounded-md border border-[#5054C2] overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 border-l border-[#5054C2] transition-all ${
                  activeTab === tab
                    ? 'bg-[#5054C2] text-white'
                    : 'bg-white text-gray-600 border-purple-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center w-1/2 justify-end space-x-2 mt-2 sm:mt-0">
            <div className="relative max-w-[400px] w-full">
              <input
                type="text"
                placeholder="Search by name, category and other…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 rounded-md max-w-[400px] w-full bg-[#F2F3FC] text-sm focus:outline-none focus:ring-2 focus:ring-[#5054C2]"
              />
              <svg
                className="absolute left-5 top-4.5 h-4 w-4 text-[#5054C2]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </div>
            <button className="flex items-center px-6 py-4 text-[16px] font-medium text-[#5054C2] bg-[#F2F3FC] rounded-md hover:bg-[#F2F3FC]">
              <FiFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md">
          <table className="w-full table-auto text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-md">
                <th className="px-5 py-5 w-[150px] font-medium">Sr. No.</th>
                <th className="px-5 py-5 w-[150px] font-medium">Image</th>
                <th className="px-5 py-5 w-[350px] font-medium">Product Name</th>
                <th className="px-5 py-5 font-medium">Category</th>
                <th className="px-5 py-5 font-medium">Price</th>
                <th className="px-5 py-5 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-[#555555]">{index + 1}.</td>
                    <td className="px-4 py-3 text-[#555555]">
                      <Image
                        src={item.image}
                        alt={`Image of ${item.name}`}
                        width={100}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-[#555555] text-[14px]">{item.name}</td>
                    <td className="px-4 py-3 text-[#555555] text-[14px]">{item.category}</td>
                    <td className="px-4 py-3 text-[#555555] text-[14px]">₹{item.price}</td>
                    <td className="px-4 py-3 text-[#555555] text-[14px] text-center">
                      <FiEye className="text-gray-600 inline-block cursor-pointer hover:text-purple-600" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}
