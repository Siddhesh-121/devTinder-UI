import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequest, removeRequestById } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, reqId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + reqId,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequestById(reqId));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      if (requests && requests.length > 0) return;
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      //   console.log(res);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  //   console.log(requests);
  return (
    <div className="flex justify-center px-4">
      <ul className="list bg-base-300 rounded-box shadow-2xl w-full max-w-xl sm:max-w-2xl  my-4">
        <li className="px-4 pt-4 pb-2 text-lg opacity-80 tracking-wide border-b border-base-200 text-brand-accent">
          Your Requests
        </li>
        {(!requests || requests.length === 0) && (
          <li className="px-4 py-4 text-sm opacity-70 text-brand-accent">
            You have no pending requests.
          </li>
        )}
        {requests?.map((user) => {
          return (
            <li
              key={user._id}
              className="list-row flex flex-col sm:flex-row  justify-between items-start sm:items-center gap-3 sm-gap-4 px-4 py-3"
            >
              {/* <div className="text-4xl font-thin opacity-30 tabular-nums">01</div> */}
              <div>
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={user.fromUserId.photoUrl}
                />
              </div>
              <div className="list-col-grow text-lg">
                <div>
                  {user.fromUserId.firstName + " " + user.fromUserId.lastName}
                </div>
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {"About: " + user.fromUserId.about}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {user.fromUserId.gender?.toUpperCase() +
                  ", " +
                  (user.fromUserId?.age || "")}
              </div>
              <div className=" flex gap-2 w-full sm:w-auto justify-end sm:justify-center mt-2 sm:mt-0">
                <button
                  className="    w-full sm:w-auto px-4 py-2 rounded-lg font-semibold
    border border-brand-accent text-brand-accent
    hover:bg-brand-accent hover:text-brand
    whitespace-nowrap
    min-w-100px
    transition-all duration-200"
                  onClick={() => reviewRequest("accepted", user._id)}
                >
                  Accept
                </button>
                <button
                  className="    w-full sm:w-auto px-4 py-2 rounded-lg font-semibold
    border border-red-500 text-red-500
    hover:bg-red-500 hover:text-white
    whitespace-nowrap
    min-w-100px
    transition-all duration-200"
                  onClick={() => reviewRequest("rejected", user._id)}
                >
                  Reject
                </button>
              </div>
              {/* <button className="btn btn-square btn-ghost">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
