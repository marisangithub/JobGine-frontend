import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/resume-builder";

export const generateResume = (
  data,
  token
) => {
  return axios.post(
    `${API}/generate`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};