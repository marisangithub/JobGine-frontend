import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/authService";

const VerifyOTP = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email || "";

  const [otp,
    setOtp] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleVerify =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await verifyOTP({
          email,
          otp
        });

        alert(
          "Email verified successfully"
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Verification failed"
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
        backgroundColor: "#0f172a"
      }}
    >

      <div
        className="card shadow border-0"
        style={{
          backgroundColor: "#1e293b",
          width: "100%",
          maxWidth: "450px",
          color: "#f8fafc"
        }}
      >

        <div className="card-body p-4">

          <h2 className="text-center mb-4">
            Verify Email
          </h2>

          <p
            className="text-center"
            style={{
              color: "#94a3b8"
            }}
          >
            OTP sent to
            <br />
            {email}
          </p>

          <form
            onSubmit={
              handleVerify
            }
          >

            <input
              type="text"
              maxLength="6"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                )
              }
              style={{
                backgroundColor:
                  "#334155",
                color:
                  "white",
                border:
                  "1px solid #475569"
              }}
            />

            <button
              className="btn w-100"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color:
                  "white",
                border:
                  "none"
              }}
            >

              {
                loading
                  ? "Verifying..."
                  : "Verify OTP"
              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default VerifyOTP;