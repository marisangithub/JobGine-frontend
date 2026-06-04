import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/resume-builder";

export const getHistory =
  (token) => {

    return axios.get(
      `${API}/history`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};

export const deleteResume =
  (id, token) => {

    return axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};