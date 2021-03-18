import fs from 'fs';

import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styles from 'styles/components/Card.module.scss';

type Props = {
  slugs: string[];
};

const Blog: React.FC<Props> = ({
  slugs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardFront}>
            <h1>Concratulations!</h1>
            <h2>You have just found my secret blog.</h2>
          </div>
          <div className={styles.cardBack}>
            <h3>Blog posts so far:</h3>
            {slugs.map((slug) => {
              return (
                <div key={slug}>
                  <Link href={'/blog/' + slug}>
                    <a>{slug}</a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <Link href="/">
          <a>Return Home</a>
        </Link>
      </div>
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
