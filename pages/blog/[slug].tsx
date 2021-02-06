import fs from 'fs';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import matter from 'gray-matter';
import Head from 'next/head';
import marked from 'marked';

type Props = {
  htmlString: string;
  data: {
    [key: string]: string;
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Post: React.FC<Props> = ({
  htmlString,
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description}></meta>
      </Head>
      <main>
        <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('posts');

  return {
    paths: files.map((filename) => ({
      params: {
        slug: filename.replace('.md', ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context: GetStaticPropsContext
) => {
  let markdownWithMetadata = '';

  if (context.params) {
    const { slug } = context.params;
    markdownWithMetadata = fs
      .readFileSync(path.join('posts', slug + '.md'))
      .toString();
  }

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
