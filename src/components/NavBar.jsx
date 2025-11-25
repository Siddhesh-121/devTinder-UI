import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeRequest } from "../utils/requestSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeFeed());
      dispatch(removeRequest());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      <div className="navbar-start">
        <Link
          to="/feed"
          className="btn btn-ghost normal-case text-lg sm:text-xl bg-brand text-brand-accent"
        >
          DevTinder
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {user && (
          <div className="hidden sm:block">
            <p className="text-sm sm:text-base text-brand-accent truncate max-w-[120px] sm:max-w-none">
              Welcome, {user.firstName}
            </p>
          </div>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-9 sm:w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            )}
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              onClick={(e) => {
                e.currentTarget.blur();
              }}
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
