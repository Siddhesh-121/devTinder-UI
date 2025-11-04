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
      if (requests) return;
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
    <div className="flex justify-center">
      <ul className="list bg-base-300 rounded-box shadow-2xl w-2/4  my-2">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
          Your Requests
        </li>
        {requests?.map((user) => {
          return (
            <li
              key={user._id}
              className="list-row flex justify-between items-center "
            >
              {/* <div className="text-4xl font-thin opacity-30 tabular-nums">01</div> */}
              <div>
                <img
                  className="size-15 rounded-box"
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
              <div className="">
                <button
                  className="btn btn-accent mx-2 hover:opacity-60"
                  onClick={() => reviewRequest("accepted", user._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error mx-2 hover:opacity-60"
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
