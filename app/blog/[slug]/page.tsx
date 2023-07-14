import { fetchBlogPost } from "@/lib/notion";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPost(params.slug);

  return (
    <main>
      <article className="wrapper flow">
        {!post ? (
          <p>No blog post found</p>
        ) : (
          <>
            <h2>{post.metadata.headline}</h2>
            <p>{post.metadata.date.toLocaleDateString("no-NO")}</p>
            <p>{post.metadata.tags.map((tag) => `#${tag} `)}</p>
            <ReactMarkdown>{post.markdown}</ReactMarkdown>
          </>
        )}
      </article>
    </main>
  );
}
