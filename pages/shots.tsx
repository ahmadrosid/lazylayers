import Head from "next/head";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReducer, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import uuid from "@/lib/uuid";
import { Button } from "@/components/ui/button";
import { GradientPicker } from "@/components/gradient-picker";
import { Slider } from "@/components/ui/slider";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { initialState, shotsReducer } from "../reducers/shotsReducer";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type FrameStyle = "macos" | "windows" | "none";

const ratios = [
  {
    label: "Open Graph",
    value: "1.90476 / 1",
  },
  {
    label: "YouTube",
    value: "16 / 9",
  },
  {
    label: "Square",
    value: "1 / 1",
  },
  {
    label: "Portrait",
    value: "4 / 5",
  },
] as const;

const frameStyles: Record<FrameStyle, {
  name: string;
  className: string;
  header?: React.ReactNode;
}> = {
  none: {
    name: "No Frame",
    className: "rounded-lg overflow-hidden",
  },
  macos: {
    name: "macOS",
    className: "overflow-hidden bg-[#f6f6f6] shadow-xl",
    header: (
      <div className="h-7 bg-[#e4e4e4] flex items-center px-3 gap-2 rounded-t-lg">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
      </div>
    ),
  },
  windows: {
    name: "Windows",
    className: "rounded-lg overflow-hidden bg-white shadow-xl border border-[#dfdfdf]",
    header: (
      <div className="h-8 bg-white border-b border-[#dfdfdf] flex items-center justify-end px-3 gap-2 rounded-t-lg">
        <div className="w-3 h-3 rounded-sm hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
        <div className="w-3 h-3 rounded-sm hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"></path></svg>
        </div>
        <div className="w-3 h-3 rounded-sm hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
      </div>
    ),
  },
} as const;

export default function ShotsPage() {
  const [config, dispatch] = useReducer(shotsReducer, initialState);
  const [filename, setFilename] = useState(uuid().split("-").join(""));
  const content = useRef<HTMLDivElement>(null);

  const setBackground = (background: string) => {
    dispatch({ type: "SET_BACKGROUND", payload: background });
  };

  const handleDownload = () => {
    if (!content.current) return;
    htmlToImage.toPng(content.current).then(function (dataUrl) {
      saveAs(dataUrl, `${filename}.png`);
    });
  };

  const frameStyle = frameStyles[config.frameStyle as keyof typeof frameStyles] ?? frameStyles.none;
  
  const handleAspectRatioChange = (value: string) => {
    dispatch({ type: "SET_ASPECT_RATIO", payload: value });
  };

  return (
    <>
      <Head>
        <title>Shots generator</title>
        <link rel="canonical" href={"https://lazylayers.ahmadrosid.com/shots"} />
        <meta property="og:url" content="https://lazylayers.ahmadrosid.com/shots" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LazyLayers - Shots" />
        <meta property="og:image:alt" content="LazyLayers - Shots" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png"
        />
        <meta
          property="og:description"
          content="LazyLayers - Create beautiful shots for your images"
        />
      </Head>
      <main className="min-h-screen flex">
        <div className="flex-1 bg-gray-50 relative">
          <div className="absolute z-0 inset-0 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="p-1.5 flex border-b items-center bg-white z-10 relative gap-2">
            <Select value={config.aspectRatio} onValueChange={handleAspectRatioChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                {ratios.map((ratio) => (
                  <SelectItem key={ratio.value} value={ratio.value}>
                    {ratio.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1 px-6">
              <div className="flex items-center gap-2">
                Design a screenshot
              </div>
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
          <div className="flex-1 p-6 relative z-10">
            <div
              ref={content}
              style={{
                background: config.background,
                padding: config.padding,
                aspectRatio: config.aspectRatio,
              }}
            >
              {frameStyle.header}
              <div className="relative h-full w-full overflow-hidden bg-white rounded-b-lg">
                {config.image ? (
                  <img 
                    src={config.image} 
                    alt="Uploaded preview"
                    className={`w-full h-full object-${config.imageSize}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p>Upload an image to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[300px] border-l p-8 space-y-8 bg-white">
          <div>
            <h1 className="text-2xl font-bold">Shots Generator</h1>
            <p className="text-gray-500">Create beautiful shots for your images</p>
          </div>

          <div className="space-y-4">
            <p className="font-medium">Frame Style</p>
            <Select
              value={config.frameStyle}
              onValueChange={(value: "macos" | "windows" | "none") =>
                dispatch({
                  type: "SET_FRAME_STYLE",
                  payload: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frame style" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(frameStyles).map(([key, style]) => (
                  <SelectItem key={key} value={key}>
                    {style.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <p className="font-medium">Background</p>
            <GradientPicker 
              background={config.gradient}
              setBackground={(value) => setBackground(value)}
            />
          </div>

          <div className="space-y-4">
            <p className="font-medium">Upload Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    dispatch({
                      type: "SET_IMAGE",
                      payload: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className={cn(
                "w-full file:bg-gray-100 file:hover:bg-gray-200 file:text-primary file:hover:cursor-pointer file:border-0 file:mr-4 file:px-4 file:py-2 file:rounded-md cursor-pointer",
              )}
            />
          </div>

          {config.image && (
            <div className="space-y-4">
              <p className="font-medium">Image Size</p>
              <Select
                value={config.imageSize}
                onValueChange={(value: "contain" | "cover") =>
                  dispatch({
                    type: "SET_IMAGE_SIZE",
                    payload: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contain">Fit (Contain)</SelectItem>
                  <SelectItem value="cover">Fill (Cover)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-4">
            <p className="font-medium">Padding</p>
            <Slider
              defaultValue={[config.padding]}
              max={100}
              step={1}
              onValueChange={(value) =>
                dispatch({
                  type: "SET_PADDING",
                  payload: value[0],
                })
              }
            />
          </div>

          <Button
            onClick={handleDownload}
            className={buttonVariants({ variant: "default", className: "w-full" })}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </main>
    </>
  );
}
