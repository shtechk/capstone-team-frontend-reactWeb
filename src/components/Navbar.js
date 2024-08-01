import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Navbar.css"; // Import custom CSS for additional styles

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/place/login");
  };

  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/place/dashboard" className="icon-link home-icon">
          <motion.div
            whileHover={{ y: -10, scale: 1.2 }} // Hover effect applied
            className="icon-container"
          >
            <FaHome className="text-home-color icon" />
          </motion.div>
        </NavLink>
        {user ? (
          <div className="flex items-center">
            <NavLink to="/profile" className="icon-link profile-icon">
              <motion.div
                whileHover={{ y: -10, scale: 1.2 }} // Hover effect applied
                className="icon-container"
              >
                <FaUser className="text-profile-color icon" />
              </motion.div>
            </NavLink>
            <button onClick={handleLogout} className="icon-link logout-icon">
              <motion.div
                whileHover={{ y: -10, scale: 1.2 }} // Hover effect applied
                className="icon-container"
              >
                <FaSignOutAlt className="text-logout-color icon" />
              </motion.div>
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <NavLink to="/place/login" className="icon-link login-icon">
              <motion.div
                whileHover={{ y: -10, scale: 1.2 }} // Hover effect applied
                className="icon-container"
              >
                <FaUser className="text-login-color icon" />
              </motion.div>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
