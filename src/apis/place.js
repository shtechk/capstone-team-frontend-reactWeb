import instance from "./index";

// Fetch all place requests (admin functionality)
const getAllPlaceRequests = async () => {
  const { data } = await instance.get("/place2/requests");
  return data;
};

// Approve or reject a place request (admin functionality)
const approveOrRejectPlace = async ({ id, status }) => {
  const { data } = await instance.put(`/place/approve/${id}`, { status });
  return data;
};

// Fetch details of the current user's place
const getPlaceDetails = async () => {
  const { data } = await instance.get("/place/");
  return data;
};

// Fetch all places (new function)
const getAllPlaces = async () => {
  const { data } = await instance.get("/place/all");
  return data;
};

// Update details of the current user's place
const updatePlaceDetails = async (place) => {
  const { data } = await instance.put("/place/update", place);
  return data;
};

// Fetch booking requests for the current user's place
const getPlaceBookingRequests = async () => {
  const { data } = await instance.get("/place2/bookings");
  return data;
};

// Accept a booking request
const acceptPlaceBooking = async (id) => {
  const { data } = await instance.put(`/place/bookings/accept/${id}`);
  return data;
};

// Reject a booking request
const rejectPlaceBooking = async (id) => {
  const { data } = await instance.put(`/place/bookings/reject/${id}`);
  return data;
};

// Update booking status
const updateBookingStatus = async (bookingId, status) => {
  const { data } = await instance.put(`/bookings/${bookingId}`, { status });
  return data;
};

export {
  getAllPlaceRequests,
  approveOrRejectPlace,
  getPlaceDetails,
  getAllPlaces, // Ensure this is exported
  updatePlaceDetails,
  getPlaceBookingRequests,
  acceptPlaceBooking,
  rejectPlaceBooking,
  updateBookingStatus, // Ensure this is exported
};
