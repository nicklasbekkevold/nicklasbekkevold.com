import "server-only";

import {
  Client,
  isNotionClientError,
  ClientErrorCode,
  APIErrorCode,
} from "@notionhq/client";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { environment, Environment } from "./environment";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

function getFilters(environment: Environment) {
  const filters = [
    {
      property: "status",
      status: {
        equals: "Published",
      },
    },
  ];
  if (environment !== "production") {
    filters.push({
      property: "status",
      status: {
        equals: "Draft",
      },
    });
  }
  return filters;
}

export async function fetchBlogPostMetadata(): Promise<
  PageObjectResponse[] | undefined
> {
  try {
    return await notion.databases
      .query({
        database_id: process.env.NOTION_BLOG_POST_ID as string,
        filter: {
          or: getFilters(environment),
        },
        sorts: [
          {
            property: "date",
            direction: "descending",
          },
        ],
      })
      .then((response) => response.results as PageObjectResponse[]);
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("Notion RequestTimeout");
          break;
        case APIErrorCode.ObjectNotFound:
          console.error("Notion ObjectNotFound");
          break;
        case APIErrorCode.Unauthorized:
          console.error("Notion Unauthorized");
          break;
        case APIErrorCode.ValidationError:
          console.error("Notion ValidationError");
          break;
        default:
          console.error("Unknown Notion error");
      }
    }
    return undefined;
  }
}

export async function fetchBlogPost(
  slug: string | undefined
): Promise<PageObjectResponse | undefined> {
  if (!slug) return;
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_POST_ID as string,
      filter: {
        or: [...getFilters(environment)],
        and: [
          {
            property: "slug",
            rich_text: {
              equals: slug,
            },
            {
              or: getFilters(environment),
            },
          ],
        },
      })
      .then((response) => response.results[0] as PageObjectResponse);
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("Notion RequestTimeout");
          break;
        case APIErrorCode.ObjectNotFound:
          console.error("Notion ObjectNotFound");
          break;
        case APIErrorCode.Unauthorized:
          console.error("Notion Unauthorized");
          break;
        case APIErrorCode.ValidationError:
          console.error("Notion ValidationError");
          break;
        default:
          console.error("Unknown Notion error");
      }
    }
    return undefined;
  }
}

export async function fetchPageBlocks(
  pageId: string | undefined
): Promise<BlockObjectResponse[] | undefined> {
  if (!pageId) return;
  try {
    return notion.blocks.children
      .list({ block_id: pageId })
      .then((res) => res.results as BlockObjectResponse[]);
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          console.error("Notion RequestTimeout");
          break;
        case APIErrorCode.ObjectNotFound:
          console.error("Notion ObjectNotFound");
          break;
        case APIErrorCode.Unauthorized:
          console.error("Notion Unauthorized");
          break;
        case APIErrorCode.ValidationError:
          console.error("Notion ValidationError");
          break;
        default:
          console.error("Unknown Notion error");
      }
    }
    return undefined;
  }
}
