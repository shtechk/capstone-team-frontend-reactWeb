import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../apis/auth";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode"; // Fix the import for jwtDecode
import "../LoginPage.css"; // Import the CSS file for styling
import ConfirmationCheck from "../components/ConfirmationCheck"; // Correctly import the ConfirmationCheck component

const BusinessLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(jwtDecode(data.token));
      setIsConfirmed(true); // Show confirmation
      setTimeout(() => navigate("/business/dashboard"), 3000); // Navigate after confirmation animation
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  if (isConfirmed) {
    return <ConfirmationCheck />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-left-content">
            <img
              src="path/to/your/logo.png"
              alt="Company Logo"
              className="company-logo animated-element"
            />
            <h1 className="animated-element">Welcome Back!</h1>
            <p className="animated-element">Please enter login details below</p>
          </div>
          <h2 className="animated-element">Log In to Booking™</h2>
          <form onSubmit={handleSubmit} className="animated-element">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="form-group">
              <button type="submit">
                {mutation.isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
            {mutation.isError && (
              <div className="error-message animated-element">
                {mutation.error.response?.data?.message || "Login failed"}
              </div>
            )}
          </form>
          <div className="terms-container animated-element">
            <span>Terms of Use Privacy Policy</span>
          </div>
        </div>
        <div className="login-right">
          <div className="login-image">
            <img
              src="path/to/your/image.png"
              alt="Login Illustration"
              className="w-3/4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoginPage;
