import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/analysis";

export const runAnalysis = (
  data,
  token
) => {
  return axios.post(
    `${API}/run`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAnalyses = (
  token
) => {
  return axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};