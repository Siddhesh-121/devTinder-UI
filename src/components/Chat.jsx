import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("recieveMessage", ({ firstName, targetUserId, text }) => {
      console.log(firstName + " sent " + text);
      setMessages((messages) => [
        ...messages,
        { firstName, text, isSent: targetUserId === userId ? false : true },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body p-0">
          {/* Chat Header */}
          <div className="bg-base-200 p-4 border-b border-base-100">
            <h2 className="text-xl font-bold text-brand-accent">Chat</h2>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-96 overflow-y-auto text-brand-accent">
            {messages.map((message) => (
              <div
                // key={message.id}
                className={message.isSent ? "chat chat-end" : "chat chat-start"}
              >
                <div className="chat-header">
                  {message.firstName}
                  {/* <time className="text-xs opacity-50 ml-2">
                    {message.timestamp}
                  </time> */}
                </div>
                <div className="chat-bubble">{message.text}</div>
                {/* <div className="chat-footer opacity-50">{message.status}</div> */}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-base-200 p-4 border-t border-base-100 flex gap-2">
            {/* <form className=""> */}
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered flex-1 text-brand-accent"
            />
            <button
              type="submit"
              onClick={handleSendMessage}
              className="btn bg-brand-accent text-brand"
            >
              Send
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
