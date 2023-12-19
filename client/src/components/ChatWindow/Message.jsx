import React from "react";

const Message = ({ message, username }) => {
  const giveStyle = () => {
    if (username === message.username) return "items-end";
    else if (message.username === "chatBot") return "items-center";
  };
  return (
    <div className={"flex flex-col w-full my-2 " + giveStyle()}>
      {message.username !== "chatBot" && message.username !== username && <p className="text-sm">{message.username}</p>}
      <p
        className={
          "w-fit p-2 my-1 rounded-xl  border-2 border-tertiary " +
          (message.username === "chatBot" && "bg-tertiary font-semibold") +
          (message.username === username && " bg-tertiary")
        }
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
