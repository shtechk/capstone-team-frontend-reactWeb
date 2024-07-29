import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, UserContext, useUser } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BusinessLoginPage from "./pages/BusinessLoginPage";
import BusinessDashboard from "./pages/BusinessDashboard";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { getToken } from "./apis/storage";
import { getUserProfile } from "./apis/auth";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (token) {
        try {
          const userProfile = await getUserProfile();
          setUser(userProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      hi - {`${JSON.stringify(user)}`}
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/business/login" element={<BusinessLoginPage />} />
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
