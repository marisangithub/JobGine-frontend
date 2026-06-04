import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {

  const [sidebarOpen,
    setSidebarOpen] =
    useState(false);

  return (

    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        overflow: "hidden"
      }}
    >

      {/* Mobile Menu Button */}

      {!sidebarOpen && (
<button
  className="btn d-md-none position-fixed"
  style={{
    top: "10px",
    left: "10px",
    zIndex: 2000,
    backgroundColor: "#1e293b",
    color: "white",
    border: "1px solid #334155",
    width: "45px",
    height: "45px",
    borderRadius: "10px"
  }}
      onClick={() =>
      setSidebarOpen(true)
    }
>
  ☰
</button>
)}

      {/* Sidebar */}

      <div
        className={`sidebar-wrapper ${
          sidebarOpen
            ? "show-sidebar"
            : ""
        }`}
      >
        <Sidebar
  setSidebarOpen={setSidebarOpen}
/>
      </div>

      {/* Content */}

<div
  className="flex-grow-1"
  style={{
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: "#0f172a",
    color: "#f8fafc"
  }}
>

        <Navbar />

        <div
  className="p-4"
  style={{
    backgroundColor: "#0f172a",
    minHeight: "100%"
  }}
>
  {children}
</div>

      </div>

    </div>

  );
};

export default DashboardLayout;