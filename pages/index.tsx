import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";

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
      <main className={`${inter.className} container mx-auto py-8 overflow-x-hidden`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-16 pt-16 text-center grid place-content-center"
        >
          <div className="flex justify-center pb-8">
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 text-gray-600 border border-gray-200/50 rounded-full p-1.5 px-6 text-sm font-medium tracking-tight cursor-pointer backdrop-blur-sm"
            >
              ✨ Create stunning thumbnails in seconds
            </motion.p>
          </div>
          <div className="pb-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="scroll-m-20 text-6xl sm:text-7xl font-extrabold tracking-tighter max-w-4xl text-gray-900"
            >
              Click-Worthy Thumbnails, Instantly
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              The fastest way to create beautiful thumbnails for your content. No design skills needed! 🎨
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center items-center gap-4 mb-12"
          >
            <Link href="/thumbnail">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started Free ✨
              </Button>
            </Link>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-gray-600 flex items-center gap-2"
            >
              <span>✓</span> No login required!
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mb-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur-3xl opacity-20 -z-10 transform -rotate-1"></div>
            <img 
              src="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png" 
              alt="LazyLayers Preview" 
              className="rounded-lg shadow-2xl border border-gray-100 max-w-5xl mx-auto hover:transform hover:scale-[1.02] transition-transform duration-300"
            />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {[
              {
                icon: "🎨",
                title: "Beautiful Templates",
                description: "Start with professionally designed templates and customize them to match your style."
              },
              {
                icon: "⚡️",
                title: "Lightning Fast",
                description: "Create stunning thumbnails in seconds with our intuitive drag-and-drop editor."
              },
              {
                icon: "💫",
                title: "No Skills Needed",
                description: "Perfect for content creators who want professional results without the learning curve."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + (index * 0.2) }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white/50 border border-gray-100 hover:border-purple-200 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_200px,#f8f6ff,transparent)]"></div>
        </div>

        <footer className="mt-24 border-t border-gray-200 pt-8 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
                <Link href="https://github.com/ahmadrosid" className="text-gray-500 hover:text-gray-700">
                  GitHub
                </Link>
                <Link href="https://twitter.com/_ahmadrosid" className="text-gray-500 hover:text-gray-700">
                  Twitter
                </Link>
              </div>
              <div className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} LazyLayers. Made with &hearts; by Ahmad Rosid
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
