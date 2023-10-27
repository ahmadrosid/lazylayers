import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} container mx-auto py-8`}>
      <div className="pb-16 pt-16 text-center grid place-content-center">
        <div className="pb-8">
          <h1 className="scroll-m-20 text-7xl font-extrabold tracking-tighter max-w-4xl">
            Create Thumbnail and Caraousel images faster.
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Button>Get started</Button>
          <p className="px-4">No sign required!</p>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f8fafc,transparent)]"></div>
      </div>
    </main>
  );
}
