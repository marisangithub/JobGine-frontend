import axios from "axios";

const API =
  "http://localhost:5000/api/jobs";

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