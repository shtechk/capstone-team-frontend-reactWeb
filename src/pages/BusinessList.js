import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllBusinesses } from "../apis/business";
import { createBooking } from "../apis/booking";

const BusinessList = () => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: getAllBusinesses,
  });

  const mutation = useMutation({
    mutationFn: createBooking,
  });

  const handleBooking = (businessId) => {
    const bookingData = {
      place: businessId,
      date: new Date(),
      specialInstructions: "No special instructions",
      persons: 1,
    };
    mutation.mutate(bookingData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {businesses.map((business) => (
        <div key={business._id}>
          <h3>{business.name}</h3>
          <p>{business.description}</p>
          <button onClick={() => handleBooking(business._id)}>Book</button>
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
