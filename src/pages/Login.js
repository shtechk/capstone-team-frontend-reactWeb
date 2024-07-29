import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { login as loginApi } from "../apis/auth"; // Adjust the path according to your project structure
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext, useUser } from "../context/UserContext"; // Adjust the path according to your project structure
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useUser(); // Access setUser from UserContext
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const decodedUser = jwtDecode(data.token);
      setUser(decodedUser); // Update user context with the new user data
      navigate("/admin/home"); // Navigate to home page
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
          <img
            src="https://img.freepik.com/premium-photo/website-icon-authentication-lock-style-generative-ai_848094-9812.jpg?w=1380"
            alt="Login Illustration"
            className="w-3/4"
          />
        </div>
        <div className="hidden md:flex items-center">
          <div className="w-px h-full bg-gray-300 mx-4"></div>
        </div>
        <div className="w-full md:w-1/2 px-6 py-8">
          <div className="flex justify-center mb-6">
            <img
              src="data:image/jpeg;base64,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"
              alt="Company Logo"
              className="h-12"
            />
          </div>
          <h2 className="text-3xl text-gray-800 font-semibold mb-6 text-center">
            Login as a Admin User
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                {loginMutation.isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            {loginMutation.isError && (
              <div className="text-red-500 mt-4 text-center">
                {loginMutation.error.response?.data?.message || "Login failed"}
              </div>
            )}
          </form>
          <div className="flex justify-center mt-6">
            <span className="text-gray-500 text-sm">
              Terms of Use Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
