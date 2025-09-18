// utils/api.ts
import axios from "axios";
import { User } from "../store/useAuthStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // keep base url in .env

// Get token/session_id from localStorage (safe check for server-side)
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const sessionId = localStorage.getItem("session_id");
    const userId = localStorage.getItem("user_id");

    return {
      "Content-Type": "application/json",
      "x-user-id": userId || "",
    };
  }
  return {};
};

// Generic request
const request = async (
  method: string,
  endpoint: string,
  body?: any,
  withToken: boolean = false
) => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (withToken) {
    Object.assign(headers, getAuthHeaders());
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }

  return res.json();
};

// Exported helpers
export const getRequest = (endpoint: string, withToken = false) =>
  request("GET", endpoint, null, withToken);

export const postRequest = (endpoint: string, body: any, withToken = false) =>
  request("POST", endpoint, body, withToken);

export const putRequest = (endpoint: string, body: any, withToken = false) =>
  request("PUT", endpoint, body, withToken);

export const deleteRequest = (endpoint: string, withToken = false) =>
  request("DELETE", endpoint, null, withToken);

//  profile upload api
export async function uploadProfileImage(file: File, user: User) {
  const formData = new FormData();
  formData.append("device", "android");
  formData.append("app_version", "1.0.5");
  formData.append("sess_id", user.sess_id);
  formData.append("user_id", user.user_id);
  formData.append("file", file);

  const res = await axios.post(
    `${BASE_URL}/account/upload-profile-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data; // should include the uploaded image URL
}
