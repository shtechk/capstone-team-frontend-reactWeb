import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../apis/auth";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

const BusinessLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(jwtDecode(data.token));
      navigate("/business/dashboard");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
          <img
            src="path/to/your/image.png"
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
              src="path/to/your/logo.png"
              alt="Company Logo"
              className="h-12"
            />
          </div>
          <h2 className="text-3xl text-gray-800 font-semibold mb-6 text-center">
            Log In to Booking™
          </h2>

          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
              >
                {mutation.isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
            {mutation.isError && (
              <div className="text-red-500 mt-4 text-center">
                {mutation.error.response?.data?.message || "Login failed"}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoginPage;
