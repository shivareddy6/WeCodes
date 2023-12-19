import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

const ChatWindow = ({ socket }) => {
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  const room = useSelector(state => state.chatRoom.roomName)
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [message, setMessage] = useState("");
  // const [username, setUsername] = useState("shiva");
  const username = useSelector((state) => state.user.username);
  // const [room, setRoom] = useState("room1");
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
      // joinroom();
    }
  });
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
      socket.emit("send_message", {
        username,
        message,
        __createdtime__,
        room: "room",
      });
      setMessage("");
    }
  };

  const people = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="h-[42px]">
        <p className="">Current user details</p>
      </div>
      <div className="people-div flex flex-col gap-2 mb-4">
        <p className="text-sm text-gray-400">1 people</p>
        <div className="people-list flex gap-2">
          {people.map((person, ind) => (
            <div
              key={`person-${ind}`}
              className="avatar h-10 w-10 min-w-[35px] bg-gray-300 rounded-full"
            ></div>
          ))}
        </div>
        <button className="px-4 py-2 hover:bg-[#464646] rounded-[8px] bg-tertiary active:bg-tertiary">
          Scoreboard
        </button>
      </div>
      <div className="p-[6px] flex flex-col bg-secondary w-full flex-1 justify-between gap-2">
        <div className="flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-[#525252] scrollbar-track-transparent pr-2 scrollbar-thumb-rounded-full">
          {messagesRecieved.map((message, ind) => (
            <Message
              key={"message" + ind}
              message={message}
              username={username}
            />
          ))}
          <div />
        </div>
        <div>
          <div className="flex gap-4 mb-1">
            {/* <input value={room} onChange={(e) => setRoom(e.target.value)} /> */}

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="flex-1 p-2 bg-primary border-[1px] rounded-md border-[#525252]"
              onKeyDown={(e) => {
                if (e.code === "Enter") sendMessage(message);
              }}
            />
            <button
              className="bg-[#3d3d3d] hover:bg-[#464646] rounded-lg p-2"
              onClick={() => sendMessage(message)}
            >
              Send Message
            </button>
          </div>
          {/* 
          <div className="flex w-full justify-end">
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
