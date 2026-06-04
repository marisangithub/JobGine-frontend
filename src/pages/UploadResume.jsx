import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { uploadResume } from "../services/resumeService";

const UploadResume = () => {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) {
      alert("Choose a PDF");
      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "resume",
        file
      );

      await uploadResume(
        formData,
        token
      );

      alert(
        "Resume Uploaded Successfully"
      );

      setFile(null);

    } catch (error) {

      console.error(error);

      alert(
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout>

      <div
        className="card shadow border-0"
        style={{
          backgroundColor: "#1e293b",
          color: "#f8fafc"
        }}
      >

        <div
          className="card-body p-4"
          style={{
            backgroundColor: "#1e293b",
            color: "#f8fafc"
          }}
        >

          <h2
            className="fw-bold mb-3"
          >
            📄 Upload Resume
          </h2>

          <p
            style={{
              color: "#94a3b8"
            }}
          >
            Upload your PDF resume and let ResumeIQ analyze it.
          </p>

          <form
            onSubmit={handleSubmit}
          >

            <input
              type="file"
              accept=".pdf"
              className="form-control my-3"
              style={{
                backgroundColor: "#334155",
                color: "#ffffff",
                border: "1px solid #475569"
              }}
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

            {
              file && (
                <div
                  className="mb-3"
                  style={{
                    backgroundColor: "#334155",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #475569"
                  }}
                >
                  📎 {file.name}
                </div>
              )
            }

            <button
              type="submit"
              disabled={loading}
              className="btn w-100"
              style={{
                background:
                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color: "#ffffff",
                border: "none",
                padding: "12px",
                fontWeight: "600"
              }}
            >

              {
                loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                    ></span>

                    Uploading Resume...
                  </>
                ) : (
                  "🚀 Upload Resume"
                )
              }

            </button>

          </form>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default UploadResume;