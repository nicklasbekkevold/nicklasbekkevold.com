import fs from 'fs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

type Props = {
  slugs: string[];
};

const Blog: React.FC<Props> = ({
  slugs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <h1>Concratulations!</h1>
      <h2>You have just found my secret blog.</h2>
      <p>Blog posts:</p>
      {slugs.map((slug) => {
        return (
          <div key={slug}>
            <Link href={'/blog/' + slug}>
              <a>{slug}</a>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = fs.readdirSync('posts');

  return {
    props: {
      slugs: files.map((filename) => filename.replace('.md', '')),
    },
  };
};

export default Blog;
