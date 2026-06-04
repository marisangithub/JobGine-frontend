import { useLocation } from "react-router-dom";

const Navbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/resume-builder": "Resume Builder",
    "/jobs": "AI Job Matcher",
    "/analysis": "Resume Analysis",
    "/upload-resume": "Upload Resume",
    "/resume-library": "Resume Library",
    "/resume-history": "Resume History"
  };

  const pageTitle =
    pageTitles[location.pathname] ||
    "ResumeIQ";

  return (

    <div
      className="shadow-sm"
      style={{
        backgroundColor: "#1e293b",
        borderBottom: "1px solid #334155",
        padding: "15px 20px"
      }}
    >

      <div
        className="d-flex justify-content-between align-items-center"
      >

        <div
          className="d-flex flex-column"
          style={{
            marginLeft:
              window.innerWidth < 768
                ? "65px"
                : "0"
          }}
        >

          <h3
            className="mb-0"
            style={{
              color: "#f8fafc",
              fontWeight: "700"
            }}
          >
            {pageTitle}
          </h3>

          <small
            style={{
              color: "#94a3b8",
              fontSize: "14px"
            }}
          >
            AI Resume Builder & Job Matcher
          </small>

        </div>

        <div
          style={{
            color: "#f8fafc",
            fontSize: "16px"
          }}
        >

          <span
            style={{
              color: "#94a3b8"
            }}
          >
            Welcome,
          </span>

          <strong>
            {" "}
            {user?.name}
          </strong>

        </div>

      </div>

    </div>

  );
};

export default Navbar;