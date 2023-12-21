import "./App.css";
import Room from "./components/Room";
import { useSelector, useDispatch } from "react-redux";
import { addPeople, fetchProblems } from "./store/slices/roomSlice";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import UsernameValidationWrapper from "./components/UsernameValidationWrapper";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProblems());
  }, []);
  return (
    <div className="App flex flex-col justify-center items-center gap-0 w-[100%] bg-primary">
      <Routes>
        {/* <button onClick={testFunc}>Test</button> */}
        {/* {username !== "" ? <Room /> : <LandingPage />} */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/:username"
          element={
            <UsernameValidationWrapper>
              <Room />
            </UsernameValidationWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
