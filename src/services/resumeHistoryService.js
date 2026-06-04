import axios from "axios";

const API =
  "http://localhost:5000/api/resume-builder";

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