import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {

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
          await loginUser(
            formData
          );

        login(
          res.data.user,
          res.data.token
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Login failed"
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

            <h1
              className="fw-bold"
              style={{
                color: "#ffffff"
              }}
            >
              ResumeIQ
            </h1>

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
            style={{
              color: "#f8fafc"
            }}
          >
            Welcome Back 👋
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
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
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
                name="password"
                placeholder="Enter your password"
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

                      Logging In...
                    </>
                  )
                  : (
                    "🚀 Login"
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

            Don't have an account?

            <Link
              to="/register"
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
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
};

export default Login;