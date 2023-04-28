import express, { Express, Request, Response } from "express";
import { checkAuth } from "../middleware/authMiddleware";
import { NewProblem } from "../controllers/leetcodeFuncs/lib/problem";
import { getAllProblems } from "../controllers/leetcodeFuncs";
import { Credit } from "../controllers/leetcodeFuncs/interfaces";

const leetcodeRoutes = express.Router();

leetcodeRoutes.get(
  "/problems",
  checkAuth,
  async (req: Request, res: Response) => {
    const leetcode_credits: Credit = req.body.credits;
    res.send(await getAllProblems(leetcode_credits));
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

    const details = await problem.submitCode(language, code, input);
    console.log("details sent");
    res.send(details);
  }
);

export { leetcodeRoutes };
