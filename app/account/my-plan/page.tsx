"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import { postRequest } from "@/app/utils/api";
import { useEffect, useState } from "react";
type ActivePlan = {
  plan_name: string;
  price: string;
  description?: string;
  features?: string[];
};
export default function MyPlan() {
  const user = useAuthStore((state) => state.user);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);
  const [loading, setLoading] = useState(true);
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-lg text-gray-600">Loading profile...</span>
      </div>
    );
  }
  const fetchMyPlan = async () => {
    if (!user?.user_id || !user?.sess_id) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        user_id: user.user_id,
        sess_id: user.sess_id,
      };

      const res = await postRequest("/billing/my-plan", payload, true);
      if (res.success && res.data?.active_plan_info?.length > 0) {
        const plan = res.data.active_plan_info[0]; // take first active plan
        setActivePlan({
          plan_name: plan.plan_name,
          price: plan.price,
          description: plan.description,
          features: plan.features || [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch plan:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllPlans = async () => {
    if (!user?.user_id || !user?.sess_id) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        user_id: user.user_id,
        sess_id: user.sess_id,
      };

      const res = await postRequest("/billing/start-billing", payload, true);
      console.log(res);
    } catch (err) {
      console.error("Failed to fetch plan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlan();
    fetchAllPlans();
  }, [user]);

  if (loading) {
    return <p className="text-center py-12">Loading...</p>;
  }
  return (
    <section className="py-12 text-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Experience AI Without Limits
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Go beyond basic AI tools with our Pro and Premium plans for
          high-quality image generation and customization
        </p>
      </div>
      {activePlan ? (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
          <h3 className="text-2xl font-bold text-indigo-600 mb-2">
            {activePlan.plan_name}
          </h3>
          <p className="text-3xl font-bold mb-4 text-[#5555FF]">
            ₹{activePlan.price} <span className="text-base">/monthly</span>
          </p>
          {activePlan.description && (
            <p className="text-gray-600 mb-4">{activePlan.description}</p>
          )}
          <ul className="space-y-2">
            {activePlan.features?.map((f, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                ✅ {f}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grid 2xl:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl text-white p-12 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="flex mb-4">
                <div className="pricing-icon mr-4">
                  <img
                    src="/assets/images/icon/pricing-icon02.svg"
                    alt="Popular"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Pro Plan</h3>
                  <h4 className="text-xl font-bold mb-4">Best for Creators</h4>
                </div>
              </div>
              <span className="bg-white text-purple-600 text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </span>
            </div>
            <p className="text-sm mb-4">
              Content creators, designers, and users who need more flexibility.
            </p>
            <p className="text-3xl font-bold mb-2 text-[54px]">
              ₹499 <span className="text-base font-normal  ">/monthly</span>
            </p>

            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-center text-[17px] text-white">
                <span className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                  <img src="/assets/images/icon/blue-Check.png" alt="Check" />
                </span>
                Unlimited AI image generations
              </li>
              <li className="flex items-center text-[17px] text-white">
                <span className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                  <img src="/assets/images/icon/blue-Check.png" alt="Check" />
                </span>
                High-resolution images
              </li>
              <li className="flex items-center text-[17px] text-white">
                <span className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                  <img src="/assets/images/icon/blue-Check.png" alt="Check" />
                </span>
                No watermark on generated images
              </li>
              <li className="flex items-center text-[17px] text-white">
                <span className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                  <img src="/assets/images/icon/blue-Check.png" alt="Check" />
                </span>
                Access to multiple styles
              </li>
            </ul>

            <button className="mt-6 bg-white text-indigo-600 rounded-xl py-2 w-full font-semibold">
              Get started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow p-12 flex flex-col justify-between">
            <div>
              <div className="flex mb-4">
                <div className="pricing-icon mr-4">
                  <img
                    src="/assets/images/icon/pricing-icon01.svg"
                    alt="Popular"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-600 mb-1">
                    Premium Plan
                  </h3>
                  <h4 className="text-xl font-bold mb-4">For Professionals</h4>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Best for: Businesses, agencies, and professionals who need AI
                without limits.
              </p>
              <p className="text-3xl font-bold mb-2 text-[54px] text-[#5555FF]">
                ₹999{" "}
                <span className="text-base font-normal text-[#8C8B99]">
                  /monthly
                </span>
              </p>

              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-center text-[17px] text-black">
                  <span className="bg-gradient-to-r from-[#C289FF] to-[#5555FF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                    <img src="/assets/images/icon/Check.png" alt="Check" />
                  </span>
                  Unlimited AI image generations
                </li>
                <li className="flex items-center text-[17px] text-black">
                  <span className="bg-gradient-to-r from-[#C289FF] to-[#5555FF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                    <img src="/assets/images/icon/Check.png" alt="Check" />
                  </span>
                  Ultra HD & 4K resolution outputs
                </li>
                <li className="flex items-center text-[17px] text-black">
                  <span className="bg-gradient-to-r from-[#C289FF] to-[#5555FF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                    <img src="/assets/images/icon/Check.png" alt="Check" />
                  </span>
                  No limits – full commercial rights
                </li>
                <li className="flex items-center text-[17px] text-black">
                  <span className="bg-gradient-to-r from-[#C289FF] to-[#5555FF] w-[32px] h-[32px] rounded-full p-2 mr-2">
                    <img src="/assets/images/icon/Check.png" alt="Check" />
                  </span>
                  Enhanced product placement
                </li>
              </ul>
            </div>

            <button className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl py-2 w-full font-medium">
              Start for Free
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
