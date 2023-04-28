import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { leetcodeRoutes } from "./routes/leetcodeRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:8080",
  preflightContinue: false,
};
app.use(cors());


app.use("/leetcode", leetcodeRoutes);

app.listen(port, (): void => {
  console.log(`Server is running at http://localhost:${port}`);
});

/*
 
// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""

{
   status_code: 11,
   lang: 'cpp',
   run_success: true,
   status_runtime: 'N/A',
   memory: 10180000,
   question_id: 1,
   elapsed_time: 431,
   compare_result: '000001000000000000000000000000000000000000000000000000000',
   code_output: '[]',
   std_output: '',
   last_testcase: '[2,7,11,15]\n9',
   expected_output: '[0,1]',
   task_finish_time: 1680349972269,
   total_correct: 1, ----------
   total_testcases: 57, ----------
   runtime_percentile: null,
   status_memory: 'N/A',
   memory_percentile: null,
   pretty_lang: 'C++',
   submission_id: '925872868',
   input_formatted: '[2,7,11,15], 9',
   input: '[2,7,11,15]\n9', ----------
   status_msg: 'Wrong Answer', ------------
   state: 'SUCCESS'
}


{
   status_code: 10,
   lang: 'cpp',
   run_success: true,
   status_runtime: '381 ms',
   memory: 10216000,
   question_id: 1,
   elapsed_time: 394,
   compare_result: '111111111111111111111111111111111111111111111111111111111',
   code_output: '',
   std_output: '',
   last_testcase: '',
   expected_output: '',
   task_finish_time: 1680350584873,
   total_correct: 57,
   total_testcases: 57,
   runtime_percentile: 42.57299999999996,
   status_memory: '10.2 MB',
   memory_percentile: 73.7288,
   pretty_lang: 'C++',
   submission_id: '925876801',
   status_msg: 'Accepted',
   state: 'SUCCESS'
 }


*/
