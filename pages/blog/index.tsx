import fs from 'fs';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from 'styles/Landing.module.scss';

type Props = {
  slugs: string[];
};

const Blog: React.FC<Props> = ({
  slugs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <section className={styles.landing}>
      <header>
        <h1>Projects</h1>
        <p>Congratualtions! You just found my secret blog.</p>
      </header>
      {slugs.map((slug) => {
        return (
          <div key={slug}>
            <Link href={'/blog/' + slug}>
              <a>{slug}</a>
            </Link>
          </div>
        );
      })}
      <Link href="/">
        <a>Return Home</a>
      </Link>
    </section>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = fs.readdirSync('posts');

  return {
    props: {
      slugs: files.map((filename) => filename.replace('.mdx', '')),
    },
  };
};

export default Blog;
