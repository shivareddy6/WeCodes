import React, { useEffect, useState } from "react";
import Message from "./Message";

const ChatWindow = ({ socket }) => {
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("shiva");
  const [room, setRoom] = useState("room1");
  const [joined, setJoined] = useState(false);

  const joinroom = () => {
    setJoined(true);
    if (username !== "") {
      console.log("sending join room request");
      socket.emit("join_room", { username });
    }
  };

  useEffect(() => {
    if (socket !== undefined) {
      socket.on("receive_message", (data) => {
        console.log(data);
        setMessagesReceived((state) => [
          ...state,
          {
            message: data.message,
            username: data.username,
            __createdtime__: data.__createdtime__,
          },
        ]);
      });

      return () => socket.off("receive_message");
    }
    // Remove event listener on component unmount
  }, [socket]);

  const sendMessage = (message) => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit("send_message", { username, message, __createdtime__ });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h-[42px]">NavBar</div>
      <div className="p-[6px] flex flex-col bg-[#282828] w-full flex-1 justify-between">
        <div>
          <p>
            Username:{" "}
            <input
              className="bg-[#282828] inline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <div>
            {messagesRecieved.map((message, ind) => (
              <Message
                key={"message" + ind}
                message={message}
                username={username}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="">
            {/* <input value={room} onChange={(e) => setRoom(e.target.value)} /> */}

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="w-full p-2 bg-[#1a1a1a] border-[1px] rounded-md border-[#525252]"
            />
          </div>

          <div
            className={
              "flex w-full " + (joined ? "justify-end" : "justify-between")
            }
          >
            <button
              className={
                "bg-[#3d3d3d] hover:bg-[#464646] rounded-lg p-2 my-2 " +
                (joined && " hidden")
              }
              onClick={() => joinroom()}
            >
              Join Room
            </button>
            <button
              className="bg-[#3d3d3d] hover:bg-[#464646] rounded-lg p-2 my-2"
              onClick={() => sendMessage(message)}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
