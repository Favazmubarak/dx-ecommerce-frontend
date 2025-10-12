import api from "./axios";

export const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res.data; 
  } catch (err) {
    console.error("Logout failed:", err);
    throw err;
  }
};