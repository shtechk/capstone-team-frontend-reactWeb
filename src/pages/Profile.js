import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBusinessDetails, updateBusinessDetails } from "../apis/business";
import { getUserProfile } from "../apis/user";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    time: "",
    date: "",
    location: "",
    description: "",
    image: null,
    mode: "",
  });

  const { data: business, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["businessDetails"],
    queryFn: getBusinessDetails,
    enabled: user?.role === "business",
  });

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: user?.role === "admin",
  });

  const mutation = useMutation({
    mutationFn: updateBusinessDetails,
    onSuccess: () => {
      queryClient.invalidateQueries(["businessDetails"]);
    },
  });

  useEffect(() => {
    if (business && business.business) {
      setFormData({
        name: business.business.name,
        time: business.business.time,
        date: business.business.date,
        location: business.business.location,
        description: business.business.description,
        image: null,
        mode: business.business.mode,
      });
    }
  }, [business]);

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

  if (isBusinessLoading || isUserLoading) return <div>Loading...</div>;
  if (!user) return <div>User not logged in</div>;

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
              Update Business
            </button>
          </form>
        </>
      ) : (
        <div className="relative bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center md:flex-row pt-10">
            <div className="md:w-3/4 w-full md:pl-6">
              <div className="md:w-1/4 w-full flex flex-col items-center md:items-start relative">
                {userProfile?.profile_image && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 -top-8 border-4 border-white">
                    <img
                      src={`http://localhost:3000/${userProfile.profile_image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <p className="text-gray-900">{userProfile?.first_name}</p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Username
                  </label>
                  <p className="text-gray-900">{userProfile?.username}</p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <p className="text-gray-900">{userProfile?.last_name}</p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <p className="text-gray-900">{userProfile?.phone_number}</p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <p className="text-gray-900">{userProfile?.role}</p>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <p className="text-gray-900">{userProfile?.status}</p>
                </div>
              </div>
              <p className="text-lg font-semibold">Email</p>
              <p className="text-gray-600">{userProfile?.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
