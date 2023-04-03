import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import EditorNav from "./editorNav";
import { monacoThemes } from "../../constants";
// import { defineTheme } from "../../lib/defineThemes";
import { loader } from "@monaco-editor/react";

const CustEditor = () => {
  const [language, setLanguage] = useState({
    id: 71,
    name: "Python 3",
    label: "Python 3",
    value: "python",
  });
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("");
  const loadTheme = async () => {
    // loads merbivore-soft theme
    loader.init().then(async (monaco) => {
      const themeData = await import(
        `monaco-themes/themes/Merbivore Soft.json`
      );
      monaco.editor.defineTheme("merbivore-soft", themeData);
      setTheme("merbivore-soft");
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
      <div className="h-[60%] w-[80%] border-solid border-r-red-200 p-3">
        <EditorNav
          language={language}
          setLanguage={setLanguage}
          className="h-[10%]"
        />
        <Editor
          width="100%"
          height="90%"
          language={language.value}
          theme={theme}
          value={code}
          onChange={(newCode) => setCode(newCode)}
        />
        <div className="my-2 flex w-[100%] gap-3">
          <button
            className="py-2 px-4 rounded-md border-[3px]"
            onClick={handleSubmit}
          >
            Run
          </button>
          <button
            className="py-2 px-4 bg-[#4cc575] text-white rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export { CustEditor };
