import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Using Next.js's router for page navigation
import { useAuthStore } from "../store/useAuthStore";
import pkg from "../../package.json"; // ✅ for app_version
import { postRequest } from "../utils/api";

interface LoginFormProps {
  onForgot: () => void;
  onSwitch: () => void;
  onClose: () => void; // Add onClose to the interface
}

const LoginForm: React.FC<LoginFormProps> = ({
  onForgot,
  onSwitch,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        device: "android",
        app_version: pkg.version,
        latitude: "00",
        longitude: "00",
        email,
        password,
      };

      const res = await postRequest("/account/login-validate", payload);

      // ❌ Error case
      if (res?.error) {
        setError(res.message || "Something went wrong.");
      }
      // ✅ Success case
      else if (
        res?.success &&
        res?.data?.user?.user_id &&
        res?.data?.user?.sess_id
      ) {
        const { user } = res.data;
        console.log(user);
        // Store in Zustand
        setAuth(user);
        onClose(); // close modal
        router.push("/account"); // redirect
      }
      // ⚠️ Unexpected response
      else {
        setError("Login failed. Invalid response.");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // If backend sends error inside response
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4">
      <div className="rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Log In
        </h2>
        <div className="flex justify-between mb-4">
          <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 mr-2 text-sm">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 ml-2 text-sm">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="h-5 w-5 mr-2"
            />
            Facebook
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">Or</div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter you Email"
              className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-4 cursor-pointer text-gray-400"
              >
                <img
                  src={
                    showPassword
                      ? "/assets/images/icon/open-eys.svg"
                      : "/assets/images/icon/close-eys.svg"
                  } // Use your image paths here
                  alt="Toggle password visibility"
                  className="w-5 h-5"
                />
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Password
            </label>
            <button
              type="button"
              onClick={onForgot}
              className="text-red-500 hover:underline"
            >
              Forgot?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg text-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t Have An Account Yet?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-black font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
