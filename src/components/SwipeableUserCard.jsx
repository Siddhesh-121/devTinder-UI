import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeedById } from "../utils/feedSlice";
import UserCard from "./UserCard";

// Tweak this to control how far you must drag for a swipe
const SWIPE_THRESHOLD = 50; // px

// Tweak this to control how much the card rotates while dragging
const ROTATION_FACTOR = 30; // bigger number = less rotation

const SwipeableUserCard = ({ user }) => {
  const [showToast, setShowToast] = useState(null);
  const dispatch = useDispatch();
  const [drag, setDrag] = useState({
    x: 0,
    rot: 0,
    isDragging: false,
  });

  const handleSendRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      //   console.log(res.data);
      dispatch(removeFeedById(user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setDrag({
        x: deltaX,
        rot: deltaX / ROTATION_FACTOR,
        isDragging: true,
      });
    },

    onSwiped: ({ dir, absX }) => {
      if (absX < SWIPE_THRESHOLD) {
        setDrag({ x: 0, rot: 0, isDragging: false });
        return;
      }

      if (dir === "Right") {
        handleSendRequest("interested");
        setShowToast("Interested");
        setTimeout(() => {
          setShowToast(null);
        }, 2000);
        setDrag({ x: 0, rot: 0, isDragging: false });
      } else if (dir === "Left") {
        handleSendRequest("ignored");
        setShowToast("Ignored");
        setTimeout(() => {
          setShowToast(null);
        }, 2000);
        setDrag({ x: 0, rot: 0, isDragging: false });
      } else {
        setDrag({ x: 0, rot: 0, isDragging: false });
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translateX(${drag.x}px) rotate(${drag.rot}deg)`,
        transition: drag.isDragging ? "none" : "transform 0.25s ease-out",
      }}
      onTransitionEnd={() => {
        if (!drag.isDragging && drag.x === 0 && drag.rot === 0) {
          setDrag((prev) => ({ ...prev, isDragging: false }));
        }
      }}
    >
      <UserCard user={user} isProfile={false} />
      {showToast && (
        <div className="toast toast-top toast-center pt-20 ">
          <div
            className={
              showToast === "Interested"
                ? "alert alert-success"
                : "alert alert-error"
            }
          >
            <span>{showToast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwipeableUserCard;
