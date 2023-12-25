import React, { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";

const NewRoomRequest = ({ sendNewQuestionsResponse, maxResponseTime }) => {
  const [disabled, setDisabled] = useState(false);

  const handleResponse = (status) => {
    console.log(Date.now(), maxResponseTime);
    if (Date.now() <= maxResponseTime) {
        console.log("in", status)
      sendNewQuestionsResponse({ status });
    }
    setDisabled(true);
  };

  const handleTimer = async () => {
    const interval = setInterval(() => {
      if (Date.now() > maxResponseTime) {
        clearInterval(interval);
        setDisabled(true);
      } else {
        console.log(
          Math.round((maxResponseTime - Date.now()) / 1000),
          "seconds left to react"
        );
      }
    }, 1000);
  };

  useEffect(() => {
    handleTimer();
  }, []);
  return (
    <div className="mx-auto w-[40%] min-w-fit bg-tertiary m-1 rounded-lg overflow-auto">
      <div className="flex flex-col p-4 gap-2 items-center">
        NewRoomRequest
        <div className="flex gap-2 justify-around w-full">
          <button
            className={
              "bg-[#2CBB5D] hover:bg-[#4cc575] rounded-lg p-2 px-4 " +
              (disabled && "bg-[#69a37d] hover:bg-[#69a37d]")
            }
            disabled={disabled}
            onClick={() => handleResponse("accept")}
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
            onClick={() => handleResponse("reject")}
          >
            reject
          </button>
        </div>
      </div>
      <ProgressBar totalTime={maxResponseTime - Date.now()} />
    </div>
  );
};

export default NewRoomRequest;
