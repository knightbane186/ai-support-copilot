"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/upload", label: "Upload" },
  { href: "/chat", label: "Chat" },
  { href: "/admin", label: "Admin" }
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="eyebrow">Document-grounded AI</span>
        <strong>AI Support Copilot</strong>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

