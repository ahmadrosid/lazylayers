import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import { Header } from "@/components/header";
import {
  ArrowRight,
  FolderOpen,
  ImageIcon,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";

type Tool = {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

const tools: Tool[] = [
  {
    title: "Thumbnail",
    description: "Create cover images with type, gradients, and frames.",
    href: "/thumbnail",
    Icon: LayoutTemplate,
    iconBg: "bg-[#FFF4E5]",
    iconColor: "text-[#D97706]",
  },
  {
    title: "Shots",
    description: "Frame product shots and social visuals.",
    href: "/shots",
    Icon: ImageIcon,
    iconBg: "bg-[#E8F1FF]",
    iconColor: "text-[#2563EB]",
  },
  {
    title: "Collections",
    description: "Collect inspiring thumbnail from any YouTube link.",
    href: "/collections",
    Icon: FolderOpen,
    iconBg: "bg-[#E8F8F0]",
    iconColor: "text-[#059669]",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>LazyLayers - Slick Covers Without the Overhead</title>
        <link rel="canonical" href={"https://lazylayers.ahmadrosid.com/"} />
        <meta property="og:url" content="https://lazylayers.ahmadrosid.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="LazyLayers - Slick Covers Without the Overhead"
        />
        <meta
          property="og:image:alt"
          content="LazyLayers - Slick Covers Without the Overhead"
        />
        <meta
          property="og:description"
          content="Build thumbnails, shots, and creative collections from one focused workspace."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png"
        />
      </Head>
      <Header />
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white text-[#111111]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(99, 130, 255, 0.09) 0%, transparent 72%)",
          }}
        />

        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[38%] opacity-[0.45]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(17, 17, 17, 0.055) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to right, black 20%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 20%, transparent 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[48%] opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(at 82% 18%, rgba(99, 130, 255, 0.07) 0%, transparent 42%),
              radial-gradient(at 68% 52%, rgba(147, 197, 253, 0.05) 0%, transparent 38%),
              radial-gradient(at 90% 78%, rgba(191, 219, 254, 0.04) 0%, transparent 32%)
            `,
            maskImage: "linear-gradient(to left, black 15%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 15%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-6">
          <section className="flex flex-1 flex-col items-center justify-center pb-20 pt-28 text-center sm:pt-32 lg:pt-36">
            <h1 className="max-w-4xl text-[3.5rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[5.75rem]">
              LazyLayers
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#666666] sm:text-xl">
              A small workspace for thumbnails, shots, and saved references. No
              sign-in, no bloat — just open and make something.
            </p>

            <Link href="/thumbnail" className="mt-10">
              <Button
                size="lg"
                className="h-12 rounded-full bg-[#111111] px-8 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(17,17,17,0.18)] transition-all hover:bg-[#222222] hover:shadow-[0_12px_32px_rgba(17,17,17,0.22)]"
              >
                Start with Thumbnail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </section>

          <section className="pb-28">
            <div className="grid gap-5 md:grid-cols-3">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex min-h-[240px] flex-col rounded-[22px] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),0_24px_56px_rgba(0,0,0,0.08)] sm:p-10"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${tool.iconBg}`}
                  >
                    <tool.Icon className={`h-5 w-5 ${tool.iconColor}`} />
                  </div>

                  <h2 className="mt-8 text-lg font-semibold tracking-tight text-[#111111]">
                    {tool.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#666666]">
                    {tool.description}
                  </p>

                  <div className="mt-auto flex justify-end pt-10">
                    <ArrowRight className="h-4 w-4 text-[#AAAAAA] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#666666]" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <footer className="flex flex-col items-center gap-3 pb-12 text-sm text-[#666666]">
            <a
              href="https://github.com/ahmadrosid/lazylayers"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#111111]"
            >
              GitHub
            </a>
            <span>&copy; {new Date().getFullYear()} LazyLayers</span>
          </footer>
        </div>
      </main>
    </>
  );
}
