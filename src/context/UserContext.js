import React, { useState, createContext, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../apis/storage"; // Adjust the path according to your project structure

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext); // Add this hook

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
