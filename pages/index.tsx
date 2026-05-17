import demoImage from "../demo.png";
import Image from "next/image";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FolderOpen,
  ImageIcon,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"] });
const display = Playfair_Display({ subsets: ["latin"] });

const studioSurfaces = [
  {
    title: "Thumbnail Studio",
    description:
      "Shape a cover fast with bold type, gradients, frames, and an export-ready canvas.",
    href: "/thumbnail",
    eyebrow: "Build the hero image",
    Icon: LayoutTemplate,
    tone: "from-[#fff2cf] via-white to-[#ffd8b4]",
  },
  {
    title: "Shots",
    description:
      "Frame product shots and polished social visuals without leaving the app.",
    href: "/shots",
    eyebrow: "Polish the supporting visuals",
    Icon: ImageIcon,
    tone: "from-[#dff4ff] via-white to-[#d9e7ff]",
  },
  {
    title: "Collections",
    description:
      "Save inspiring references before they disappear and keep your creative pipeline full.",
    href: "/collections",
    eyebrow: "Collect what works",
    Icon: FolderOpen,
    tone: "from-[#dff7ec] via-white to-[#f5f0d8]",
  },
];

const workflow = [
  {
    step: "01",
    title: "Start from a direction, not a blank page.",
    description:
      "Jump into thumbnails, shots, or saved references depending on what the idea needs first.",
  },
  {
    step: "02",
    title: "Push the composition quickly.",
    description:
      "Use the editor to test type scale, image placement, and background energy without fighting a heavy design stack.",
  },
  {
    step: "03",
    title: "Export and move on.",
    description:
      "Download the result when it feels right and keep momentum instead of getting stuck in tooling.",
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
      <main
        className={`${sans.className} relative overflow-hidden bg-[#f6f0e7] text-stone-900`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/images/noise-light.png')" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[44rem]"
          style={{
            background:
              "radial-gradient(circle at 12% 12%, rgba(255, 214, 148, 0.95), transparent 28%), radial-gradient(circle at 82% 14%, rgba(110, 180, 255, 0.55), transparent 18%), linear-gradient(180deg, #fbf4ea 0%, #f6f0e7 60%, #efe5d8 100%)",
          }}
        />

        <section className="relative mx-auto max-w-[1320px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-medium text-stone-700 shadow-[0_10px_28px_rgba(28,25,23,0.07)] backdrop-blur"
              >
                <Sparkles className="h-4 w-4 text-[#d97706]" />
                Thumbnail studio with taste
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className={`${display.className} mt-6 max-w-4xl text-5xl leading-[0.95] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl`}
              >
                Make your covers feel
                <span className="italic text-[#d97706]"> expensive </span>
                before you open a heavy design tool.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-6 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl"
              >
                LazyLayers gives you a tight workspace for bold thumbnails,
                polished shots, and saved references so you can move from idea
                to export without tool bloat.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link href="/thumbnail">
                  <Button
                    size="lg"
                    className="rounded-full bg-stone-900 px-8 text-base text-[#f6f0e7] shadow-[0_18px_50px_rgba(28,25,23,0.16)] hover:bg-stone-800"
                  >
                    Start with Thumbnail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/shots">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-transparent bg-white/75 px-8 text-base text-stone-700 shadow-[0_10px_28px_rgba(28,25,23,0.07)] hover:bg-white"
                  >
                    Explore Shots
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-3 text-sm text-stone-600"
              >
                {[
                  "Fast editor",
                  "Focused routes",
                  "No sign-in noise",
                  "Built for makers",
                ].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full bg-stone-900/5 px-3 py-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#0f766e]" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="relative mx-auto w-full max-w-[620px]"
            >
              <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-[#0f766e]/25 blur-3xl lg:block" />
              <div className="absolute -right-10 bottom-8 hidden h-40 w-40 rounded-full bg-[#f97316]/20 blur-3xl lg:block" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[#16151b] p-4 shadow-[0_36px_120px_rgba(28,25,23,0.22)]">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{
                    backgroundImage:
                      "url('/images/background/deep-dusk-003.jpg')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-[#05060f]/80" />

                <div className="relative rounded-[1.5rem] bg-white/10 p-3 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/45" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/70">
                      Live canvas
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.25rem] bg-[#fbf7f1] shadow-inner">
                    <Image
                      src={demoImage}
                      alt="LazyLayers editor preview"
                      priority
                      className="origin-top scale-[1.08] -translate-y-8"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 top-8 hidden rounded-[1.5rem] bg-white/85 px-4 py-4 shadow-xl backdrop-blur lg:block">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-stone-500">
                  Thumbnail
                </div>
                <div className="mt-2 max-w-[10rem] text-sm font-medium text-stone-800">
                  Build the main visual before the idea cools off.
                </div>
              </div>

              <div className="absolute -right-4 top-20 hidden rounded-[1.5rem] bg-[#f9dcc2] px-4 py-4 shadow-xl lg:block">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-stone-600">
                  Shots
                </div>
                <div className="mt-2 max-w-[10rem] text-sm font-medium text-stone-800">
                  Export product and promo visuals without switching context.
                </div>
              </div>

              <div className="absolute bottom-4 left-10 hidden rounded-[1.5rem] bg-[#dff4ff] px-4 py-4 shadow-xl lg:block">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-stone-600">
                  Collections
                </div>
                <div className="mt-2 max-w-[11rem] text-sm font-medium text-stone-800">
                  Save references the second they feel worth stealing from.
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="rounded-[2rem] bg-white/62 p-6 shadow-[0_20px_56px_rgba(28,25,23,0.08)] backdrop-blur sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                    Pick a surface
                  </div>
                  <h2
                    className={`${display.className} mt-3 text-3xl tracking-tight text-stone-900 sm:text-4xl`}
                  >
                    Every route has one clear job.
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                {studioSurfaces.map((surface, index) => (
                  <motion.div
                    key={surface.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.48 + index * 0.08 }}
                  >
                    <Link
                      href={surface.href}
                      className={`group block rounded-[1.75rem] bg-gradient-to-br ${surface.tone} p-5 shadow-[0_16px_40px_rgba(28,25,23,0.06)] transition-transform duration-300 hover:-translate-y-1`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-stone-500">
                            {surface.eyebrow}
                          </div>
                          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                            {surface.title}
                          </h3>
                          <p className="mt-3 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
                            {surface.description}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-stone-900 p-3 text-[#f6f0e7] shadow-lg">
                          <surface.Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="mt-6 inline-flex items-center text-sm font-semibold text-stone-900">
                        Open route
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="overflow-hidden rounded-[2rem] bg-stone-900 text-[#f6f0e7] shadow-[0_24px_80px_rgba(28,25,23,0.14)]"
            >
              <div
                className="px-6 py-6 sm:px-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(27, 96, 84, 0.55), rgba(9, 13, 23, 0.85)), url('/images/background/beautiful-blue-004.jpg') center/cover",
                }}
              >
                <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
                  Workflow
                </div>
                <h2
                  className={`${display.className} mt-3 text-3xl tracking-tight sm:text-4xl`}
                >
                  Move like a creator, not like a committee.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                  The app is tight on purpose: less setup, less tool-switching,
                  and more room for making fast, sharp decisions.
                </p>
              </div>

              <div className="grid gap-3 px-6 py-4 sm:px-8 sm:py-6">
                {workflow.map((item, index) => (
                  <div
                    key={item.step}
                    className="grid gap-6 rounded-[1.5rem] bg-white/[0.04] px-4 py-5 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-5"
                  >
                    <div className="text-4xl font-semibold leading-none text-[#f59e0b]">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/70 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative mx-auto max-w-[1320px] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52 }}
            className="overflow-hidden rounded-[2rem] bg-white/74 shadow-[0_18px_48px_rgba(28,25,23,0.08)] backdrop-blur"
          >
            <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-stone-900/5 px-3 py-1.5 text-sm font-medium text-stone-600">
                  <Download className="h-4 w-4" />
                  Ready when you are
                </div>
                <h2
                  className={`${display.className} mt-4 text-3xl tracking-tight text-stone-900 sm:text-4xl`}
                >
                  Open the editor and make the first one ugly, fast, then good.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                  That is the whole point of LazyLayers. Start rough, iterate
                  quickly, export when it clicks.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/thumbnail">
                  <Button
                    size="lg"
                    className="rounded-full bg-stone-900 px-8 text-[#f6f0e7] hover:bg-stone-800"
                  >
                    Open Thumbnail
                  </Button>
                </Link>
                <Link href="/collections">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-transparent bg-[#efe6d8] px-8 text-stone-700 shadow-[0_10px_28px_rgba(28,25,23,0.06)] hover:bg-white"
                  >
                    Browse Collections
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="relative mx-auto max-w-[1320px] px-4 pb-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 py-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/" className="hover:text-stone-900">
                Home
              </Link>
              <Link href="/thumbnail" className="hover:text-stone-900">
                Thumbnail
              </Link>
              <Link href="/shots" className="hover:text-stone-900">
                Shots
              </Link>
              <Link href="/collections" className="hover:text-stone-900">
                Collections
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/ahmadrosid/lazylayers"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/_ahmadrosid"
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900"
              >
                Twitter
              </a>
              <span>&copy; {new Date().getFullYear()} LazyLayers</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
