import "./App.css";
import Room from "./components/Room";
import { useSelector, useDispatch } from "react-redux";
import { addPeople, fetchProblems } from "./store/slices/roomSlice";
import { socket } from "./services/socket";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    dispatch(fetchProblems());
  }, []);
  return (
    <div className="App flex flex-col justify-center items-center gap-0 w-[100%] bg-primary">
      {/* <button onClick={testFunc}>Test</button> */}
      {username !== "" ? <Room socket={socket} /> : <LandingPage />}
    </div>
  );
}

export default App;
