import React, { useEffect, useState } from "react";
import { CustEditor } from "../Editor";
import QuestionDisplay from "../QuestionDisplay";
import Split from "react-split-grid";
import "./styles.css";
import { loader } from "@monaco-editor/react";
import ChatWindow from "../ChatWindow";
import io from "socket.io-client"

const Room = ({socket}) => {
  const [problems, setProblems] = useState([
    "palindrome-number",
    "largest-color-value-in-a-directed-graph",
    "valid-parentheses",
    "largest-color-value-in-a-directed-graph",
  ]);
  const [problemSlug, setProblemSlug] = useState(problems[0]);
  const [language, setLanguage] = useState({
    id: 71,
    name: "Python3",
    label: "Python 3",
    value: "python",
    leetcode_value: "python3",
  });
  const [theme, setTheme] = useState("");
  const [questionLoading, setQuestionLoading] = useState(false);
  const [username, setUsername] = useState("shiva_nanda");

  

  useEffect(() => {
    // console.log("connecting socket");
    // socket = 
    // console.log(socket)
    // console.log("connection done");
    // return () => socket.emit("emit");
  }, [])

  const loadTheme = async () => {
    // loads custom-theme theme
    loader.init().then(async (monaco) => {
      const themeData = await import(`../../constants/customTheme.json`);
      monaco.editor.defineTheme("custom-theme", themeData);
      setTheme("custom-theme");
    });
  };
  loadTheme();

  return (
    <div className="w-full h-full">
      <Split
        // snapOffset={150}
        // minSize={}
        render={({ getGridProps, getGutterProps }) => (
          <div className="room-grid h-[100%] pt-2" {...getGridProps()}>
            <QuestionDisplay
              problemSlug={problemSlug}
              problems={problems}
              setProblemSlug={setProblemSlug}
              questionLoading={questionLoading}
              setQuestionLoading={setQuestionLoading}
            />
            <div
              className="gutter flex justify-center items-center gutter-vertical"
              {...getGutterProps("column", 1)}
            >
              <img
                src="https://split.js.org/vertical.png"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <CustEditor
              problemSlug={problemSlug}
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              questionLoading={questionLoading}
              setQuestionLoading={setQuestionLoading}
            />
            <div
              className="gutter flex justify-center items-center gutter-vertical"
              {...getGutterProps("column", 3)}
            >
              <img
                src="https://split.js.org/vertical.png"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <ChatWindow
              username={username}
              setUsername={setUsername}
              socket={socket}
            />
            <div />
          </div>
        )}
      />
    </div>
  );
};

export default Room;
