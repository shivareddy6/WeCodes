import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useDispatch } from "react-redux";
import { setUserName } from "../store/slices/userSlice";

const UsernameValidationWrapper = ({ children }) => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateUsername = async () => {
    //fetch info from local
    //send to /auth/verify/sessionToken => boolean
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
    console.log("username", isUsernameValid);
    if (isUsernameValid) {
      dispatch(setUserName(username));
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    validateUsername();
  }, []);

  return loading ? <p>Loading...</p> : children;
};

export default UsernameValidationWrapper;
