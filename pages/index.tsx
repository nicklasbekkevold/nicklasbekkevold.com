import Head from 'next/head';
import styles from 'styles/Landing.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>NB!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Your number 1 resource for information about Nicklas Bekkevold."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@nicklasbekk" key="twhandle" />

        {/* Open Graph */}
        <meta key="og:type" name="og:type" content="website" />
        <meta
          key="og:title"
          name="og:title"
          content="Home | Nicklas Bekkevold"
        />
        <meta
          key="og:description"
          name="og:description"
          content="Your number 1 resource for information about Nicklas Bekkevold."
        />
        <meta
          key="og:url"
          name="og:url"
          content="https://nicklasbekkevold.com"
        />
        <meta
          key="og:image"
          name="og:image"
          content="/images/profile_capra.jpg"
        />
      </Head>
      <main className={styles.landing}>
        <section>
          <header>
            <h1>Nicklas Bekkevold</h1>
            <p>
              M.Sc. Computer Science at NTNU with specialization in Artificial
              Intelligence.
            </p>
          </header>
          <nav>
            <ul>
              <li>
                <a href="/projects">Projects</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
            </ul>
          </nav>
          <p>A text about me</p>
          <footer>Copyright 2021.</footer>
        </section>
      </main>
    </>
  );
}
