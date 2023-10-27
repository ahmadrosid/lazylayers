import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { PickerExample } from "@/components/gradient-picker";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className} container mx-auto py-8`}>
      <div className="pb-16">
        <div className="pb-8">
          <h1 className="scroll-m-20 text-5xl font-bold tracking-tight max-w-xl">
            Create thumbnail or caraousel images faster.
          </h1>
        </div>
        <Button>Get started</Button>
      </div>
      <PickerExample />
    </main>
  );
}
