import axios from 'axios';

const API_URL = 'http://localhost:2000/api';

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const resetPasswordRequest = async (email) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
  return response.data;
};
