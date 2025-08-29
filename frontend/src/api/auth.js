// src/api/auth.js
import api from "./api";

export const signupApi = (payload) =>
  api.post("/auth/signup", payload);       // ✅

export const loginApi = (payload) =>
  api.post("/auth/login", payload);        // ✅

export const exchangeGoogleCode = (code) =>
  api.get("/auth/google", { params: { code } }); // ✅ GET + query param
