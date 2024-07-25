import instance from "./index";
import { storeToken } from "./storage";

const login = async (userInfo) => {
  const { data } = await instance.post("/users/login", userInfo);
  if (data.token) {
    await storeToken(data.token);
  }
  return data;
};

export { login };
