'use client';
import React, { useState } from "react";
import FilterSidebar from '../components/FilterSidebar';
import Card from '../components/ProductCard';
import { productsMap } from "../data/products";

// Exported products array

const Products = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="p-6 flex gap-6">
      {/* Column 1: Sidebar */}
<div
  className={`
    fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50
    transform transition-transform duration-300 ease-in-out
    ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
    xl:static xl:translate-x-0 xl:block
  `}
>
     <div className="flex justify-end xl:hidden">
          <button
            className=" m-4 right-4 text-gray-600 hover:text-black"
            onClick={() => setIsFilterOpen(false)}
          >
            ✕
          </button>
        </div>
  <FilterSidebar />
</div>

      {/* Column 2: Content area */}
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-6">
          <h1 className="text-2xl font-semibold">8437 Image result</h1>
          <div className="flex flex-col gap-4 md:flex-row lg:justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search by category, price & more"
              className="border px-4 py-2 rounded-lg w-full md:w-80"
            />
              <div className="flex gap-4">
                <button
                  className="border px-4 py-2 rounded-lg bg-gray-100 xl:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  Filter
                </button>
                <button className="border px-4 py-2 rounded-lg bg-gray-100">
                  Short by
                </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-2 xl:columns-3 gap-6 space-y-6">
          {productsMap.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
