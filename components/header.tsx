import { ArrowRight, LayoutTemplate } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/thumbnail", label: "Thumbnail" },
  { href: "/shots", label: "Shots" },
  { href: "/collections", label: "Collections" },
];

export function Header() {
  return (
    <header className="z-40 w-full bg-white">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-6">
        <Link
          href="/"
          className="flex flex-1 items-center gap-2.5 text-[#111111]"
        >
          <LayoutTemplate className="h-4 w-4" />
          <span className="text-sm font-semibold tracking-tight">
            LazyLayers
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#666666] transition-colors hover:text-[#111111]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-5">
          <a
            href="https://github.com/ahmadrosid/lazylayers"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-medium text-[#666666] transition-colors hover:text-[#111111] sm:inline"
          >
            GitHub
          </a>
          <Link
            href="/thumbnail"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] transition-colors hover:text-[#666666]"
          >
            Open
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
