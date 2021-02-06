import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { InferGetStaticPropsType } from 'next';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';

const Post: React.FC<Props> = ({
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <pre>{contents}</pre>;
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

type Props = {
  contents: string;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context: GetStaticPropsContext
) => {
  let contents = '';
  if (context.params) {
    const { slug } = context.params;
    contents = fs.readFileSync(path.join('posts', slug + '.md')).toString();
  }
  return {
    props: {
      contents,
    },
  };
};

export default Post;
