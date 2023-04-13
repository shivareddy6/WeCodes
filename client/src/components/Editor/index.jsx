import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import EditorNav from "./editorNav";
import { monacoThemes } from "../../constants";
// import { defineTheme } from "../../lib/defineThemes";
import { loader } from "@monaco-editor/react";

// import data from "./customTheme.json";

const CustEditor = () => {
  // console.log(data);
  const [language, setLanguage] = useState({
    id: 71,
    name: "Python 3",
    label: "Python 3",
    value: "python",
  });
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("");
  const loadTheme = async () => {
    // loads custom-theme theme
    loader.init().then(async (monaco) => {
      const themeData = await import(`./customTheme.json`);
      monaco.editor.defineTheme("custom-theme", themeData);
      setTheme("custom-theme");
    });
  };
  loadTheme();

  const handleSubmit = async () => {
    console.log(JSON.stringify(code));
    const submission = {
      lang: language,
      code,
    };
    if (language.value === "python") submission.lang = "python3";
    fetch("http://localhost:8080/leetcode/submit-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(submission),
    }).then(async (data) => console.log(await data.json()));

    // const leetcodeWindow = window.open(
    //   "https://leetcode.com/accounts/login/",
    //   "leetcodeWindow",
    //   "width=600,height=600"
    // );
    // leetcodeWindow.onload = () => console.log(leetcodeWindow.cookie);

    // // Wait for the user to log in and close the popup window
    // await new Promise((resolve) => {
    //   const intervalId = setInterval(() => {
    //     if (leetcodeWindow.closed) {
    //       clearInterval(intervalId);
    //       resolve();
    //     }
    //   }, 500);
    // });

    // // Retrieve the leetcode_session cookie and CSRF token from the browser's cookies
    // const cookies = document.cookie.split(";");
    // const sessionId = cookies
    //   .find((cookie) => cookie.trim().startsWith("leetcode_session="))
    //   ?.trim()
    //   ?.split("=")[1];
    // const csrfToken = cookies
    //   .find((cookie) => cookie.trim().startsWith("csrftoken="))
    //   ?.trim()
    //   ?.split("=")[1];

    // // Do something with the CSRF token and session ID
    // console.log("CSRF Token:", csrfToken);
    // console.log("Session ID:", sessionId);
  };
  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] min-w-[400px]">
        <div 
        className="py-[4px]"
        >
          <EditorNav language={language} setLanguage={setLanguage} />
        </div>
        <Editor
          width="100%"
          height="90%"
          className="flex-grow-1"
          language={language.value}
          theme={theme}
          value={code}
          onChange={(newCode) => setCode(newCode)}
        />
        <div className="mt-[1px] py-[10px] px-[20px] h-[55px] flex w-[100%] gap-3 justify-between bg-[#282828]">
          <button className=" px-4 bg-[#3d3d3d] hover:bg-[#464646]" style={{borderRadius: "8px"}}>Console</button>
          <div className="flex gap-2 ">
            <button
              className="px-4 py-2 bg-[#3d3d3d] hover:bg-[#464646] rounded-[8px]"
              onClick={handleSubmit}
            >
              Run
            </button>
            <button
              className="py-2 px-4 bg-[#2CBB5D] hover:bg-[#4cc575] text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CustEditor };
