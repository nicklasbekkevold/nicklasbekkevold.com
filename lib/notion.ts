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
import { z } from "zod";
import { environment, Environment } from "./environment";
import { renderNotionBlock } from "./notion_renderer";

const blogPostMetadataResponseSchema = z.object({
  id: z.string().uuid(),
  properties: z.object({
    tags: z.object({
      multi_select: z.array(z.object({ name: z.string() })).nonempty(),
    }),
    slug: z.object({
      rich_text: z.array(z.object({ plain_text: z.string() })).nonempty(),
    }),
    description: z.object({
      rich_text: z.array(z.object({ plain_text: z.string() })).nonempty(),
    }),
    author: z.object({
      rich_text: z.array(z.object({ plain_text: z.string() })).nonempty(),
    }),
    date: z.object({
      date: z.object({
        start: z.string().transform((startDate) => new Date(startDate)),
      }),
    }),
    headline: z.object({
      title: z.array(z.object({ plain_text: z.string() })).nonempty(),
    }),
  }),
});

type BlogPostMetadata = {
  id: string;
  tags: string[];
  slug: string;
  description: string;
  date: Date;
  headline: string;
};

type BlogPost = {
  metadata: BlogPostMetadata;
  html: JSX.Element[];
};

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

function parseBlogPostMetadata(
  rawBlogPostMetadataResponse: PageObjectResponse
): BlogPostMetadata | undefined {
  console.log(rawBlogPostMetadataResponse);
  try {
    const blogPostMetadataResponse = blogPostMetadataResponseSchema.parse(
      rawBlogPostMetadataResponse
    );
    if (!blogPostMetadataResponseSchema) return undefined;
    return {
      id: blogPostMetadataResponse.id,
      tags: blogPostMetadataResponse.properties.tags.multi_select.map(
        (tag) => tag.name
      ),
      slug: blogPostMetadataResponse.properties.slug.rich_text[0].plain_text,
      description:
        blogPostMetadataResponse.properties.description.rich_text[0].plain_text,
      date: blogPostMetadataResponse.properties.date.date.start,
      headline:
        blogPostMetadataResponse.properties.headline.title[0].plain_text,
    };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
    }
  }
  return undefined;
}

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
  BlogPostMetadata[] | undefined
> {
  try {
    const response = await notion.databases.query({
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
    });

    const posts = response.results as PageObjectResponse[];
    return posts.map(parseBlogPostMetadata).filter(Boolean);
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
  slug: string
): Promise<BlogPost | undefined> {
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
          },
          {
            or: getFilters(environment),
          },
        ],
      },
    });

    const blogPost = response.results[0] as PageObjectResponse;
    const metadata = parseBlogPostMetadata(blogPost);
    if (!metadata) return undefined;

    const blogPostBlocks = await fetchPageBlocks(blogPost.id);
    if (!blogPostBlocks) return undefined;
    const blogPostComponent = blogPostBlocks
      .map(renderNotionBlock)
      .filter(Boolean);

    return {
      metadata,
      html: blogPostComponent,
    };
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
  pageId: string
): Promise<BlockObjectResponse[] | undefined> {
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
