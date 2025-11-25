import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedById } from "../utils/feedSlice";

const UserCard = ({ user, isProfile }) => {
  if (!user) return null;
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;

  const dispatch = useDispatch();
  // const feed = useSelector((store) => store.request);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFeedById(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-full bg-brand-800 text-brand-accent shadow-xl p-3 min-h-[360px]">
      <figure className="w-full overflow-hidden rounded-xl aspect-4/3">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-lg sm:text-xl">
          {firstName + " " + lastName}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p className="text-lg sm:text-xl">{about}</p>
        {skills && skills.length > 0 && (
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-brand-accent-100 text-brand-800 px-2 py-1 rounded-lg text-xs sm:text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        {!isProfile && (
          <div className="card-actions justify-center my-4">
            <button
              className="w-auto
                        px-4 py-2 rounded-xl font-semibold text-white
                        bg-gradient-to-r from-red-500 to-red-700
                        shadow-lg shadow-red-500/40
                        hover:opacity-90 active:scale-95
                        transition-all duration-300"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>

            <button
              className="px-4 py-2 sm:px-5 sm:py-2
                          rounded-xl
                          font-semibold
                          text-white
                          bg-gradient-to-r from-brand-accent-400 to-brand-accent-600
                          hover:opacity-90 active:scale-95
                          shadow-lg shadow-brand-accent-400/40
                          transition-all duration-300"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
