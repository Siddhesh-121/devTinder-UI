import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

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
    <div className="flex justify-center px-4">
      <ul className="list bg-base-300 rounded-box shadow-2xl w-full max-w-xl sm:max-w-2xl  my-4 ">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide text-brand-accent">
          Your Connections
        </li>
        {(!connections || connections.length === 0) && (
          <li className="px-4 py-4 text-sm opacity-70 text-brand-accent">
            You don't have any connections yet.
          </li>
        )}
        {connections?.map((user) => {
          return (
            <li
              key={user._id}
              className="list-row flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 px-4 py-3 border-b border-base-200 last:border-b-0 opacity-65 hover:opacity-95"
            >
              {/* <div className="text-4xl font-thin opacity-30 tabular-nums">01</div> */}
              <div>
                <img
                  className="w-14 h-14 rounded-full object-cover"
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
              <div className="w-full sm:w-auto flex justify-end sm:justify-center mt-2 sm:mt-0">
                <Link to={"/chat/" + user._id}>
                  <button
                    className="inline-flex items-center gap-1
                    px-4 py-2 rounded-lg font-semibold
                    bg-brand-accent text-brand
                    hover:brightness-110 hover:shadow-md
                    active:scale-95
                    whitespace-nowrap
                    transition-all duration-200
                    text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Chat
                  </button>
                </Link>
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
