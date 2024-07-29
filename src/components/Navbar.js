import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/business/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/business/dashboard" className="text-white">
          Dashboard
        </NavLink>
        {user ? (
          <div className="flex items-center">
            <NavLink to="/profile" className="text-white mr-4">
              Profile
            </NavLink>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <NavLink to="/business/login" className="text-white mr-4">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
