import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import LOGO from "/favicon.png";

const Register = () => {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

const res =
  await registerUser(
    formData
  );

navigate(
  "/verify-otp",
  {
    state: {
      email:
        formData.email
    }
  }
);

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "20px"
      }}
    >

      <div
        className="card shadow-lg border-0"
        style={{
          backgroundColor: "#1e293b",
          color: "#f8fafc",
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px"
        }}
      >

        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">

              <div
                         className="d-flex justify-content-center"
                       >
                                  <h1
                         className="fw-bold"
                         style={{
                           color: "#ffffff"
                         }}
                       >
                         JobGine
                       </h1>
           <img src={LOGO} height="50" width="50" />
           </div>

            <p
              style={{
                color: "#94a3b8"
              }}
            >
              AI Powered Resume Assistant
            </p>

          </div>

          <h3
            className="text-center mb-4"
          >
            Create Account 🚀
          </h3>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="mb-3">

              <label
                className="mb-2"
              >
                Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                style={{
                  backgroundColor:
                    "#334155",
                  color:
                    "#ffffff",
                  border:
                    "1px solid #475569"
                }}
              />

            </div>

            <div className="mb-3">

              <label
                className="mb-2"
              >
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                style={{
                  backgroundColor:
                    "#334155",
                  color:
                    "#ffffff",
                  border:
                    "1px solid #475569"
                }}
              />

            </div>

            <div className="mb-4">

              <label
                className="mb-2"
              >
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                name="password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                style={{
                  backgroundColor:
                    "#334155",
                  color:
                    "#ffffff",
                  border:
                    "1px solid #475569"
                }}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100"
              style={{
                background:
                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color:
                  "#ffffff",
                border:
                  "none",
                padding:
                  "12px",
                fontWeight:
                  "600"
              }}
            >

              {
                loading
                  ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                      ></span>

                      Creating Account...
                    </>
                  )
                  : (
                    "✨ Register"
                  )
              }

            </button>

          </form>

          <p
            className="text-center mt-4 mb-0"
            style={{
              color: "#94a3b8"
            }}
          >

            Already have an account?

            <Link
              to="/"
              style={{
                color:
                  "#60a5fa",
                textDecoration:
                  "none",
                fontWeight:
                  "600"
              }}
            >
              {" "}
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Register;