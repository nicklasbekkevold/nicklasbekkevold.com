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
    <main className={styles.landing}>
      <section>
        <header>
          <h1>Projects</h1>
          <p>
            M.Sc. Computer Science at NTNU with specialization in Artificial
            Intelligence.
          </p>
        </header>
        {slugs.map((slug) => {
          return (
            <div key={slug}>
              <Link href={'/projects/' + slug}>
                <a>{slug}</a>
              </Link>
            </div>
          );
        })}
        <Link href="/">
          <a>Return Home</a>
        </Link>
        <footer>Copyright 2021.</footer>
      </section>
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
