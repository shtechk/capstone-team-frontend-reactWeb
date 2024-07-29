import instance from "./index";

const createBooking = async (bookingData) => {
  const { data } = await instance.post("/bookings", bookingData);
  return data;
};

const getUserBookings = async () => {
  const { data } = await instance.get("/bookings/user");
  return data;
};

const getBusinessBookings = async () => {
  const { data } = await instance.get("/bookings/business");
  return data;
};

const updateBookingStatus = async (bookingId, status) => {
  const { data } = await instance.put(`/bookings/${bookingId}`, { status });
  return data;
};

export {
  createBooking,
  getUserBookings,
  getBusinessBookings,
  updateBookingStatus,
};
