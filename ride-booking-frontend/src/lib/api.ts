import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:7011/api",
  withCredentials: false,
});

// ✅ Attach token automatically (if it exists)
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Generic API exports (for driver/rider/etc.)
export default API;

// ===================== 🧩 ADMIN API HELPERS =====================

// Get all users
export const fetchAdminUsers = async (token?: string) => {
  const res = await API.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all rides
export const fetchAdminRides = async (token?: string) => {
  const res = await API.get("/admin/rides", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get dashboard stats
export const fetchAdminStats = async (token?: string) => {
  const res = await API.get("/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
