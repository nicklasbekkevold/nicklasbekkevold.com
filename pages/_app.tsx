import { Layout } from 'components/Layout';
import { ThemeProvider } from 'next-themes';

import type { AppProps /*, AppContext */ } from 'next/app';

import 'styles/styles.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
