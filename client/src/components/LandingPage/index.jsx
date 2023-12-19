import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/slices/userSlice";

const LandingPage = () => {
  const [username, setUserNameLocal] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log("loading", loading)
  const onSubmit = async () => {
    setLoading(true);
    if (username !== "") dispatch(setUserName(username));
    setLoading(false);
  };
  return (
    <div className="landing-page flex flex-col gap-2 w-[25%] max-w-[300px] min-w-[200px]">
      <h1 className="font-bold text-2xl mx-auto">Enter Your Details</h1>
      <label className="flex flex-col gap-2 py-1">
        <p>username</p>
        <input
          onChange={(e) => setUserNameLocal(e.target.value)}
          className="p-2 bg-primary border-[1px] rounded-md border-[#525252]"
        />
      </label>
      <label className="flex flex-col gap-2 py-1">
        <p>csrf token</p>
        <input
          onChange={(e) => setCsrfToken(e.target.value)}
          className="p-2 bg-primary border-[1px] rounded-md border-[#525252]"
        />
      </label>
      <label className="flex flex-col gap-2 py-1">
        <p>session token</p>
        <input
          onChange={(e) => setSessionToken(e.target.value)}
          className="p-2 bg-primary border-[1px] rounded-md border-[#525252]"
        />
      </label>
      <button
        onClick={onSubmit}
        className={
          "mx-auto w-[80%] py-2 hover:bg-[#464646] rounded-[8px] bg-tertiary active:bg-tertiary " +
          (loading && "opacity-10 active:bg-inherit")
        }
        disabled={loading}
      >
        Submit
      </button>
    </div>
  );
};

export default LandingPage;
