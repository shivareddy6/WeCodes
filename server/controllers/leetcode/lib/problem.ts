// import { resolve } from "path";
import Helper from "../utils/helper";
import {
  ProblemDifficulty,
  ProblemStatus,
  Uris,
  submit_status,
} from "../utils/interfaces";
import Submission from "./submission";

class Problem {
  static uris: Uris;

  static setUris(uris: Uris): void {
    Problem.uris = uris;
  }

  constructor(
    readonly slug: string,
    public id?: number,
    public title?: string,
    public difficulty?: ProblemDifficulty,
    public starred?: boolean,
    public locked?: boolean,
    public likes?: number,
    public dislikes?: number,
    public status?: ProblemStatus,
    public tag?: Array<string>,
    public totalAccepted?: number,
    public totalSubmission?: number,

    public sampleTestCase?: string,
    public content?: string,
    public codeSnippets?: Array<any>
  ) {}

  async detail(): Promise<Problem> {
    const response = await Helper.GraphQLRequest({
      query: `
                query getQuestionDetail($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                        questionId
                        title
                        difficulty
                        likes
                        dislikes
                        isLiked
                        isPaidOnly
                        stats
                        status
                        content
                        topicTags {
                            name
                        }
                        codeSnippets {
                            lang
                            langSlug
                            code
                        }
                        sampleTestCase
                    }
                }
            `,
      variables: {
        titleSlug: this.slug,
      },
    });
    const question = response.question;
    this.id = Number(question.questionId);
    this.title = question.title;
    this.difficulty = Helper.difficultyMap(question.difficulty);
    this.starred = question.isLiked !== null;
    this.locked = question.isPaidOnly;
    this.likes = question.likes;
    this.dislikes = question.dislikes;
    this.status = Helper.statusMap(question.status);
    this.tag = question.topicTags.map(function (t: any) {
      return t.name;
    });
    const stats: any = JSON.parse(question.stats);
    this.totalAccepted = stats.totalAcceptedRaw;
    this.totalSubmission = stats.totalSubmissionRaw;

    this.sampleTestCase = question.sampleTestCase;
    this.content = question.content;
    this.codeSnippets = question.codeSnippets;
    return this;
  }

  async getSubmissions(): Promise<Array<Submission>> {
    const submissions: Array<Submission> = [];
    let offet = 0;
    const limit = 20;
    let hasNext = true;
    while (hasNext) {
      const response = await Helper.GraphQLRequest({
        query: `
                query Submissions($offset: Int!, $limit: Int!, $questionSlug: String!) {
                    submissionList(offset: $offset, limit: $limit, questionSlug: $questionSlug) {
                        lastKey
                        hasNext
                        submissions {
                            id
                            statusDisplay
                            lang
                            runtime
                            timestamp
                            url
                            isPending
                            memory
                        }
                    }
                }
                `,
        variables: {
          offset: offet,
          limit: limit,
          questionSlug: this.slug,
        },
      });

      hasNext = response.submissionList.hasNext;
      const submission: Array<any> = response.submissionList.submissions;
      offet += submission.length;
      submission.map((s) => {
        submissions.push(
          new Submission(
            Number(s.id),
            s.isPending,
            s.lang,
            s.memory,
            s.runtime,
            Helper.submissionStatusMap(s.statusDisplay),
            Number(s.timestamp)
          )
        );
      });
    }
    return submissions;
  }

  async getSubmissionDetails(id: string): Promise<submit_status> {
    return new Promise((resolve, reject) => {
      var status: submit_status = { state: "NOT STARTED" },
        count = 0;
      const submitInterval = setInterval(async () => {
        const raw_status = await Helper.HttpRequest({
          url: Problem.uris.check.replace("$submission_id", id),
          //   url: `https://leetcode.com/submissions/detail/${id}/check/`,
          method: "GET",
        });
        status = JSON.parse(raw_status);
        // console.log(status, status.state);
        if (status.state === "SUCCESS" || count > 5) {
          clearInterval(submitInterval);
          resolve(status);
        }
        count++;
      }, 2000);
    });
  }

  async submit(lang: string, code: string): Promise<submit_status> {
    const raw_response = await Helper.HttpRequest({
      url: Problem.uris.submit.replace("$slug", this.slug),
      // url: `https://leetcode.com/problems/${this.slug}/submit/`,
      method: "POST",
      body: {
        lang: lang,
        question_id: this.id,
        typed_code: code,
      },
    });
    const response = JSON.parse(raw_response);

    const status: submit_status = await this.getSubmissionDetails(
      response.submission_id
    );
    // console.log(status);
    return status;
    // return res_status;
    // return new Submission(JSON.parse(response).submission_id);
  }

  async run(lang: string, code: string, input: string): Promise<submit_status> {
    const raw_response = await Helper.HttpRequest({
      url: Problem.uris.run.replace("$slug", this.slug),
      method: "POST",
      body: {
        data_input: input,
        lang: lang,
        question_id: this.id,
        typed_code: code,
      },
    });
    const response = JSON.parse(raw_response);

    const status: submit_status = await this.getSubmissionDetails(
      response.interpret_id
    );

    return status;
  }
}

export default Problem;
