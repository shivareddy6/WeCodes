import express, { Express, Request, Response } from "express";
import { checkAuth } from "../middleware/authMiddleware";
import { Credit } from "../controllers/leetcode/utils/interfaces";
import Leetcode from "../controllers/leetcode";
import Problem from "../controllers/leetcode/lib/problem";
import { NewProblem } from "../controllers/leetcodeFuncs/lib/problem";

const leetcodeRoutes = express.Router();

leetcodeRoutes.get(
  "/problems",
  checkAuth,
  async (req: Request, res: Response) => {
    const leetcode_credits: Credit = req.body.credits;
    const leetcode: Leetcode = new Leetcode(leetcode_credits);
    res.send(await leetcode.getAllProblems());
  }
);

leetcodeRoutes.get(
  "/problem/:slug",
  checkAuth,
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { credits } = req.body;
    // console.log(slug);
    // console.log(req.params);
    const problem = new NewProblem(slug, credits);
    const problemDetails: any = await problem.getDetails();
    const snippets: any = await problem.getSnippets();
    problemDetails["snippets"] = snippets;
    // console.log(problemDetails);
    res.send(problemDetails);
  }
);

leetcodeRoutes.post(
  "/run-code",
  checkAuth,
  async (req: Request, res: Response) => {
    //   res.send('Express + TypeScript Server');
    const leetcode_credits: Credit = req.body.credits;
    const { slug, code, language, input } = req.body;
    console.log(code, language, input);
    const problem = new NewProblem(slug, leetcode_credits);

    // Show problem content, test case, code snippet etc

    // submit your answer
    // const details = await problem.runCode(
    //   "cpp",
    //   "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        for(int i = 0;i < nums.size();i++){\n            for(int j = i+1;j<nums.size();j++){\n            if(nums[i] + nums[j] == target) return {i,j};\n          }\n        }\n    return {};\n    }\n};",
    //   "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6\n[2,7,11,15,16]\n9"
    // );

    const details = await problem.runCode(language, code, input);
    console.log("details sent");
    res.send(details);
  }
);

leetcodeRoutes.post(
  "/submit-code",
  checkAuth,
  async (req: Request, res: Response) => {
    const leetcode_credits: Credit = req.body.credits;
    const { slug, code, language, input } = req.body;
    console.log(code, language, input);
    const problem = new NewProblem(slug, leetcode_credits);

    // Show problem content, test case, code snippet etc

    // submit your answer
    // const details = await problem.runCode(
    //   "cpp",
    //   "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        for(int i = 0;i < nums.size();i++){\n            for(int j = i+1;j<nums.size();j++){\n            if(nums[i] + nums[j] == target) return {i,j};\n          }\n        }\n    return {};\n    }\n};",
    //   "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6\n[2,7,11,15,16]\n9"
    // );

    const details = await problem.submitCode(language, code, input);
    console.log("details sent");
    res.send(details);
  }
);

export { leetcodeRoutes };
