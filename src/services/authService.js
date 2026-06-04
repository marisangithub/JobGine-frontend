import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};


export const verifyOTP =
  async (data) => {

    return axios.post(
      `${API}/verify-otp`,
      data
    );

  };

export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};

export const getCurrentUser = (token) => {
  return axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};