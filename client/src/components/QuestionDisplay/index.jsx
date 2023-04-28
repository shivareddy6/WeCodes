import React, { useEffect, useState } from "react";
import "./styles.css";
import ReactHtmlParser from "react-html-parser";
import "./leetcode-display.css";
import DisplayTags from "./displayTags";
import Dropdown from "../Dropdown";

const QuestionDisplay = ({
  problemSlug,
  problems,
  setProblemSlug,
  questionLoading,
  setQuestionLoading,
}) => {
  const [display, setDisplay] = useState("<strong>Loading...</strong>");
  // const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  // const [snippets, setSnippets] = useState({});
  useEffect(() => {
    const loadData = async () => {
      setQuestionLoading(true);
      fetch(`http://localhost:8080/leetcode/problem/${problemSlug}/`, {
        method: "GET",
      })
        .then(async (res) => {
          // console.log("inside fetch");
          const newDisplay = await res.json();
          // console.log(newDisplay);
          setTags(newDisplay.tags);
          setDisplay(newDisplay.content);
          // const newSnippets = {};
          // newDisplay.snippets.map(
          //   (snippet) => (newSnippets[snippet.lang] = snippet.code)
          // );
          // // console.log(newSnippets)
          // setSnippets(newSnippets);
          setTitle(newDisplay.id + ". " + newDisplay.title);
          setDifficulty(newDisplay.difficulty);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setQuestionLoading(false));
    };
    loadData();
  }, [problemSlug]);

  // useEffect(() => console.log("question", questionLoading), [questionLoading]);

  const GetDifficulty = ({ difficulty }) => {
    const styles = {
      borderRadius: "21px",
      padding: "4px 10px",
      fontWeight: "bold",
      height: "30px",
      // margin: "5px"
    };
    if (difficulty === "Easy") {
      return (
        <p
          style={{
            ...styles,
            background: "#223d3a",
            color: "#00b8e3",
          }}
        >
          Easy
        </p>
      );
    } else if (difficulty === "Medium") {
      return (
        <p
          style={{
            ...styles,
            background: "#483f26",
            color: "ffc01e",
          }}
        >
          Medium
        </p>
      );
    } else {
      return (
        <p
          style={{
            ...styles,
            background: "#482a30",
            color: "#ff375f",
          }}
        >
          Hard
        </p>
      );
    }
  };

  // console.log(problems);

  return (
    <div className="flex flex-col gap-0">
      {/* <div className="questions-menu flex gap-5 justify-between max-w-[330px] px-2 h-[41px]">
        {problems.map((problem) => (
          <button className={problem === problemSlug && "bg-[#282828]"}>
            {problem}
          </button>
        ))}
      </div> */}
      <div className="py-[4px] h-[42px]">
        <Dropdown
          options={problems}
          placeholder={problems[0]}
          onChange={(newProblem) => setProblemSlug(newProblem)}
          disabled={questionLoading}
        />
      </div>
      <div className="bg-[#282828] relative w-[100%] flex-1">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 overflowy-scroll break-words p-4"
          style={{ overflowY: "auto" }}
        >
          {questionLoading === false ? (
            <>
              <div className="title-container pb-2 flex gap-3">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "17px",
                    lineHeight: "28px",
                  }}
                >
                  {title}
                </p>
                <GetDifficulty difficulty={difficulty} />
              </div>
              <div className="problem">{ReactHtmlParser(display)}</div>
              <div>
                <DisplayTags tags={tags} />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <strong className="">Loading...</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
