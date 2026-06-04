import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  getResumes,
  deleteResume
} from "../services/resumeService";

const ResumeLibrary = () => {

  const [resumes,
    setResumes] =
    useState([]);

  useEffect(() => {

    fetchResumes();

  }, []);

  const fetchResumes =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await getResumes(
            token
          );

        setResumes(
          res.data
        );

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
          "Delete this resume?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await deleteResume(
          id,
          token
        );

        fetchResumes();

      } catch (error) {

        console.error(error);

        alert(
          "Delete failed"
        );

      }
    };

  return (

    <DashboardLayout>

      {/* Header */}

      <div
        className="card shadow border-0 mb-4"
        style={{
          backgroundColor: "#1e293b",
          color: "#f8fafc"
        }}
      >

        <div className="card-body">

          <h2 className="fw-bold">
            📚 Resume Library
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#94a3b8"
            }}
          >
            Manage all uploaded resumes.
          </p>

        </div>

      </div>

      {/* Desktop Table */}

      <div
        className="card shadow border-0 d-none d-md-block"
        style={{
          backgroundColor: "#1e293b",
          color: "#f8fafc"
        }}
      >

        <div className="card-body">

          <div className="table-responsive">

            <table
              className="table table-borderless align-middle"
              style={{
                color: "#f8fafc"
              }}
            >

              <thead>

                <tr
                  style={{
                    borderBottom:
                      "1px solid #334155"
                  }}
                >

                  <th
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    ID
                  </th>

                  <th
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    File Name
                  </th>

                  <th
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    Uploaded
                  </th>

                  <th
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {resumes.map(
                  (resume) => (

                    <tr
                      key={resume.id}
                      style={{
                        borderBottom:
                          "1px solid #334155"
                      }}
                    >

                      <td>
                        {resume.id}
                      </td>

                      <td>
                        📄 {resume.file_name}
                      </td>

                      <td>
                        {
                          new Date(
                            resume.created_at
                          ).toLocaleDateString()
                        }
                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              resume.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* Mobile Cards */}

      <div className="d-md-none">

        {
          resumes.map(
            (resume) => (

              <div
                key={resume.id}
                className="card shadow border-0 mb-3"
                style={{
                  backgroundColor:
                    "#1e293b",
                  color:
                    "#f8fafc"
                }}
              >

                <div className="card-body">

                  <h5 className="fw-bold">

                    📄 {resume.file_name}

                  </h5>

                  <p
                    className="mb-2"
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    Resume ID:
                    {" "}
                    {resume.id}
                  </p>

                  <p
                    className="mb-3"
                    style={{
                      color: "#94a3b8"
                    }}
                  >
                    Uploaded:
                    {" "}
                    {
                      new Date(
                        resume.created_at
                      ).toLocaleDateString()
                    }
                  </p>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      handleDelete(
                        resume.id
                      )
                    }
                  >
                    Delete Resume
                  </button>

                </div>

              </div>

            )
          )
        }

      </div>

    </DashboardLayout>

  );
};

export default ResumeLibrary;