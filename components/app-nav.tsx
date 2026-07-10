import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/thumbnail", label: "Thumbnail" },
  { href: "/shots", label: "Shots" },
  { href: "/collections", label: "Collections" },
];

export function AppNav() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-white">
      <div className="flex h-11 items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[#111111]"
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          <span className="text-sm font-medium tracking-tight">LazyLayers</span>
        </Link>

        <nav className="flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-white font-medium text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                    : "text-[#666666] hover:text-[#111111]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
