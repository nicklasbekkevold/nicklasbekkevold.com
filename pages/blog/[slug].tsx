import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';

import matter from 'gray-matter';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogPosting, WithContext } from 'schema-dts';

type Props = {
  mdxSource: MDXRemoteSerializeResult;
  data: {
    [key: string]: string;
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

const Post: React.FC<Props> = ({
  mdxSource,
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const schemaData: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nicklasbekkevold.com/blog/${router.asPath}`,
    },
    // image: [
    //   '',
    //   '',
    //   '',
    // ],
    headline: data.title,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
  };

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description}></meta>
      </Head>
      <article>
        <MDXRemote {...mdxSource} />
      </article>
      <Link href="/">
        <a>Return Home</a>
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('posts');

  return {
    paths: files.map((filename) => ({
      params: {
        slug: filename.replace('.mdx', ''),
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
      .readFileSync(path.join('posts', slug + '.mdx'))
      .toString();
  }

  const parsedMarkdown = matter(markdownWithMetadata);
  const mdxSource = await serialize(parsedMarkdown.content);

  return {
    props: {
      mdxSource,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
