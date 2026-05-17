import { ArrowRight, LayoutTemplate } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/thumbnail", label: "Thumbnail" },
  { href: "/shots", label: "Shots" },
  { href: "/collections", label: "Collections" },
];

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b border-stone-900/10 bg-[#f6f0e7]/72 backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-stone-900">
          <LayoutTemplate className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-tight">
            LazyLayers
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ahmadrosid/lazylayers"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 sm:inline"
          >
            GitHub
          </a>
          <Link
            href="/thumbnail"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 transition-colors hover:text-stone-600"
          >
            Open
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
