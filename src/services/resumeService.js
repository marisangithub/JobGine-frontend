import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com/api/resumes";

export const uploadResume = (
  formData,
  token
) => {
  return axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

export const getResumes = (
  token
) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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