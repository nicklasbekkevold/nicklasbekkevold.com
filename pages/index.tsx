import Head from 'next/head';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <div className="container">
      <Head>
        <title>NB!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Your number 1 resource for information about Nicklas Bekkevold."
        />
      </Head>
      <main>
        <Link href="/blog">
          <a>Go to blog</a>
        </Link>
      </main>
    </div>
  );
}
