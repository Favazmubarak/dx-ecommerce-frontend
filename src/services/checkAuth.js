import api from "./axios";

export const checkAuth = async () => {
  try {
    const res = await api.get("/checkauth");
    return res.data;
  } catch (err) {
    console.error("Auth check failed:", err);
    return { isAuthenticated: false };
  }
};