import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import EditorNav from "./editorNav";
import { monacoThemes } from "../../constants";
// import { defineTheme } from "../../lib/defineThemes";
import { loader } from "@monaco-editor/react";
import Testcases from "./Testcases";

// import data from "./customTheme.json";

const CustEditor = ({
  problemSlug,
  language,
  setLanguage,
  theme,
  questionLoading = false,
  setQuestionLoading,
}) => {
  const [code, setCode] = useState("");
  const [editorLoad, setEditorLoad] = useState(false);
  const [testcaseData, setTestcaseData] = useState("");
  const [status, setStatus] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [stdOutput, setStdOutput] = useState("");
  const [runError, setRunError] = useState("");
  const [codeRunning, setCodeRunning] = useState(false);
  // console.log("question in editor", questionLoading)
  useEffect(() => {
    // console.log("reload");
    const snippets = JSON.parse(
      localStorage.getItem(`${problemSlug}_snippets`)
    );
    // console.log("prev", snippets, snippets === null);
    if (snippets === null) {
      fetchAndSetSnippets();
    } else {
      setOldCode();
    }
  }, []);

  useEffect(() => {
    try {
      setOldCode();
    } catch (err) {
      console.log(err);
    }
  }, [language, problemSlug]);

  const fetchAndSetSnippets = async () => {
    setEditorLoad(true);
    const res = await fetch(
      `http://localhost:8080/leetcode/problem/${problemSlug}/`,
      {
        method: "GET",
      }
    );
    const response = await res.json();
    // console.log(response)
    const newSnippets = {};
    response.snippets.map(
      (snippet) => (newSnippets[snippet.lang] = snippet.code)
    );
    // console.log(newSnippets);
    // return newSnippets;
    localStorage.setItem(
      `${problemSlug}_snippets`,
      JSON.stringify(newSnippets)
    );
    if (code === "") setCode(newSnippets[language.name]);
    setEditorLoad(false);
  };

  const setOldCode = async () => {
    let snippets = JSON.parse(localStorage.getItem(`${problemSlug}_snippets`));
    if (snippets === null) await fetchAndSetSnippets();
    snippets = JSON.parse(localStorage.getItem(`${problemSlug}_snippets`));
    // console.log("already", snippets);
    // console.log(language);
    const oldCode = localStorage.getItem(`${problemSlug}_${language.name}`);
    // console.log(oldCode, language.name);
    if (oldCode !== null && oldCode !== "undefined") {
      setCode(oldCode);
    } else {
      // console.log("into else", snippets[language.name]);
      localStorage.setItem(
        `${problemSlug}_${language.name}`,
        snippets[language.name]
      );
      setCode(snippets[language.name]);
    }
  };

  const handleSubmit = async (curLanguage, curCode, curInput) => {
    console.log("called submit", curLanguage);
    // curInput = "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6\n[2,7,11,15,16]\n9";
    const data = {
      code: curCode,
      input: curInput,
      language: curLanguage.leetcode_value,
      slug: problemSlug,
    };
    // console.log(data);

    const res = await fetch("http://localhost:8080/leetcode/submit-code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
    setStatus(response.status_msg);
  };

  const handleRunCode = async (curLanguage, curCode, curInput) => {
    setCodeRunning(true);
    console.log("called", curLanguage);
    // curInput = "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6\n[2,7,11,15,16]\n9";
    const data = {
      code: curCode,
      input: curInput,
      language: curLanguage.leetcode_value,
      slug: problemSlug,
    };
    // console.log(data);

    setUserOutput("");
    setExpectedOutput("");
    setStdOutput("");
    setRunError("");
    setStatus("");
    const res = await fetch("http://localhost:8080/leetcode/run-code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if (response.status_msg === "Accepted") {
      if (response.correct_answer) setStatus("Testcases Passed");
      else setStatus("Testcases failed");
    } else setStatus(response.status_msg);
    console.log(response);

    let outputStr = "";
    response.code_answer?.map((ans) => (outputStr += ans + "\n"));
    setUserOutput(outputStr);
    outputStr = "";
    response.expected_code_answer?.map((ans) => (outputStr += ans + "\n"));
    setExpectedOutput(outputStr);
    outputStr = "";
    response.code_output?.map((ans) => (outputStr += ans + "\n"));
    setStdOutput(outputStr);
    setRunError(response.runtime_error ? response.runtime_error : "");

    setCodeRunning(false);
  };

  // useEffect(() => {
  //   console.log("changed");
  //   console.log(userOutput);
  //   console.log(expectedOutput);
  //   console.log(stdOutput);
  // }, [stdOutput]);
  return (
    <>
      <div className="flex flex-col h-full w-[100%] min-w-[400px] overflow-hidden">
        <div className="py-[4px] h-[42px]">
          <EditorNav
            language={language}
            setLanguage={setLanguage}
            loading={questionLoading || editorLoad}
          />
        </div>
        {questionLoading || editorLoad ? (
          <div className="w-full h-full flex justify-center items-center font-semibold">
            Loading...
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col min-h-0 max-h-[100%] overflow-hidden">
            <div className="felx h-[92%] w-full overflow-y-auto scrollbar-thin pr-[1px] scrollbar-track-[#262626] scrollbar-thumb-[#525252] scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              <Editor
                width="100%"
                height="80%"
                // className="flex-grow-1"
                language={language.value}
                theme={theme}
                value={code}
                onChange={(newCode) => {
                  localStorage.setItem(
                    `${problemSlug}_${language.name}`,
                    newCode
                  );
                  setCode(newCode);
                }}
                options={{ minimap: { enabled: false } }}
              />
              <div className=" p-0 bg-[#282828] min-h-[21%]">
                <Testcases
                  testcaseData={testcaseData}
                  setTestcaseData={setTestcaseData}
                  status={status}
                  setStatus={setStatus}
                  expectedOutput={expectedOutput}
                  userOutput={userOutput}
                  stdOutput={stdOutput}
                  runError={runError}
                />
              </div>
            </div>
            <div className="mt-[1px] h-[8%] flex-none py-[10px] px-[20px] flex w-[100%] gap-3 justify-end bg-[#282828]">
              <div className="flex gap-2 ">
                <button
                  disabled={questionLoading || codeRunning}
                  className={`px-4 py-2 hover:bg-[#464646] rounded-[8px] 
                    ${
                      questionLoading || codeRunning
                        ? "bg-[#707070]"
                        : "bg-[#3d3d3d]"
                    }`}
                  onClick={() => handleRunCode(language, code, testcaseData)}
                >
                  Run
                </button>
                <button
                  disabled={questionLoading || codeRunning}
                  className={`py-2 px-4 hover:bg-[#4cc575] text-white rounded-md 
                    ${
                      questionLoading || codeRunning
                        ? "bg-[#69a37d]"
                        : "bg-[#2CBB5D]"
                    }`}
                  onClick={() => handleSubmit(language, code, testcaseData)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { CustEditor };
