import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";

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

export type BlogPostMetadata = {
  id: string;
  tags: string[];
  slug: string;
  description: string;
  date: Date;
  headline: string;
};

export function parseBlogPostMetadata(
  rawBlogPostMetadataResponse: PageObjectResponse
): BlogPostMetadata | undefined {
  try {
    const blogPostMetadataResponse = blogPostMetadataResponseSchema.parse(
      rawBlogPostMetadataResponse
    );
    if (!blogPostMetadataResponseSchema) return;
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
  return;
}
