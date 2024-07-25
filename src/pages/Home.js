import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBusinessRequests,
  approveOrRejectBusiness,
} from "../apis/business"; // Adjust the path according to your project structure
import { useUser } from "../context/UserContext"; // Adjust the path according to your project structure

const Home = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["businessRequests"],
    queryFn: getAllBusinessRequests,
  });

  const mutation = useMutation({
    mutationFn: approveOrRejectBusiness,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("businessRequests");
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

  if (isLoading || isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading business requests: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No new business requests.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Requests</h1>
      {data.map((business) => (
        <div key={business._id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-4">
          {business.image && (
            <div>
              <img className="h-64 w-full" src={`http://localhost:3000/${business.image}`} alt="Business" />
            </div>
          )}
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{business.name}</div>
            <p className="mt-2 text-black">{business.description}</p>
            <p className="mt-2 text-black"><strong>Location:</strong> {business.location}</p>
            <p className="mt-2 text-black"><strong>Mode:</strong> {business.mode}</p>
            <p className="mt-2 text-black"><strong>Operating Time:</strong> {business.time}</p>
            <p className="mt-2 text-black"><strong>Date:</strong> {new Date(business.date).toLocaleDateString()}</p>
            <p className="mt-2 text-black"><strong>Status:</strong> {business.status}</p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={() => handleApproval(business._id, "approved")}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleApproval(business._id, "rejected_creation")}
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
