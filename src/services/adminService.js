import axios from "axios";

const API =
  "https://jobgine-backend.onrender.com";

export const getUsers =
  async (token) => {

    return axios.get(
      `${API}/api/auth/users`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  };

export const updateRole =
  async (
    id,
    role,
    token
  ) => {

    return axios.put(
      `${API}/api/auth/users/${id}/role`,
      { role },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  };

export const deleteUser =
  async (
    id,
    token
  ) => {

    return axios.delete(
      `${API}/api/auth/users/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  };