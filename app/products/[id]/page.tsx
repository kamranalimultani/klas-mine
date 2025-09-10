"use client";

import { useParams } from "next/navigation";
import { products } from "../page";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="p-6 text-red-600">Product not found!</div>;
  }

  return (
    <div className="p-6">
                    
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mt-[80px] mb-[80px]">
        {/* Left: Image */}
        <div>
          <img
            src={`/${product.image}`}
            alt={product.title}
            className="w-full rounded-xl shadow-md"
          />
        </div>

        {/* Right: Content */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Category</span> : {product.Category}
          </p>

          <div className=" py-4 my-4">
            <span className="text-green-600 text-2xl font-bold">
              {product.price}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              (inclusive of taxes)
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 shadow-sm">
              Add to cart
            </button>
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 shadow-sm">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
