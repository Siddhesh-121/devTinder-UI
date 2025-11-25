import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  //   console.log(user);
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, gender, about, skills },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 px-4">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-brand-accent">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">PhotoURL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <div className="dropdown w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn w-full justify-between"
                    >
                      {gender || "Select gender"}
                      <span className="text-xs opacity-70">▼</span>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
                    >
                      <li>
                        <button onClick={() => setGender("male")}>Male</button>
                      </li>
                      <li>
                        <button onClick={() => setGender("female")}>
                          Female
                        </button>
                      </li>
                      <li>
                        <button onClick={() => setGender("others")}>
                          Others
                        </button>
                      </li>
                    </ul>
                  </div>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Skills</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value.split(","))}
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    placeholder="Bio"
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered w-full min-h-[80px]"
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500 text-center">{error}</p>
              <div className="card-actions justify-center mt-2">
                <button
                  className="btn text-brand-accent bg-brand"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex justify-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, about, age, gender, skills }}
            isProfile={true}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
