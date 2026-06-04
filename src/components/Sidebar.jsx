import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({
  setSidebarOpen
}) => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div
      className="bg-dark text-white p-3 sidebar"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >

     <div className="d-flex justify-content-between align-items-center mb-4">

  <h3 className="fw-bold mb-0">
    JobGenie
  </h3>

  <button
    className="btn btn-sm btn-outline-light d-md-none"
    onClick={() =>
      setSidebarOpen(false)
    }
  >
    ✕
  </button>

</div>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/dashboard"
          >
            🏠 Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/resume-builder"
          >
            📄 Resumes
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/jobs"
          >
            💼 Jobs
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/analysis"
          >
            📊 Analysis
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/upload-resume"
          >
            ⬆️ Upload Resume
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/resume-library"
          >
            📚 Resume Library
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            to="/resume-history"
          >
            🕒 Resume History
          </Link>
        </li>

        <li className="nav-item mt-4">
          <button
            className="btn btn-danger w-100"
            onClick={logout}
          >
            Logout
          </button>
        </li>

      </ul>

    </div>

  );
};

export default Sidebar;