import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);
