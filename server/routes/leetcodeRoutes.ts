import express, { Express, Request, Response } from "express";
import { checkAuth } from "../middleware/authMiddleware";
import { Credit } from "../controllers/leetcode/utils/interfaces";
import Leetcode from "../controllers/leetcode";
import Problem from "../controllers/leetcode/lib/problem";

const leetcodeRoutes = express.Router();

leetcodeRoutes.get(
  "/run-code",
  checkAuth,
  async (req: Request, res: Response) => {
    //   res.send('Express + TypeScript Server');
    const leetcode_credits: Credit = req.body.credits;
    const leetcode: Leetcode = new Leetcode(leetcode_credits);
    const problem: Problem = new Problem("two-sum");

    // Fetch more properties of this problem
    await problem.detail();

    // Show problem content, test case, code snippet etc

    // submit your answer
    const details = await problem.run(
      "cpp",
      "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        for(int i = 0;i < nums.size();i++){\n            for(int j = i+1;j<nums.size();j++){\n            if(nums[i] + nums[j] == target) return {i,j};\n          }\n        }\n    return {};\n    }\n};",
      "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6\n[2,7,11,15,16]\n9"
    );
    console.log("details sent");
    res.send(details);
  }
);

leetcodeRoutes.post(
  "/submit-code",
  checkAuth,
  async (req: Request, res: Response) => {
    //   res.send('Express + TypeScript Server');
    const {lang, code} = req.body;
    const leetcode_credits: Credit = req.body.credits;
    const leetcode: Leetcode = new Leetcode(leetcode_credits);
    const problem: Problem = new Problem("two-sum");

    // Fetch more properties of this problem
    await problem.detail();

    // Show problem content, test case, code snippet etc

    // submit your answer
    const details = await problem.submit(
      lang,
      code
    );
    console.log("details sent");
    res.send(details);
  }
);

export { leetcodeRoutes };
