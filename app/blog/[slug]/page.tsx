import { fetchBlogPost, fetchPageBlocks } from "@/lib/notion";
import { parseBlogPostMetadata } from "@/lib/notion_parser";
import { renderNotionBlock } from "@/lib/notion_renderer";

export const revalidate = 60;

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await fetchBlogPost(params.slug);
  const blogPostMetadata = parseBlogPostMetadata(blogPost);
  const blogPostContent = await fetchPageBlocks(blogPostMetadata?.id);
  const blogPostElements = blogPostContent
    ?.map(renderNotionBlock)
    .filter(Boolean);

  return (
    <main>
      <article className="wrapper flow">
        {!blogPostMetadata || !blogPostElements ? (
          <p>No blog post found</p>
        ) : (
          <>
            <h2>{blogPostMetadata.headline}</h2>
            <p>{blogPostMetadata.date.toLocaleDateString("no-NO")}</p>
            <p>{blogPostMetadata.tags.map((tag) => `#${tag} `)}</p>
            <>{blogPostElements}</>
          </>
        )}
      </article>
    </main>
  );
}
