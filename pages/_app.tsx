import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { AppNav } from "@/components/app-nav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLanding = router.pathname === "/";

  return (
    <div className={inter.className}>
      {!isLanding && <AppNav />}
      <Component {...pageProps} />
    </div>
  );
}
