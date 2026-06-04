import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/jobs";

export const findJobs =
  (resumeId, token) => {

    return axios.post(
      `${API}/find`,
      {
        resumeId
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};