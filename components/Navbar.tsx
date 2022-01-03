import Link from 'next/link';

export const Navbar: React.FC = () => (
  <nav>
    <Link href="/">
      <a>
        <h1>Nicklas Bekkevold</h1>
      </a>
    </Link>
    <Link href="/projects">Projects</Link>
    <Link href="/blog">Blog</Link>
  </nav>
);
