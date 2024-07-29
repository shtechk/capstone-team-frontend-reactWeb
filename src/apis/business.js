import instance from "./index";

const getAllBusinessRequests = async () => {
  const { data } = await instance.get("/businesses/requests");
  return data;
};

const approveOrRejectBusiness = async ({ id, status }) => {
  const { data } = await instance.put(`/businesses/approve/${id}`, { status });
  return data;
};

const getBusinessDetails = async () => {
  const { data } = await instance.get("/businesses/");
  return data;
};

const updateBusinessDetails = async (business) => {
  const { data } = await instance.put("/businesses/update", business);
  return data;
};

const getBookingRequests = async () => {
  const { data } = await instance.get("/businesses/bookings");
  return data;
};

const acceptBooking = async (id) => {
  const { data } = await instance.put(`/businesses/bookings/accept/${id}`);
  return data;
};

const rejectBooking = async (id) => {
  const { data } = await instance.put(`/businesses/bookings/reject/${id}`);
  return data;
};

export {
  getAllBusinessRequests,
  approveOrRejectBusiness,
  getBusinessDetails,
  updateBusinessDetails,
  getBookingRequests,
  acceptBooking,
  rejectBooking,
};
