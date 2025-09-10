"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: "/assets/images/print01.jpg",
    title: "Simply dummy text of the printing and typesetting",
    price: "₹1,899",
  },
  {
    id: 2,
    image: "/assets/images/print02.jpg",
    title: "Simply dummy text of the printing and typesetting",
    price: "₹1,899",
  },
  {
    id: 3,
    image: "/assets/images/print03.jpg",
    title: "Simply dummy text of the printing and typesetting",
    price: "₹1,899",
  },
  {
    id: 4,
    image: "/assets/images/print04.jpg",
    title: "Simply dummy text of the printing and typesetting",
    price: "₹1,899",
  },
];

export default function ProductGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="pt-[60px] pb-[60px] sm:pt-[90px] sm:pb-[90px] md:pt-[120px] md:pb-[120px] bg-[url('/assets/images/bg04.jpg')] bg-no-repeat bg-cover bg-bottom"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-openSans text-center mb-20 text-[28px] sm:text-[36px] md:text-[48px] lg:text-[66px] font-semibold text-[#333333]"
        >
          Products that you can get products printed (Klass art)
        </motion.p>

   

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 font-medium text-base leading-snug">
                    {product.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-green-600 font-semibold text-lg">
                      {product.price}
                    </span>
                    <a
                      href="#"
                      className="text-blue-500 font-medium hover:underline inline-flex items-center"
                    >
                      View Details
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
