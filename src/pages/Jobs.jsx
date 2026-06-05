import {
    useEffect,
    useState
} from "react";

import DashboardLayout
    from "../layouts/DashboardLayout";

import {
    getResumes
} from "../services/resumeService";

import {
    findJobs
} from "../services/jobService";

const Jobs = () => {

    const [resumes,
        setResumes] =
        useState([]);

    const [resumeId,
        setResumeId] =
        useState("");

    const [jobs,
        setJobs] =
        useState([]);

    const [loading,
        setLoading] =
        useState(false);

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

    const handleFindJobs =
        async () => {

            if (!resumeId) {

                alert(
                    "Select a resume"
                );

                return;
            }

            try {

                setLoading(true);

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const res =
                    await findJobs(
                        resumeId,
                        token
                    );

                setJobs(
                    res.data
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Failed to find jobs"
                );

            } finally {

                setLoading(false);

            }
        };
    const getLocation = (job) => {

        if (job.job_is_remote) {
            return "Remote";
        }

        if (
            job.job_city &&
            job.job_state
        ) {
            return `${job.job_city}, ${job.job_state}, India`;
        }

        if (
            job.job_location &&
            job.job_location !== "India"
        ) {
            return job.job_location;
        }

        if (
            job.job_title &&
            job.job_title.includes("-")
        ) {

            const location =
                job.job_title
                    .split("-")
                    .pop()
                    .trim();

            if (
                location.length > 2 &&
                location !== job.job_title
            ) {
                return location;
            }
        }

        return "India";
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
                    className="card-body"
                    style={{
                        backgroundColor: "#1e293b",
                        color: "#f8fafc"
                    }}
                >

                    <h3>
                        Find Jobs
                    </h3>

                    <select
                        className="form-select mb-3"
                        style={{
                            backgroundColor: "#334155",
                            color: "white",
                            border: "1px solid #475569"
                        }}
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

                        {
                            resumes.map(
                                (resume) => (

                                    <option
                                        key={resume.id}
                                        value={resume.id}
                                    >
                                        {
                                            resume.file_name
                                        }
                                    </option>

                                ))
                        }

                    </select>

                    <button
                        className="btn w-100"
                        style={{
                            background:
                                "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                            color: "white",
                            border: "none"
                        }}
                        onClick={
                            handleFindJobs
                        }
                        disabled={loading}
                    >

                        {
                            loading
                                ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                        ></span>

                                        AI Finding Jobs...
                                    </>
                                )
                                : (
                                    "Find Jobs"
                                )
                        }

                    </button>
                    {
                        !loading &&
                        jobs.length === 0 && (
                            <p className="text-white mt-3">
                                Select a resume and click Find Jobs.
                            </p>
                        )
                    }

                </div>

            </div>

            {
                jobs.length > 0 && (

                    <div
                        className="mt-4"
                        style={{
                            color: "#f8fafc"
                        }}
                    >

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">

                            <h3 className="mb-0 text-white">
                                🎯 Recommended Jobs
                            </h3>

                            <span className="badge bg-success fs-6">
                                {jobs.length} Jobs Found
                            </span>

                        </div>

                        {
                            jobs.map(
                                (job, index) => (

                                    <div
                                        key={index}
                                        className="card shadow border-0 mb-3"
                                        style={{
                                            backgroundColor: "#1e293b",
                                            color: "#f8fafc",
                                            borderRadius: "16px",
                                            overflow: "hidden"
                                        }}
                                    >

                                        <div
                                            className="card-body"
                                            style={{
                                                backgroundColor: "#1e293b",
                                                color: "#f8fafc"
                                            }}
                                        >

                                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">

                                                <div>

                                                    <h5 className="fw-bold mb-2">
                                                        {job.job_title}
                                                    </h5>

                                                    <p className="mb-1">
                                                        🏢 <strong>
                                                            {job.employer_name}
                                                        </strong>
                                                    </p>

                                                    <p className="mb-1">
                                                        📍 {getLocation(job)}
                                                    </p>

                                                    <p className="mb-2 ">
                                                        🕒 {job.job_posted_at}
                                                    </p>

                                                </div>

                                                <span
                                                    className="badge align-self-start"
                                                    style={{
                                                        backgroundColor: "#3b82f6"
                                                    }}
                                                >
                                                    {job.job_publisher}
                                                </span>

                                            </div>

                                            <hr />

                                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">

                                                <small className="text">
                                                    Recommended based on your resume
                                                </small>

                                                <a
                                                    href={job.job_apply_link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn w-100 w-md-auto"
                                                    style={{
                                                        backgroundColor: "#22c55e",
                                                        color: "white"
                                                    }}
                                                >
                                                    Apply Now →
                                                </a>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )
                        }

                    </div>

                )
            }
        </DashboardLayout>

    );
};

export default Jobs;
