import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
