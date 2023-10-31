// https://i.ytimg.com/vi/SO8lBVWF2Y8/maxresdefault.jpg
import { Plus_Jakarta_Sans } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  HardDriveDownload,
  TagIcon,
  TrashIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [bookmarklet, setBookmarklet] = useState<string>("");

  const searchParams = useSearchParams();

  const handleSaveThumbnail = useCallback(() => {
    if (inputUrl === "") return;

    setThumbnails((prev) => {
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
      setInputUrl("");
      if (searchParams.get("url")) {
        window.location.href = "/collections";
      }

      return newData;
    });
  }, [inputUrl, searchParams]);

  const handleDelete = (src: string) => {
    setThumbnails((prev) => {
      const updatedThumbnails = prev.filter(
        (thumbnail) => thumbnail.src !== src
      );
      window.localStorage.setItem(
        "saved-thumbnails",
        JSON.stringify(updatedThumbnails)
      );

      return updatedThumbnails;
    });
  };

  useEffect(() => {
    const savedData = window.localStorage.getItem("saved-thumbnails");
    if (savedData) {
      setThumbnails(JSON.parse(savedData));
    }

    const origin = window.location.origin;
    if (origin) {
      setBookmarklet(
        `<a href="javascript:window.location='${window.location.origin}/collections?url='+encodeURIComponent(document.location)">
    Save thumbnail
  </a>`
      );
    }
  }, []);

  useEffect(() => {
    const url = searchParams.get("url");
    if (url) {
      const isSaved = thumbnails.filter((thumbnail) => thumbnail.src === url);
      if (isSaved.length === 0) {
        setInputUrl(url);
        setTimeout(() => {
          handleSaveThumbnail();
        }, 600);
      }
    }
  }, [thumbnails, searchParams, handleSaveThumbnail]);

  return (
    <main className={`${inter.className} container mx-auto py-8`}>
      <div className="pb-4 text-start grid place-content-start">
        <div className="pb-8">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tighter max-w-4xl">
            Save Thumbnail
          </h1>
          <p className="pt-2">
            Collect inspiring thumbnail from any YoutTube link.
          </p>

          <div
            className="flex-shrink-0 hover:underline cursor-pointer pt-1 underline"
            dangerouslySetInnerHTML={{ __html: bookmarklet }}
          />
        </div>
        <div className="flex justify-start items-center gap-2">
          <Input
            placeholder="Paste youtube url..."
            className="flex-1 w-[400px]"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.currentTarget.value)}
          />
          <Button onClick={handleSaveThumbnail}>
            <HardDriveDownload className="w-4 h-5 mr-2" /> Save
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f8fafc,transparent)]"></div>
      </div>

      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-4 my-4 bg-white p-4 border rounded">
          {thumbnails.map((item) => (
            <div key={item.src} className="">
              <img
                src={item.src}
                alt={item.src}
                className="rounded-md border"
              />
              <p className="flex justify-between items-center py-2">
                <a
                  href={item.url}
                  target="_blank"
                  className="inline-flex items-center text-sm pt-2 hover:underline"
                >
                  Open in Youtube
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
                <span className="inline-flex gap-1.5">
                  {/* <a
                    href={item.url}
                    target="_blank"
                    className="text-xs flex gap-2 items-center bg-sky-500 hover:bg-sky-600 text-white rounded px-2 py-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a> */}
                  <button
                    onClick={() => handleDelete(item.src)}
                    className="text-xs flex gap-2 items-center bg-rose-500 hover:bg-rose-600 text-white rounded px-2 py-1.5"
                  >
                    <TrashIcon className="w-3 h-3" /> Delete
                  </button>
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
