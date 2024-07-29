import instance from "./index";

// Function to get the user profile
export const getUserProfile = async () => {
  const response = await instance.get("/users/profile");
  return response.data;
};

// Add more user-related API functions here if needed
