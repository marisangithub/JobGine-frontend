import axios from "axios";

const API =
  "http://localhost:5000/api/resume-builder";

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