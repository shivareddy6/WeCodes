import React from "react";

const Testcases = ({
  testcases = "test1\n1 2 3 4\ntest2\n3 2 1 5",
  status = "none",
}) => {
//   console.log(testcases);

  return (
    <div className="p-2 flex flex-col gap-2 justify-between">
        <div className="w-full rounded-md p-3">
            Status: {status}
        </div>
      <p className="text-lg font-semibold ">Test Cases:</p>
      <div className="test-cases w-full bg-[#1a1a1a] p-2 border-[1px] border-[#525252] rounded-md">
        <pre>{testcases}</pre>
        <pre>{testcases}</pre>
        <pre>{testcases}</pre>
      </div>
    </div>
  );
};

export default Testcases;
