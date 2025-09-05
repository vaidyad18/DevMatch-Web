import React, { useState } from "react";
import { User, Users, Calendar, Link as LinkIcon, Save } from "lucide-react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [description, setDescription] = useState(user.description);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const GENDER_OPTIONS = ["Male", "Female", "Other"];
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, description, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));

      toast.success("Profile updated successfully", {
        autoClose: 2000,
        position: "bottom-right",
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        progressStyle: {
          height: "3px",
          background:
            "linear-gradient(90deg, hsl(20 95% 60%), hsl(330 85% 65%))",
        },
        style: {
          border: "1px solid hsl(220 13% 91%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        },
        transition: Bounce,
        theme: "light",
      });
    } catch (err) {
      toast.error("Failed to update profile", {
        autoClose: 2000,
        position: "bottom-right",
        hideProgressBar: false,
        progressStyle: { height: "3px", background: "hsl(0 85% 60%)" },
        transition: Bounce,
        theme: "light",
      });
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-20 px-4 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="w-full max-w-3xl -mt-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">
            Edit profile
          </h1>
          <p className="mt-1 text-[hsl(232_10%_45%)]">Update your basic details.</p>
        </div>

        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  First name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full h-11 rounded-md text-black border border-gray-300 px-10 outline-none"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Last name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full h-11 rounded-md text-black border border-gray-300 px-10 outline-none"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Gender
                </label>
                <div className="relative">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-11 rounded-md text-black border border-gray-300 pl-10 pr-3 outline-none bg-white"
                  >
                    {["Male", "Female", "Other"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    className="w-full h-11 rounded-md text-black border border-gray-300 px-10 outline-none"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Photo URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full h-11 rounded-md text-black border border-gray-300 px-10 outline-none"
                  />
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the community about yourself…"
                  className="w-full rounded-md text-black border border-gray-300 px-3 py-2 outline-none placeholder:text-[hsl(232_10%_65%)]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex cursor-pointer items-center justify-center rounded-md h-11 px-4 text-white font-medium bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] hover:opacity-95"
              >
                <Save className="h-4 w-4 mr-2" />
                Save changes
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center rounded-md h-11 px-4 border border-[hsl(220_13%_91%)] bg-white hover:bg-[hsl(220_13%_96%)] text-[hsl(234_12%_12%)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, age, gender, description, photoURL }} />

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable={false}
        hideProgressBar={false}
        transition={Bounce}
        theme="dark"
      />
    </div>
  );
};

export default EditProfile;
