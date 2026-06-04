import { useEffect, useState } from "react";

import DashboardLayout
  from "../layouts/DashboardLayout";

import {
  getHistory,
  deleteResume
} from "../services/resumeHistoryService";

const ResumeHistory = () => {

  const [resumes,
    setResumes] =
    useState([]);

  const [selectedResume,
    setSelectedResume] =
    useState(null);

  const fetchHistory =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await getHistory(
            token
          );

        setResumes(
          res.data
        );

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    fetchHistory();

  }, []);

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

        if (
          selectedResume?.id === id
        ) {
          setSelectedResume(
            null
          );
        }

        fetchHistory();

      } catch (error) {

        console.error(error);

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
            📜 Resume History
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#94a3b8"
            }}
          >
            View and manage your generated resumes.
          </p>

        </div>

      </div>

      <div className="row">

        {/* Resume List */}

        <div className="col-lg-4 mb-4">

          <div
            className="card shadow border-0 h-100"
            style={{
              backgroundColor:
                "#1e293b",
              color:
                "#f8fafc"
            }}
          >

            <div className="card-body">

              <h4 className="mb-4">
                📂 Saved Resumes
              </h4>

              {
                resumes.length === 0
                  ? (

                    <div
                      className="text-center py-5"
                      style={{
                        color:
                          "#94a3b8"
                      }}
                    >
                      No resumes found
                    </div>

                  )
                  : (

                    resumes.map(
                      (resume) => (

                        <div
                          key={resume.id}
                          className="mb-3 p-3 rounded"
                          style={{
                            backgroundColor:
                              selectedResume?.id ===
                              resume.id
                                ? "#334155"
                                : "#0f172a",
                            border:
                              "1px solid #475569"
                          }}
                        >

                          <h6
                            className="fw-bold"
                          >
                            {resume.role}
                          </h6>

                          <small
                            style={{
                              color:
                                "#94a3b8"
                            }}
                          >
                            {
                              new Date(
                                resume.created_at
                              ).toLocaleString()
                            }
                          </small>

                          <div className="mt-3 d-flex gap-2">

                            <button
                              className="btn btn-sm flex-fill"
                              style={{
                                background:
                                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                                color:
                                  "white",
                                border:
                                  "none"
                              }}
                              onClick={() =>
                                setSelectedResume(
                                  resume
                                )
                              }
                            >
                              View
                            </button>

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

                          </div>

                        </div>

                      )
                    )

                  )
              }

            </div>

          </div>

        </div>

        {/* Resume Preview */}

        <div className="col-lg-8">

          <div
            className="card shadow border-0"
            style={{
              backgroundColor:
                "#1e293b",
              color:
                "#f8fafc"
            }}
          >

            <div className="card-body">

              <h4 className="mb-4">
                📄 Resume Preview
              </h4>

              {
                selectedResume
                  ? (

                    <div
                      style={{
                        whiteSpace:
                          "pre-wrap",
                        lineHeight:
                          "1.9",
                        backgroundColor:
                          "#0f172a",
                        border:
                          "1px solid #475569",
                        borderRadius:
                          "12px",
                        padding:
                          "20px",
                        maxHeight:
                          "700px",
                        overflowY:
                          "auto"
                      }}
                    >
                      {
                        selectedResume
                          .resume_content
                      }
                    </div>

                  )
                  : (

                    <div
                      className="text-center py-5"
                      style={{
                        color:
                          "#94a3b8"
                      }}
                    >
                      Select a resume to preview it.
                    </div>

                  )
              }

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default ResumeHistory;