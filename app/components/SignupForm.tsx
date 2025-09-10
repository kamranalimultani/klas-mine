// "use client";
import React from "react";

interface SignupFormProps {
  onSwitch: () => void; // Switch between Login and Signup
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
  return (
    <div className="flex items-center justify-center bg-white px-4">
      <div className="rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

        <div className="flex justify-between mb-4">
          <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 mr-2 text-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 ml-2 text-sm">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-5 w-5 mr-2" />
            Facebook
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">Or</div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400">
                👁️
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute right-3 top-3 cursor-pointer text-gray-400">
                👁️
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg text-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already Have An Account?{" "}
          <button
            type="button"
            onClick={onSwitch} // Switch between Login and Sign Up
            className="text-black font-medium hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
