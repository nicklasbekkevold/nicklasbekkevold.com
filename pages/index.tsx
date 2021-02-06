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
      </Head>
      <main>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardFront}>
              <h1>Nicklas Bekkevold</h1>
              <p>Welcome to my personal space</p>
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
