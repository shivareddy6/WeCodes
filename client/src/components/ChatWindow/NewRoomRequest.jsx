import React, { useState } from "react";

const NewRoomRequest = ({ sendNewQuestionsResponse }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="flex flex-col mx-auto p-4 w-[40%] min-w-fit bg-tertiary m-1 rounded-lg gap-2 items-center">
      NewRoomRequest
      <div className="flex gap-2 justify-around w-full">
        <button
          className={
            "bg-[#2CBB5D] hover:bg-[#4cc575] rounded-lg p-2 px-4 " +
            (disabled && "bg-[#69a37d] hover:bg-[#69a37d]")
          }
          disabled={disabled}
          onClick={() => {
            sendNewQuestionsResponse({ status: "accept" });
            setDisabled(true);
          }}
        >
          accept
        </button>
        <button
          className={
            " rounded-lg p-1 px-4 " +
            (disabled
              ? " bg-[#ff807f] hover:bg-[#ff807f]"
              : "bg-[#ff2a2a] hover:bg-[#fc4848]")
          }
          disabled={disabled}
          onClick={() => {
            sendNewQuestionsResponse({ status: "reject" });
            setDisabled(true);
          }}
        >
          reject
        </button>
      </div>
    </div>
  );
};

export default NewRoomRequest;
