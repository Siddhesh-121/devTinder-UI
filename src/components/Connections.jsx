import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      if (connections) return;
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center">
      <ul className="list bg-base-300 rounded-box shadow-2xl w-2/4  my-2">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
          Your Connections
        </li>
        {connections?.map((user) => {
          return (
            <li
              key={user._id}
              className="list-row flex justify-between items-center opacity-65 hover:opacity-95"
            >
              {/* <div className="text-4xl font-thin opacity-30 tabular-nums">01</div> */}
              <div>
                <img
                  className="size-15 rounded-box"
                  src={user.photoUrl || ""}
                />
              </div>
              <div className="list-col-grow text-lg">
                <div>{user.firstName + " " + user.lastName || ""}</div>
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {"About: " + user.about || ""}
              </div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {user.gender.toUpperCase() + ", " + (user.age || "")}
              </div>
              {/* <div className="">
                <button className="btn btn-accent mx-2">Accept</button>
                <button className="btn btn-error mx-2">Reject</button>
              </div> */}
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

export default Connections;
