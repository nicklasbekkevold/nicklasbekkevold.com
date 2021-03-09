import Avatar from 'components/Avatar';
import Head from 'next/head';
import styles from 'styles/components/Card.module.scss';

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
      <main>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardFront}>
              <h1>Nicklas Bekkevold</h1>
              <p>Welcome to my personal space</p>
              <p>(Yes, this site is under maintenence.)</p>
              <Avatar />
            </div>
            <div className={styles.cardBack}>
              <h2>Contact information</h2>
              <p>E-mail: nicklasbekkevold(at)gmail.com</p>
              <p>Mobile: +47 948 91 868</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
