// src/api/dashboard.js
import api from "./api";

export const fetchDashboardStats = async () => {
  try {
    const res = await api.get("/api/dashboard/stats");
    return res.data;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    throw new Error("Could not retrieve dashboard stats.");
  }
};
