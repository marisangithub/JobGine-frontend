import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getUsers,
  updateRole,
  deleteUser
}
from "../services/adminService";

const AdminDashboard =
() => {

  const [users,
    setUsers] =
    useState([]);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

   const res =
  await getUsers(
    token
  );

console.log(
  "USERS RESPONSE:",
  res.data
);

setUsers(
  res.data
);

      } catch (error) {

        console.error(
          error
        );

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  const handleRole =
    async (
      id,
      role
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await updateRole(
          id,
          role,
          token
        );

        fetchUsers();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete user?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await deleteUser(
          id,
          token
        );

        fetchUsers();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  return (

    <DashboardLayout>

      <div
        className="card border-0 shadow"
        style={{
          backgroundColor:
            "#1e293b",
          color:
            "#f8fafc"
        }}
      >

        <div
          className="card-body"
        >

          <h2>
            👑 Admin Dashboard
          </h2>

          <p>
            Manage Users
          </p>

          <div
            className="table-responsive"
          >

            <table
              className="table table-dark table-hover"
            >

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

              {
  Array.isArray(users) &&
  users.map(
                    (user) => (

                      <tr
                        key={user.id}
                      >

                        <td>
                          {user.id}
                        </td>

                        <td>
                          {user.name}
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>

                          <span
                            className={
                              user.role ===
                              "admin"
                                ? "badge bg-danger"
                                : "badge bg-primary"
                            }
                          >
                            {user.role}
                          </span>

                        </td>

                        <td>

                          {
                            user.is_verified
                              ? "✅"
                              : "❌"
                          }

                        </td>

                        <td>

                          {
                            user.role ===
                            "user" ? (

                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  handleRole(
                                    user.id,
                                    "admin"
                                  )
                                }
                              >
                                Make Admin
                              </button>

                            ) : (

                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() =>
                                  handleRole(
                                    user.id,
                                    "user"
                                  )
                                }
                              >
                                Remove Admin
                              </button>

                            )
                          }

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                user.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default AdminDashboard;