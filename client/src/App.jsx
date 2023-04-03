import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Editor from "@monaco-editor/react";
import { CustEditor } from "./components/Editor";

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(text);
  }, [text]);
  return (
    <div className="App" style={{ padding: "5px" }}>
      <CustEditor />
    </div>
  );
}

export default App;
