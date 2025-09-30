"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiEye, FiFilter } from "react-icons/fi";
import { postRequest } from "@/app/utils/api";
import { useAuthStore } from "@/app/store/useAuthStore";

const tabs = ["All", "Active", "Sale"];

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_product: 0,
    total_active_product: 0,
    total_sale_product: 0,
  });
  const user = useAuthStore((state) => state.user);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-lg text-gray-600">Loading profile...</span>
      </div>
    );
  }
  const fetchData = async () => {
    try {
      const response = await postRequest("/dashboard", {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        user_id: user.user_id,
        sess_id: user.sess_id,
        page: page.toString(),
        query: searchTerm,
        orientation_ids: [],
        sub_category_id: "",
        article_category_id: "",
        price: "",
      });

      if (response.success) {
        setStats({
          total_product: response.data.total_product,
          total_active_product: response.data.total_active_product,
          total_sale_product: response.data.total_sale_product,
        });
        setProducts(response.data.posts);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch API Data
  useEffect(() => {
    fetchData();
  }, []);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (activeTab === "Active") {
      return product.status_text === "Active" && matchesSearch;
    }
    if (activeTab === "Sale") {
      return product.status_text === "Sale" && matchesSearch;
    }
    return matchesSearch; // "All"
  });

  return (
    <>
      {/* Header Section */}
      <div className="min-h-[200px] py-12">
        <h1 className="font-medium text-[#333333] text-[44px] mb-2">
          Dashboard
        </h1>
        <p className="text-[24px] font-semibold text-[rgba(123,74,231,1)] font-['Open_Sans'] mb-1">
          Welcome Back, {user.name}!
        </p>
        <p className="text-[14px] font-normal text-[#ADB8C9] font-['Open_Sans']">
          Here’s what happening with your business today
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {/* Total Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-purple-100 rounded-full p-4">
              <Image
                src="/assets/images/icon/store.svg"
                alt="Total Products Icon"
                width={30}
                height={30}
              />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Total Products</p>
              <p className="text-[34px] font-bold text-[#333333]">
                {" "}
                {stats.total_product}
              </p>
            </div>
          </div>

          {/* Active Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-indigo-100 rounded-full p-4">
              <Image
                src="/assets/images/icon/analytics.svg"
                alt="Active Products Icon"
                width={30}
                height={30}
              />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Active Products</p>
              <p className="text-[34px] font-bold text-[#333333]">
                {" "}
                {stats.total_active_product}
              </p>
            </div>
          </div>

          {/* Sale Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="bg-red-100 rounded-full p-4">
              <Image
                src="/assets/images/icon/date.svg"
                alt="Sale Products Icon"
                width={30}
                height={30}
              />
            </div>
            <div>
              <p className="text-gray-400 text-[18px] mb-1">Sale Products</p>
              <p className="text-[34px] font-bold text-[#333333]">
                {" "}
                {stats.total_sale_product}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-8 pt-0">
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
                      ? "bg-[#5054C2] text-white"
                      : "bg-white text-gray-600 border-purple-200"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
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
                  <th className="px-5 py-5 w-[350px] font-medium">
                    Product Name
                  </th>
                  <th className="px-5 py-5 font-medium">Category</th>
                  <th className="px-5 py-5 font-medium">Price</th>
                  <th className="px-5 py-5 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((item, index) => (
                    <tr
                      key={item.post_id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-[#555555]">{index + 1}.</td>
                      <td className="px-4 py-3 text-[#555555]">
                        <Image
                          src={item.image_url}
                          alt={`Image of ${item.image_url}`}
                          width={100}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 text-[#555555] text-[14px]">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-[#555555] text-[14px]">
                        {item.article_category_name}
                      </td>
                      <td className="px-4 py-3 text-[#555555] text-[14px]">
                        ₹{item.price}
                      </td>
                      <td className="px-4 py-3 text-[#555555] text-[14px] text-center">
                        <FiEye className="text-gray-600 inline-block cursor-pointer hover:text-purple-600" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
