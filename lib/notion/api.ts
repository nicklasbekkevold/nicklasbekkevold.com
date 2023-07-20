import "server-only";

import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import { Environment, environment } from "../environment";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

function createFilter(environment: Environment, slug?: string) {
  const statusFilter = {
    or: [
      {
        property: "status",
        status: {
          equals: "Published",
        },
      },
    ],
  };
  if (environment !== "production") {
    statusFilter.or.push({
      property: "status",
      status: {
        equals: "Draft",
      },
    });
  }

  if (slug) {
    return {
      and: [
        {
          property: "slug",
          rich_text: {
            equals: slug,
          },
        },
        statusFilter,
      ],
    };
  }
  return statusFilter;
}

export async function fetchBlogPostMetadata(
  slug?: string
): Promise<PageObjectResponse[] | undefined> {
  try {
    return cache(async (slug?: string) => {
      return notion.databases
        .query({
          database_id: process.env.NOTION_BLOG_POST_ID as string,
          filter: createFilter(environment, slug),
          sorts: [
            {
              property: "date",
              direction: "descending",
            },
          ],
        })
        .then((response) => {
          return response.results as PageObjectResponse[];
        });
    })(slug);
  } catch (error: unknown) {
    console.error(error);
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
    console.error("Unknown error occurred while fetching blog post metadata.");
    return undefined;
  }
}

export async function fetchPageBlocks(
  pageId: string
): Promise<BlockObjectResponse[] | undefined> {
  try {
    return cache(async (pageId: string) => {
      return notion.blocks.children
        .list({ block_id: pageId })
        .then((res) => res.results as BlockObjectResponse[]);
    })(pageId);
  } catch (error: unknown) {
    console.error(error);
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
    console.error(
      `Unknown error occurred while fetching blog post with id ${pageId}.`
    );
    return undefined;
  }
}
