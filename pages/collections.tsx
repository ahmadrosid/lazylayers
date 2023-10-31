// https://i.ytimg.com/vi/SO8lBVWF2Y8/maxresdefault.jpg
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, HardDriveDownload } from "lucide-react";
import { useEffect, useState } from "react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

type Thumbnail = {
  source: "youtube" | "og-image";
  src: string;
  url: string;
};

// Typical YouTube URL formats:
// https://www.youtube.com/watch?v=VIDEO_ID
// https://youtu.be/VIDEO_ID
// https://www.youtube.com/embed/VIDEO_ID
// https://www.youtube.com/v/VIDEO_ID?version=3&autohide=1
// https://www.youtube.com/shorts/VIDEO_ID
const getYoutubeVideoId = (url: string) => {
  const regex =
    /(?:\/embed\/|\/v\/|\/watch\?v=|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function Home() {
  const [thumbnails, setTumbnails] = useState<Thumbnail[]>([]);
  const [inputUrl, setInputUrl] = useState<string>("");

  const handeSaveThumbnail = () => {
    if (inputUrl === "") return;

    setTumbnails((prev) => {
      const videoId = getYoutubeVideoId(inputUrl);
      if (videoId === null) return prev;

      const parsedUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const newData = [
        ...prev,
        {
          source: "youtube",
          src: parsedUrl,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        } as Thumbnail,
      ];

      window.localStorage.setItem("saved-thumbnails", JSON.stringify(newData));
      //   window.localStorage.setItem("saved-thumbnails", "");
      setInputUrl("");

      return newData;
    });
  };

  useEffect(() => {
    const savedData = window.localStorage.getItem("saved-thumbnails");
    if (savedData) {
      setTumbnails(JSON.parse(savedData));
    }
  }, []);

  return (
    <main className={`${inter.className} container mx-auto py-8`}>
      <div className="pb-4 text-start grid place-content-start">
        <div className="pb-8">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tighter max-w-4xl">
            Save Thumbnail
          </h1>
        </div>
        <div className="flex justify-start items-center gap-2">
          <Input
            placeholder="Paste youtube url..."
            className="flex-1 w-[400px]"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.currentTarget.value)}
          />
          <Button onClick={handeSaveThumbnail}>
            <HardDriveDownload className="w-4 h-5 mr-2" /> Save
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f8fafc,transparent)]"></div>
      </div>

      <div className="grid grid-cols-4 gap-4 my-4 bg-white p-4 border rounded">
        {thumbnails.map((item) => (
          <div key={item.src} className="">
            <img src={item.src} alt={item.src} className="rounded-md border" />
            <p>
              <a
                href={item.url}
                target="_blank"
                className="inline-flex items-center text-sm pt-2 hover:underline"
              >
                Open in youtube
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
