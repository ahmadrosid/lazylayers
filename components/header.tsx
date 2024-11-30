import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { LayoutTemplate } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="pl-8 pr-8 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <Link href={"/"}>
              <div className="text-black font-bold tracking-tight flex">
                <LayoutTemplate className="w-5 h-5 mr-2" />
                LazyLayers
              </div>
            </Link>

            <div className="px-4">
              <Link href={"/thumbnail"}>
                <Button size="sm" variant="ghost">
                  Thumbnail
                </Button>
              </Link>
              <Link href={"/logo"}>
                <Button size="sm" variant="ghost">
                  Logo
                </Button>
              </Link>
              <Link href={"/collections"}>
                <Button size="sm" variant="ghost">
                  Collections
                </Button>
              </Link>
              <Link href={"/shots"}>
                <Button size="sm" variant="ghost">
                  Shots
                </Button>
              </Link>
              <Button size="sm" variant="ghost" className="opacity-30">
                Carousel
              </Button>
            </div>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <a
              href="https://github.com/ahmadrosid/TitleCrafters"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "link" }),
                "gap-2 w-full justify-start"
              )}
            >
              <span>Sign in</span>
            </a>
            <Button size="sm" variant="secondary">
              Sign up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
