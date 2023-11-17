import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Lazylayers - Design Your Story, Share Your Passion</title>
        <link rel="canonical" href={"https://lazylayers.ahmadrosid.com/"} />
        <meta property="og:url" content="https://lazylayers.ahmadrosid.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="LazyLayers - Design Your Story, Share Your Passion"
        />
        <meta
          property="og:image:alt"
          content="LazyLayers - Design Your Story, Share Your Passion"
        />
        <meta
          property="og:description"
          content="LazyLayers - Design Your Story, Share Your Passion"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png"
        />
      </Head>
      <main className={`${inter.className} container mx-auto py-8`}>
        <div className="pb-16 pt-16 text-center grid place-content-center">
          <div className="flex justify-center pb-8">
            <p className="bg-gray-100 text-gray-600 border border-gray-200 rounded-full p-1.5 px-6 text-sm font-medium tracking-tight">
              {"Design faster and easier."}
            </p>
          </div>
          <div className="pb-8">
            <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tighter max-w-4xl">
              Design Your Story, Share Your Passion
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/thumbnail">
              <Button>Get started</Button>
            </Link>
            <p className="px-4">No login required!</p>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f8fafc,transparent)]"></div>
        </div>
      </main>
    </>
  );
}
