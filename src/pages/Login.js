import { useMutation } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { login as loginApi } from "../apis/auth"; // Adjust the path according to your project structure
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext, useUser } from "../context/UserContext"; // Adjust the path according to your project structure
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
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
    <div className="min-h-screen flex items-center justify-center absolute inset-0 z-[-1]">
      <div className="max-w-md w-full px-6 py-8">
        <h2 className="text-3xl text-black font-semibold mb-6">
          Log in to your account
        </h2>
        <h2 className="my-4">
          If you don't have an account,
          <NavLink className="text-sky-400" to="/register">
            {" "}
            register here
          </NavLink>
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-black text-sm font-medium mb-2"
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
              className="block text-black text-sm font-medium mb-2"
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
              className="px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          {loginMutation.isError && (
            <div className="text-red-500">
              {loginMutation.error.response?.data?.message || "Login failed"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
