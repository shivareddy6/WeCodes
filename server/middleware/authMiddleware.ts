import express, { Express, Request, Response } from "express";
import { Credit } from "../controllers/leetcodeFuncs/interfaces";


export const checkAuth = async (req: Request, res: Response, next: any) => {
  console.log("inside check Auth");
  const leetcode_credits: Credit = {
    csrfToken:
      "dbJYX8gOf3gaLM75d1L7tfGwV09D2exZdYHMZx3t9QDMQwoS8dphK1BDEbYSl0i3",
    session:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDcwMjAyOSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNWJlMDM4ODA1NWE3ODQzNzg3NDBlMDQ0NzAyZTgwYTU3ODRmZGYyMCIsImlkIjo0NzAyMDI5LCJlbWFpbCI6ImdzbnJoeWQ2QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2hpdmFfbmFuZGEiLCJ1c2VyX3NsdWciOiJzaGl2YV9uYW5kYSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vczMtbGMtdXBsb2FkL2Fzc2V0cy9kZWZhdWx0X2F2YXRhci5qcGciLCJyZWZyZXNoZWRfYXQiOjE2ODM3ODI0NDEsImlwIjoiMjQwNToyMDE6YzAxMzo1ZDc0OmY4MTg6MzcxODoxNjg5OmQyY2QiLCJpZGVudGl0eSI6ImQ5YzU0NGQwYWFkZGZkMjBjMDUxYTA4MTFmMmYzODJkIiwic2Vzc2lvbl9pZCI6Mzg0NDI4MTIsIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.5BQIOd02D_F03Lr4oG51ri3d6PRJumxma0hwEfkJd_c",
  };
  // const leetcode: Leetcode = await Leetcode.build(
  //   "vaneesa-writes",
  //   "sunnyjanu3374",
  //   EndPoint.US
  // ); 
  // console.log(req);
  req.body.credits = leetcode_credits;
  next();
};
