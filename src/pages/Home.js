import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllPlaceRequests, approveOrRejectPlace } from "../apis/place"; // Adjust the path according to your project structure
import { useUser } from "../context/UserContext"; // Adjust the path according to your project structure
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast.css"; // Import the custom CSS file
import "../styles.css"; // Import the styles.css file for skeleton loader

const Home = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [triggerRender, setTriggerRender] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["placeRequests"],
    queryFn: getAllPlaceRequests,
  });

  const mutation = useMutation({
    mutationFn: approveOrRejectPlace,
    onSuccess: (data, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("placeRequests");
      if (variables.status === "approved") {
        toast.success(
          <div className="toast-message1">
            <span className="toast-icon">✔️</span> Place accepted
          </div>,
          { className: "toast-container" }
        );
      } else {
        toast.error(
          <div className="toast-message">
            <span className="toast-icon">❌</span> Place rejected
          </div>,
          { className: "toast-container" }
        );
      }
      // Trigger re-render
      setTriggerRender(!triggerRender);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleApproval = (id, status) => {
    mutation.mutate({ id, status });
  };

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

  if (error) {
    return <div>Error loading place requests: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <ToastContainer />
        <div>No new place requests.</div>
      </div>
    );
  }

  const filteredData = data.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.mode.toLowerCase().includes(searchTerm.toLowerCase())
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
      {filteredData.map((place) => (
        <div
          key={place._id}
          className="flex items-center bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4"
        >
          {place.image && (
            <img
              className="w-24 h-24 object-cover mr-4"
              src={`http://localhost:3000/${place.image}`}
              alt="Place"
            />
          )}
          <div className="flex-grow">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {place.name}
            </div>
            <p className="text-gray-500">{place.description}</p>
            <p className="text-gray-500">
              <strong>Location:</strong>{" "}
              {place.location ? JSON.stringify(place.location) : "N/A"}
            </p>
            <p className="text-gray-500">
              <strong>Mode:</strong> {place.mode}
            </p>
            <p className="text-gray-500">
              <strong>Operating Time:</strong> {place.time}
            </p>
            <p className="text-gray-500">
              <strong>Date:</strong> {new Date(place.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500">
              <strong>Status:</strong> {place.status}
            </p>
            <div className="mt-2 flex">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={() => handleApproval(place._id, "approved")}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleApproval(place._id, "rejected_creation")}
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

export default Home;
