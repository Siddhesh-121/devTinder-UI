import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import SwipeableUserCard from "./SwipeableUserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const data = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // console.log(feed);
  return (
    <div className="flex flex-col items-center gap-4 my-5">
      {feed?.length > 0 ? (
        // feed.map((item) => (
        //   <UserCard key={item._id} user={item} isProfile={false} />
        // ))
        <SwipeableUserCard user={feed[0]} isProfile={false} />
      ) : (
        // <UserCard user={feed[0]} isProfile={false} />
        <h1 className="text-2xl text-brand-accent">No New Users found!</h1>
      )}
    </div>
  );
};

export default Feed;
