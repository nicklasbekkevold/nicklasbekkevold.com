"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

const navItems = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/blog",
    name: "blog",
  },
];

export default function NavBar() {
  let currentPath = usePathname() || "/";
  if (currentPath.includes("/blog/")) {
    currentPath = "/blog";
  }
  console.log(currentPath);

  return (
    <nav className={styles.navbar}>
      {navItems.map(({ path, name }) => {
        return (
          <Link
            key={path}
            href={path}
            className={path === currentPath ? styles.active : ""}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
