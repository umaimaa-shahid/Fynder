<<<<<<< HEAD
const BASE = 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('token');

export const api = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};
=======
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
>>>>>>> e21f556965e5e4bddfdd97f91f5f6afdbfd3884a
