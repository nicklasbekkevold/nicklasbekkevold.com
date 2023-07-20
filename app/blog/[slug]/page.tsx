import { getBlogPost } from "@/lib/blog_posts";

export const revalidate = 60;

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blogPost = await getBlogPost(params.slug);

  return (
    <main>
      <article className="wrapper flow">
        {!blogPost ? (
          <p>No blog post found</p>
        ) : (
          <>
            <h2>{blogPost.metadata.headline}</h2>
            <p>{blogPost.metadata.date.toLocaleDateString("no-NO")}</p>
            <p>{blogPost.metadata.tags.map((tag) => `#${tag} `)}</p>
            <>{blogPost.content}</>
          </>
        )}
      </article>
    </main>
  );
}
