import api from "../api/axiosInstance";

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const fetchProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};