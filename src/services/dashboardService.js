import axios from "axios";

const API =
  "http://localhost:5000/api/dashboard";

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