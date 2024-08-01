import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlaceBookingRequests, updateBookingStatus } from "../apis/place"; // Ensure correct imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast.css";
import "../styles.css";

const BusinessDashboard = () => {
  const queryClient = useQueryClient();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getPlaceBookingRequests, // Correctly use getPlaceBookingRequests
  });

  const mutation = useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBookingStatus(bookingId, status), // Correctly use updateBookingStatus
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
    onSuccess: (data, variables) => {
      if (variables.status === "accepted") {
        toast.success(
          <div className="toast-message1">
            <span className="toast-icon">✔️</span> Booking accepted
          </div>,
          { className: "toast-container" }
        );
      } else {
        toast.error(
          <div className="toast-message">
            <span className="toast-icon">❌</span> Booking rejected
          </div>,
          { className: "toast-container" }
        );
      }
    },
  });

  const handleRequest = (bookingId, status) => {
    mutation.mutate({ bookingId, status });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const renderSkeletonLoader = () => {
    return (
      <div>
        <div className="skeleton-search"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="skeleton">
            <div className="skeleton-img"></div>
            <div className="skeleton-text">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="flex">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading || isInitialLoading) {
    return (
      <div className="container mx-auto p-4">{renderSkeletonLoader()}</div>
    );
  }

  const filteredBookings = bookings?.filter((booking) =>
    booking.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bar here"
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="text-2xl font-bold mb-4">Place Dashboard</h1>
      {filteredBookings?.map((booking) => (
        <div
          key={booking._id}
          className="flex items-center bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4"
        >
          <div className="flex-grow">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {booking.user.username}
            </div>
            <p className="text-gray-500">
              Special Instructions: {booking.specialInstructions}
            </p>
            <p className="text-gray-500">
              Number of Persons: {booking.persons}
            </p>
            <div className="mt-2 flex">
              <button
                onClick={() => handleRequest(booking._id, "accepted")}
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              >
                Accept
              </button>
              <button
                onClick={() => handleRequest(booking._id, "rejected")}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessDashboard;
