import { fetchBlogPostMetadata } from "@/lib/notion";
import { parseBlogPostMetadata } from "@/lib/notion_parser";
import Link from "next/link";

export default async function Blog() {
  const blogPosts = await fetchBlogPostMetadata();
  const blogPostMetadata = blogPosts
    ?.map(parseBlogPostMetadata)
    .filter(Boolean);

  return (
    <main>
      <article className="wrapper flow">
        <h2>Blog</h2>
        <p>
          <strong>Donec</strong> malesuada tellus sed scelerisque sodales.
          Vestibulum in risus ornare, venenatis ante a, ullamcorper dui. Donec
          suscipit, elit ac condimentum interdum, diam nibh iaculis odio, et
          fringilla neque ex a nisl. Nullam lectus felis, eleifend et consequat
          sed, rhoncus eget nisl. Maecenas consectetur faucibus placerat.
          Maecenas pellentesque neque posuere nisl tincidunt consequat. Quisque
          quis ex mauris. Vivamus vulputate ligula eget mattis aliquet. Ut
          viverra molestie neque ac dapibus. Nam tempor malesuada est, sed
          feugiat eros gravida eget. Maecenas quis facilisis nunc, quis
          scelerisque justo. Aliquam pulvinar malesuada purus, imperdiet feugiat
          dolor placerat vitae. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </p>

        {!blogPostMetadata ? (
          <p>No blog posts found</p>
        ) : (
          blogPostMetadata.map((blogPost) => (
            <Link href={`/blog/${blogPost.slug}`} key={blogPost.id}>
              <div>
                <h3>{blogPost.headline}</h3>
                <p>{blogPost.description}</p>
                <p>{blogPost.date.toDateString()}</p>
                <p>tags:</p>
                <ul>
                  {blogPost.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        )}
      </article>
    </main>
  );
}
