import express, { Express, Request, Response } from "express";
import { Credit } from "../controllers/leetcodeFuncs/interfaces";


export const checkAuth = async (req: Request, res: Response, next: any) => {
  console.log("inside check Auth");
  const leetcode_credits: Credit = {
    csrfToken:
      "xi5Bz9q5ynFPJYRXKoWGl3JRChRVfhTcAv04TOP4bdYFzBSnv5d1O5m9NZy8ED7s",
    session:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDcwMjAyOSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNTgzOTA4OTdhNjJmYjg5ZWMyNGE5N2RjYzM3OWEwNmJmNDdjYWMwNGNkNjYxOGViNTE1NzU1MjJkMjJlZTA1NCIsImlkIjo0NzAyMDI5LCJlbWFpbCI6ImdzbnJoeWQ2QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2hpdmFfbmFuZGEiLCJ1c2VyX3NsdWciOiJzaGl2YV9uYW5kYSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vczMtbGMtdXBsb2FkL2Fzc2V0cy9kZWZhdWx0X2F2YXRhci5qcGciLCJyZWZyZXNoZWRfYXQiOjE3MDI5NjA1OTksImlwIjoiMTgzLjgyLjExNS4yIiwiaWRlbnRpdHkiOiJlM2Y4MTAxYzQxYjQwNTcyOTczMjI3ZDBhNjQ2MjBkMCIsInNlc3Npb25faWQiOjQ4Nzk4NzEwLCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.TY2HWVTuXl1Kc6dATJXJ-CIubYGLxVmQLlfw9azHrxo",
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
