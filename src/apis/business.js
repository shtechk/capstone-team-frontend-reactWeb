import instance from "./index";

const getAllBusinessRequests = async () => {
  const { data } = await instance.get("/businesses/requests"); // Ensure this matches the backend route
  return data;
};

const approveOrRejectBusiness = async ({ id, status }) => {
  const { data } = await instance.put(`/businesses/approve/${id}`, { status }); // Ensure this matches the backend route
  return data;
};

export { getAllBusinessRequests, approveOrRejectBusiness };
