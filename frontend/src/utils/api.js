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