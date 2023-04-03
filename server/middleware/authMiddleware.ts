import express, { Express, Request, Response } from "express";
import { Credit, EndPoint } from "../controllers/leetcode/utils/interfaces";
import Leetcode from "../controllers/leetcode";

export const checkAuth = async (req: Request, res: Response, next: any) => {
  console.log("inside check Auth");
  const leetcode_credits: Credit = {
    csrfToken:
      "8VsvkkjHvi8iqJ7na5JeSz9v2g0qPxbp1ORGDz0jOM4w080Ntwd65h0HaknQc9mz",
    session:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiODEwMTkwMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiYTFmMjNlMzM0MTNmNmY2NmM0MTkzMWY1OWI1MWE3ZTkzNjZiMTU5ZCIsImlkIjo4MTAxOTAzLCJlbWFpbCI6IjIwYmQxYTY2MjVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2YW5lZXNhLXdyaXRlcyIsInVzZXJfc2x1ZyI6InZhbmVlc2Etd3JpdGVzIiwiYXZhdGFyIjoiaHR0cHM6Ly9zMy11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zMy1sYy11cGxvYWQvYXNzZXRzL2RlZmF1bHRfYXZhdGFyLmpwZyIsInJlZnJlc2hlZF9hdCI6MTY4MDQ0Njc5OCwiaXAiOiIyNDAxOjQ5MDA6MWMyNzpiMWU3OjM0NzE6NGYzYzplNjFiOmU3N2YiLCJpZGVudGl0eSI6ImMzZmNkOWU1MmZkNzc1YzQzYzk1NTNhOTYxYmZjNTJjIiwic2Vzc2lvbl9pZCI6Mzc1MDk2OTIsIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.QTfwXGAehMdGkPBrC3lmRUoA929ieToMyZF1sLi-9nU",
  };
  const leetcode: Leetcode = await Leetcode.build(
    "vaneesa-writes",
    "sunnyjanu3374",
    EndPoint.US
  );
  console.log(leetcode);
  req.body.credits = leetcode_credits;
  next();
};
