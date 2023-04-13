import React, { useState } from "react";
import { CustEditor } from "../Editor";
import QuestionDisplay from "../QuestionDisplay";
import Split from "react-split-grid";
import "./styles.css";

const Room = () => {
  const [problemSlug, setProblemSlug] = useState("valid-parentheses");
  const [problems, setProblems] = useState([
    "valid-parentheses",
    "largest-color-value-in-a-directed-graph",
    "valid-parentheses",
    "largest-color-value-in-a-directed-graph",
  ]);
  return (
    <div className="flex-1">
      <Split
        // snapOffset={150}
        // minSize={}
        render={({ getGridProps, getGutterProps }) => (
          <div className="room-grid h-[100%] pt-2" {...getGridProps()}>
            <QuestionDisplay
              problemSlug={problemSlug}
              problems={problems}
              setProblemSlug={setProblemSlug}
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
            <CustEditor problemSlug={problemSlug} />
            <div
              className="gutter flex justify-center items-center gutter-vertical"
              {...getGutterProps("column", 3)}
            >
              <img
                src="https://split.js.org/vertical.png"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div />
          </div>
        )}
      />
    </div>
  );
};

export default Room;
