import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPlaceDetails } from "../apis/place"; // Updated import
import { createBooking } from "../apis/booking"; // Assuming booking API remains the same

const PlaceList = () => {
  const { data: places, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaceDetails, // Updated function
  });

  const mutation = useMutation({
    mutationFn: createBooking,
  });

  const handleBooking = (placeId) => {
    const bookingData = {
      place: placeId,
      date: new Date(),
      specialInstructions: "No special instructions",
      persons: 1,
    };
    mutation.mutate(bookingData);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {places.map((place) => (
        <div key={place._id}>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
          <button onClick={() => handleBooking(place._id)}>Book</button>
        </div>
      ))}
    </div>
  );
};

export default PlaceList;
