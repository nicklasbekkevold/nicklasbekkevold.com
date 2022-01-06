import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from 'styles/components/Navbar.module.scss';

export const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  console.log(resolvedTheme);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a>
          <h1>Nicklas Bekkevold</h1>
        </a>
      </Link>
      <Link href="/projects">Projects</Link>
      <Link href="/blog">Blog</Link>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? 'L' : 'D'}
      </button>
    </nav>
  );
};
