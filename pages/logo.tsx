import { Button, buttonVariants } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Head from "next/head";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { useReducer, useRef, useState } from "react";
import uuid from "@/lib/uuid";
import Fuse from 'fuse.js';
import twemoji from "@/lib/data/twemoji.json";
import fxemoji from "@/lib/data/fxemoji.json";
import heroicons from "@/lib/data/heroicons.json";
import { GradientPicker } from "@/components/gradient-picker";
import { Input } from "@/components/ui/input";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const emojis = twemoji.concat(fxemoji).concat(heroicons); // from iconsets: https://github.com/iconify/icon-sets
const totalEmoji = emojis.length;
const fuse = new Fuse(emojis, { keys: ["key"] });
const randomIdx = getRandomNumber(0, totalEmoji-1);

export default function Logo() {
  const [filename, setFilename] = useState(uuid().split("-").join(""));
  const [background, setBackground] = useState("#475569");
  const [searchResult, setSearchResult] = useState<{url: string, key: string}[]>([]);
  const [emoji, setEmoji] = useState({
    url: emojis[randomIdx].url,
    key: emojis[randomIdx].key
  })

  const iconRadius = 45;

  const content = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    if (!content.current) return;
    htmlToImage.toPng(content.current).then(function (dataUrl) {
      saveAs(dataUrl, `${filename}.png`);
    });
  };

  return (
    <>
      <Head>
        <title>Logo generator</title>
        <link rel="canonical" href={"https://lazylayers.ahmadrosid.com/logo"} />
        <meta
          property="og:url"
          content="https://lazylayers.ahmadrosid.com/logo"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LazyLayers - Logo generator" />
        <meta property="og:image:alt" content="LazyLayers - Logo generator" />
        <meta
          property="og:description"
          content="LazyLayers - Logo generators Made Quicker Than Ever"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png"
        />
      </Head>
      <div className="flex">
        <div className="flex-1 max-h-screen relative">
          <div className="absolute z-0 inset-0 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          {/* Navbar */}
          <div className="p-1.5 flex border-b items-center bg-white z-10 absolute inset-x-0">
            <div className="flex-1 px-6">
              <div className="flex items-center gap-2">Logo maker</div>
            </div>
            <div>
              <Button
                onClick={handleDownload}
                size="sm"
                variant="ghost"
                className="font-bold"
              >
                <DownloadIcon className="w-4 h-4 mx-1" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center relative h-full">
            {/* Logo editor display */}
            <div className="shadow-md" style={{ borderRadius: iconRadius }}>
              <div
                ref={content}
                style={{
                  width: "256px",
                  height: "256px",
                  background: background,
                  borderRadius: iconRadius,
                }}
              >
                <img
                  src={emoji.url}
                  alt={emoji.key}
                  className="w-auto h-auto p-8"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20rem] h-[92vh] overflow-y-auto border-l bg-white">
          <div className="p-1.5">
            <p
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "font-bold hover:bg-transparent",
              })}
            >
              {"Text attributes"}
            </p>
            </div>

          <div className="p-4 border-y">
            <p
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "font-bold hover:bg-transparent",
              })}
            >
              Select background
            </p>
            <div className="px-2">
              <GradientPicker
                  background={background}
                  label="Background"
                  className="w-full"
                  setBackground={(val) => setBackground(val)}
                />
            </div>
          </div>

          <div className="p-4">
            <p
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "font-bold hover:bg-transparent",
              })}
            >
              Select icon
            </p>
            <div className="px-2 pt-1">
              <Input placeholder="Search icon name" onChange={(e) => {
                const result = fuse.search(e.target.value);
                setSearchResult(result.map(item => item.item).slice(0, 20))
                // setSearchResult(result.map((item) => item.item));
              }}/>
              <div className="py-4 grid grid-cols-4 gap-1 overflow-hidden h-[58vh]">
                {searchResult.map(item =>(
                  <Button key={item.key} onClick={() => setEmoji(item)} variant={"ghost"}>
                    <img src={item.url} className="w-full block" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
