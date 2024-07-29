import React, { createContext, useState, useContext } from "react";
import { getToken, removeToken, storeToken } from "../apis/storage";
import { getUserProfile, login as loginUserApi } from "../apis/auth";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userInfo) => {
    const data = await loginUserApi(userInfo);
    storeToken(data.token);
    const userProfile = await getUserProfile();
    setUser(userProfile);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
