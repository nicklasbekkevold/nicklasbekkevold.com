import { Layout } from 'components/Layout';

import type { AppProps /*, AppContext */ } from 'next/app';

import 'styles/styles.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
