import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlaceDetails, updatePlaceDetails } from "../apis/place"; // Updated import
import { getUserProfile } from "../apis/user";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "test",
    time: "",
    date: "",
    location: "",
    description: "",
    image: null,
    mode: "",
    mood: "",
    food: "",
    drinks: "",
    service: "",
    parking: "",
    timings: "",
    location_type: "",
    location_coordinates: "",
  });

  const { data: place, isLoading: isPlaceLoading } = useQuery({
    queryKey: ["placeDetails"],
    queryFn: getPlaceDetails,
    enabled: user?.role === "business",
  });

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: user?.role === "admin",
  });

  const mutation = useMutation({
    mutationFn: updatePlaceDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["placeDetails"]);
    },
  });
  console.log(place);
  useEffect(() => {
    if (place) {
      setFormData({
        name: place[0].name || "",
        time: place[0].time || "",
        date: place[0].date || "",
        location: place[0].location?.description || place[0].location || "", // Adjust this as per your data structure
        description: place[0].description || "",
        image: null,
        mode: place[0].mode || "",
        mood: place[0].mood || "",
        food: place[0].food || "",
        drinks: place[0].drinks || "",
        service: place[0].service || "",
        parking: place[0].parking || "",
        timings: place[0].timings || "",
        location_type: place[0].location?.type || "",
        location_coordinates: place[0].location?.coordinates
          ? JSON.stringify(place[0].location.coordinates)
          : "",
      });
    }
  }, [place]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    mutation.mutate(formDataToSubmit);
  };

  if (isPlaceLoading || isUserLoading) return <div>Loading...</div>;
  if (!user) return <div>User not logged in</div>;
  console.log(user.role);
  return (
    <div className="container mx-auto p-4">
      {user.role === "business" ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Business Profile</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Time
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mode"
                >
                  Mode
                </label>
                <input
                  type="text"
                  id="mode"
                  name="mode"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.mode}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mood"
                >
                  Mood
                </label>
                <input
                  type="text"
                  id="mood"
                  name="mood"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.mood}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="food"
                >
                  Food
                </label>
                <input
                  type="text"
                  id="food"
                  name="food"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.food}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="drinks"
                >
                  Drinks
                </label>
                <input
                  type="text"
                  id="drinks"
                  name="drinks"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.drinks}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="service"
                >
                  Service
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.service}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="parking"
                >
                  Parking
                </label>
                <input
                  type="text"
                  id="parking"
                  name="parking"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.parking}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="timings"
                >
                  Timings
                </label>
                <input
                  type="text"
                  id="timings"
                  name="timings"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.timings}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location_type"
                >
                  Location Type
                </label>
                <input
                  type="text"
                  id="location_type"
                  name="location_type"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.location_type}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location_coordinates"
                >
                  Location Coordinates
                </label>
                <input
                  type="text"
                  id="location_coordinates"
                  name="location_coordinates"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.location_coordinates}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="w-full px-3 py-2 border rounded-lg"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Place
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
          <div className="relative bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={
                    userProfile?.profile_image
                      ? `http://localhost:3000/${userProfile.profile_image}`
                      : "/path/to/default/profile.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="md:w-3/4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.first_name || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.last_name || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.username || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.phone_number || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.email || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.role || ""}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      className="w-full px-3 py-2 border rounded-lg"
                      value={userProfile?.status || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
