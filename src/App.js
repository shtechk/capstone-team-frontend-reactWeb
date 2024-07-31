import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BusinessLoginPage from "./pages/BusinessLoginPage";
import BusinessDashboard from "./pages/BusinessDashboard";
import Profile from "./pages/Profile";
import Confirmation from "./components/ConfirmationCheck";
import Navbar from "./components/Navbar";
import { getToken } from "./apis/storage";
import { getUserProfile } from "./apis/auth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css"; // Import the CSS file
import "react-toastify/dist/ReactToastify.css";
import "./toast.css"; // Import the custom CSS file

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, setUser } = useUser();
  const location = useLocation();

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
  }, [setUser]);

  return (
    <>
      {user && <Navbar />}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Routes location={location}>
            <Route path="/" element={<Login />} />
            <Route path="/admin/home" element={<Home />} />
            <Route path="/business/login" element={<BusinessLoginPage />} />
            <Route path="/business/dashboard" element={<BusinessDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirmation" element={<Confirmation />} />{" "}
            {/* Add the confirmation route */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
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
