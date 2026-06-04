import { useEffect, useState } from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import { getResumes }
from "../services/resumeService";

import {
  runAnalysis,
  getAnalyses
}
from "../services/analysisService";




const Analysis = () => {

  const [loading, setLoading] =
  useState(false);

    const [jobTitle, setJobTitle] =
  useState("");

  const [resumes,
    setResumes] =
    useState([]);

  const [resumeId,
    setResumeId] =
    useState("");

  const [jobDescription,
    setJobDescription] =
    useState("");

  const [result,
    setResult] =
    useState(null);

  const [history,
    setHistory] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const resumesRes =
        await getResumes(
          token
        );

      setResumes(
        resumesRes.data
      );

      const historyRes =
        await getAnalyses(
          token
        );

      setHistory(
        historyRes.data
      );
    };

  const handleAnalysis =
  async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await runAnalysis(
          {
            resumeId,
            jobDescription
          },
          token
        );

      setResult(
        res.data
      );

      fetchData();

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Analysis failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <DashboardLayout>

      <div
  className="card shadow border-0 mb-4"
  style={{
    backgroundColor: "#1e293b",
    color: "#f8fafc"
  }}
>

        <div
  className="card-body"
  style={{
    backgroundColor: "#1e293b",
    color: "#f8fafc"
  }}
>

          <h3>
            ATS Analysis
          </h3>

          <select
            className="form-select mb-3"
            value={resumeId}
            onChange={(e) =>
              setResumeId(
                e.target.value
              )
            }
          >

            <option value="">
              Select Resume
            </option>

            {resumes.map(
              (resume) => (

              <option
                key={resume.id}
                value={resume.id}
              >
                {resume.file_name}
              </option>

            ))}

          </select>
<input
  type="text"
  className="form-control mb-3"
  placeholder="Job Title (e.g. Full Stack Developer)"
  value={jobTitle}
  onChange={(e) =>
    setJobTitle(e.target.value)
  }
/>

          <textarea
            rows="8"
            className="form-control mb-3"
            placeholder="Paste Job Description..."
            value={
              jobDescription
            }
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
          />

<button
  className="btn w-100"
style={{
  background:
    "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  color: "#ffffff",
  border: "none"
}}
  onClick={handleAnalysis}
  disabled={loading}
>
  {
    loading ? (
      <>
        <span
          className="spinner-border spinner-border-sm me-2"
        ></span>

        Analyzing Resume...
      </>
    ) : (
      "Analyze Resume"
    )
  }
</button>

        </div>

      </div>

      {result && (

        <div
  className="card shadow border-0 mb-4"
  style={{
    backgroundColor: "#1e293b",
    color: "#f8fafc"
  }}
>

          <div className="card-body">

<h2
  className="fw-bold"
  style={{
    color: "#22c55e"
  }}
>
  🎯 ATS Score: {result.ats_score}%
</h2>

            <hr />

            <h5>
              Matched Skills
            </h5>

            {result.matched_skills?.map(
              skill => (

              <span
                key={skill}
                className="badge bg-success me-2"
              >
                {skill}
              </span>

            ))}

            <hr />

            <h5>
              Missing Skills
            </h5>

            {result.missing_skills?.map(
              skill => (

              <span
                key={skill}
                className="badge bg-danger me-2"
              >
                {skill}
              </span>

            ))}

            <hr />

            <h5>
              AI Suggestions
            </h5>

<div
  style={{
    whiteSpace: "pre-wrap",
    lineHeight: "1.8",
    backgroundColor: "#334155",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #475569"
  }}
>
  {result.suggestions}
</div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
};

export default Analysis;