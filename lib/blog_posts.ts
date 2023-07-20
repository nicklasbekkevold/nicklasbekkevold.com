import { fetchBlogPostMetadata, fetchPageBlocks } from "./notion/api";
import {
  BlogPostMetadata,
  parseBlogPostMetadata,
} from "./notion/notion_parser";
import { renderNotionBlock } from "./notion/notion_renderer";

export type BlogPost = {
  metadata: BlogPostMetadata;
  content: JSX.Element[];
};

export async function getBlogPostMetadata(): Promise<
  BlogPostMetadata[] | undefined
> {
  const blogPostMetadataResponse = await fetchBlogPostMetadata();
  return blogPostMetadataResponse?.map(parseBlogPostMetadata).filter(Boolean);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const blogPostMetadataResponse = await fetchBlogPostMetadata(slug);
  const blogPostMetadata = blogPostMetadataResponse
    ?.map(parseBlogPostMetadata)
    .filter(Boolean)[0];
  if (!blogPostMetadata) return;

  const blogPostContentResponse = await fetchPageBlocks(blogPostMetadata.id);
  const blogPostContent = blogPostContentResponse
    ?.map(renderNotionBlock)
    .filter(Boolean);
  if (!blogPostContent) return;

  return {
    metadata: blogPostMetadata,
    content: blogPostContent,
  };
}
