import { getBlogPostMetadata } from "@/lib/blog_posts";
import Link from "next/link";
import styles from "./Blog.module.css";

export default async function Blog() {
  const blogPostMetadata = await getBlogPostMetadata();

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

        <section className={styles['blog-posts']}>
          {!blogPostMetadata ? (
            <p>No blog posts found</p>
          ) : (
            blogPostMetadata.map((metadata) => (
              <article key={metadata.id} className={styles['blog-post']}>
                <Link href={`/blog/${metadata.slug}`} className={styles['post-link']} />
                <h3>{metadata.headline}</h3>
                <p>{metadata.description}</p>
                <p>{metadata.date.toDateString()}</p>
                <ul>
                  {metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Link href={`/tag/${tag}`}>#{tag}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </section>
      </article>
    </main>
  );
}
