import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { login as loginApi } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode"; // Fix the import for jwtDecode
import "../LoginPage.css"; // Import the CSS file for styling
import ConfirmationCheck from "../components/ConfirmationCheck"; // Correctly import the ConfirmationCheck component

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false); // State to manage confirmation
  const { setUser } = useUser();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser);
      setIsConfirmed(true); // Show confirmation
      setTimeout(() => navigate("/admin/home"), 3000); // Navigate after confirmation animation
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(userInfo);
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
              src="" // Add the path to your logo here
              alt="Company Logo"
              className="company-logo animated-element"
            />
            <h1 className="animated-element">Welcome Back!</h1>
            <p className="animated-element">Please enter login details below</p>
          </div>
          <h2 className="animated-element">Login as an Admin User</h2>
          <form onSubmit={handleFormSubmit} className="animated-element">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">
                {loginMutation.isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {loginMutation.isError && (
              <div className="error-message animated-element">
                {loginMutation.error.response?.data?.message || "Login failed"}
              </div>
            )}
          </form>
          <div className="terms-container animated-element">
            <span>Terms of Use Privacy Policy</span>
          </div>
        </div>
        <div className="login-right">
          <div className="login-image"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
