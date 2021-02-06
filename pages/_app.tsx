import type { AppProps /*, AppContext */ } from 'next/app';
import 'styles/styles.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
