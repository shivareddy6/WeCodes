import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/slices/userSlice";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [username, setUserNameLocal] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log("loading", loading)
  const navigate = useNavigate();

  const usernameLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/checkUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({ username }),
    });
    const isUsernameValid = await response.json();
    console.log("username valid", isUsernameValid);
    if (!isUsernameValid) {
      alert("invalid username or session expired, please use tokens to login");
    } else {
      if (username !== "") dispatch(setUserName(username));
      navigate(`/${username}`)
    }
    setLoading(false);
  };

  const tokensLogin = async () => {
    setLoading(true);
    if (csrfToken === "" || sessionToken === "") {
      alert("Please enter both the tokes");
    } else {
      const response = await fetch(`${BACKEND_URL}/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          csrfToken,
          session: sessionToken,
        }),
      });
      // console.log(await response.json());
      const res = await response.json();
      if (res.error) {
        alert("Please enter valid tokens");
      } else {
        dispatch(setUserName(res.username));
      }
    }

    setLoading(false);
  };

  return (
    <div className="landing-page flex flex-col items-center gap-20 w-[80%] lg:w-[70%] xl:w-[60%] pb-[15%]">
      <div
        className="logo flex text-[50px] gap-2 font-bold"
        style={{ fontFamily: "arial" }}
      >
        <p className="pr-0">WE</p>
        <p className="px-2 text-[35px] rounded-lg bg-[#fa971f] text-black flex items-center justify-center">
          CODES
        </p>
      </div>

      <form className="username-login flex flex-col gap-2 w-[25%] max-w-[300px] min-w-[200px]">
        <h1 className="font-bold text-2xl mx-auto">Enter Your username</h1>
        <label className="username-label flex flex-col gap-2 py-1">
          <p>username</p>
          <input
            value={username}
            onChange={(e) => setUserNameLocal(e.target.value)}
            className="p-2 bg-primary border-[1px] rounded-md border-[#525252]"
          />
        </label>
        <button
          type="submit"
          onClick={(e) => usernameLogin(e)}
          className={
            "mx-auto w-[80%] py-2 hover:bg-[#464646] rounded-[8px] bg-tertiary active:bg-tertiary " +
            (loading && "opacity-10 active:bg-inherit")
          }
          disabled={loading}
        >
          Submit
        </button>
      </form>

      {/* <div className="divider w-[0.5px] bg-purple-400"></div>

      <div className="tokens-login flex flex-col gap-2 w-[25%] max-w-[300px] min-w-[200px]">
        <h1 className="font-bold text-2xl mx-auto">Enter Your Tokens</h1>

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
          onClick={tokensLogin}
          className={
            "mx-auto w-[80%] py-2 hover:bg-[#464646] rounded-[8px] bg-tertiary active:bg-tertiary " +
            (loading && "opacity-10 active:bg-inherit")
          }
          disabled={loading}
        >
          Submit
        </button>
      </div> */}
    </div>
  );
};

export default LandingPage;
