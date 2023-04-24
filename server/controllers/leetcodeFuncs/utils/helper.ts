import { GraphQLClient } from "graphql-request";
import { Credit, GraphQLRequestOptions, HttpRequestOptions } from "../interfaces";
import { apiRoutes } from "../routes";

export const httpRequest = async (
  options: HttpRequestOptions,
  credit: Credit
) => {
  const response = await fetch(options.url, {
    method: options.method || "GET",
    headers: {
      Cookie: credit
        ? `LEETCODE_SESSION=${credit.session};csrftoken=${credit.csrfToken}`
        : "",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": credit ? credit.csrfToken : "",
      Referer: apiRoutes.base,
    },
    body: JSON.stringify(options.body) || undefined,
  });

  return response.json();
};

export const graphQLRequest  = async (options: GraphQLRequestOptions, credit: Credit) => {
    const client = new GraphQLClient(
        apiRoutes.graphql,
        {
            headers: {
                Origin: options.origin || apiRoutes.base,
                Referer: options.referer || apiRoutes.base,
                Cookie: `LEETCODE_SESSION=${credit.session};csrftoken=${credit.csrfToken};`,
                "X-Requested-With": 'XMLHttpRequest',
                "X-CSRFToken": credit.csrfToken,
            }
        }
    );
    return await client.request(
        options.query,
        options.variables || {},
    );
}