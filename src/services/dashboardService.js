import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/dashboard";

export const getStats = (
  token
) => {
  return axios.get(
    `${API}/stats`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
};