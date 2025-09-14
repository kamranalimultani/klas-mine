// utils/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // keep base url in .env

// Get token/session_id from localStorage (safe check for server-side)
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const sessionId = localStorage.getItem("session_id");
    const userId = localStorage.getItem("user_id");

    return {
      "Content-Type": "application/json",
      Authorization: sessionId ? `Bearer ${sessionId}` : "",
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
  console.log("Base URL:", BASE_URL); // ✅ safe to log here

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

export const postRequest = (
  endpoint: string,
  body: any,
  withToken = false
) => request("POST", endpoint, body, withToken);

export const putRequest = (
  endpoint: string,
  body: any,
  withToken = false
) => request("PUT", endpoint, body, withToken);

export const deleteRequest = (endpoint: string, withToken = false) =>
  request("DELETE", endpoint, null, withToken);
