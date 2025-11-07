import React, { useState } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How are you?",
      timestamp: "2 hours ago",
      isSent: false,
      status: "Seen",
    },
    {
      id: 2,
      text: "I'm doing great! Thanks for asking.",
      timestamp: "2 hours ago",
      isSent: true,
      status: "Delivered",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: "Just now",
        isSent: true,
        status: "Sent",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body p-0">
          {/* Chat Header */}
          <div className="bg-base-200 p-4 border-b border-base-100">
            <h2 className="text-xl font-bold">Chat</h2>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={message.isSent ? "chat chat-end" : "chat chat-start"}
              >
                <div className="chat-header">
                  {message.isSent ? "You" : "User"}
                  <time className="text-xs opacity-50 ml-2">
                    {message.timestamp}
                  </time>
                </div>
                <div className="chat-bubble">{message.text}</div>
                <div className="chat-footer opacity-50">{message.status}</div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-base-200 p-4 border-t border-base-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="input input-bordered flex-1"
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
