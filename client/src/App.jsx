import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Editor from "@monaco-editor/react";
import { CustEditor } from "./components/Editor";
import Navbar from "./components/Navbar";
import Room from "./components/Room";

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(text);
  }, [text]);
  return (
    <div className="App flex flex-col gap-0 w-[100%] bg-[#1a1a1a]">
      <Navbar />
      <Room />
    </div>
  );
}

export default App;
