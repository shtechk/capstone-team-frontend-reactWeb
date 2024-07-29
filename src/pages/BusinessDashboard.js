import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusinessBookings, updateBookingStatus } from "../apis/booking";

const BusinessDashboard = () => {
  const queryClient = useQueryClient();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBusinessBookings,
  });

  const mutation = useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBookingStatus(bookingId, status),
    onMutate: async ({ bookingId, status }) => {
      await queryClient.cancelQueries(["bookings"]);

      const previousBookings = queryClient.getQueryData(["bookings"]);

      queryClient.setQueryData(["bookings"], (old) =>
        old.filter((booking) => booking._id !== bookingId)
      );

      return { previousBookings };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["bookings"], context.previousBookings);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  const handleRequest = (bookingId, status) => {
    mutation.mutate({ bookingId, status });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
      {bookings?.map((booking) => (
        <div
          key={booking._id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <h3 className="text-lg font-semibold">{booking.user.username}</h3>
          <p className="text-gray-700">
            Special Instructions: {booking.specialInstructions}
          </p>
          <p className="text-gray-700">Number of Persons: {booking.persons}</p>
          <div className="mt-4">
            <button
              onClick={() => handleRequest(booking._id, "accepted")}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleRequest(booking._id, "rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessDashboard;
