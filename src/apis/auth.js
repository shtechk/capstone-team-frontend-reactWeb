import instance from "./index";
import { storeToken } from "./storage";

const login = async (userInfo) => {
  const { data } = await instance.post("/users/login", userInfo);
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

const getUserProfile = async () => {
  const { data } = await instance.get("/users/profile"); // Adjust the endpoint if necessary
  return data;
};

export { login, getUserProfile };
