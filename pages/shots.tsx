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
import { DownloadIcon } from "lucide-react";
import { 
  Inter, 
  Roboto, 
  Oswald,
  Playfair_Display,
  Montserrat,
  Poppins,
  Plus_Jakarta_Sans,
  Fira_Mono,
  Fira_Code
} from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const firaMono = Fira_Mono({ weight: ["400", "500"], subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });

const fonts = {
  inter: inter,
  roboto: roboto,
  oswald: oswald,
  playfair: playfair,
  montserrat: montserrat,
  poppins: poppins,
  plusJakarta: plusJakarta,
  firaMono: firaMono,
  firaCode: firaCode,
} as const;

const frameStyles = {
  none: {
    name: "No Frame",
    className: "rounded-lg overflow-hidden",
  },
  macos: {
    name: "macOS",
    className: "rounded-lg overflow-hidden bg-[#f6f6f6] shadow-xl",
    header: (
      <div className="h-7 bg-[#e4e4e4] flex items-center px-3 gap-2">
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
      <div className="h-8 bg-white border-b border-[#dfdfdf] flex items-center justify-end px-3 gap-2">
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

type FrameStyle = keyof typeof frameStyles;

const initialState = {
  fontFamily: "inter" as keyof typeof fonts,
  gradient: "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
  padding: 32,
  radius: 16,
  background: "",
  frameStyle: "macos" as FrameStyle,
};

type ShotsState = typeof initialState;
type ShotsAction = 
  | { type: "SET_FONT_FAMILY"; payload: keyof typeof fonts }
  | { type: "SET_GRADIENT"; payload: string }
  | { type: "SET_PADDING"; payload: number }
  | { type: "SET_RADIUS"; payload: number }
  | { type: "SET_BACKGROUND"; payload: string }
  | { type: "SET_FRAME_STYLE"; payload: FrameStyle };

function shotsReducer(state: ShotsState, action: ShotsAction): ShotsState {
  switch (action.type) {
    case "SET_FONT_FAMILY":
      return { ...state, fontFamily: action.payload };
    case "SET_GRADIENT":
      return { ...state, gradient: action.payload };
    case "SET_PADDING":
      return { ...state, padding: action.payload };
    case "SET_RADIUS":
      return { ...state, radius: action.payload };
    case "SET_BACKGROUND":
      return { ...state, background: action.payload };
    case "SET_FRAME_STYLE":
      return { ...state, frameStyle: action.payload };
    default:
      return state;
  }
}

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

  const frameStyle = frameStyles[config.frameStyle];

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
          property="og:description"
          content="LazyLayers - Create beautiful shots for your images"
        />
      </Head>
      <main className={`${fonts[config.fontFamily].className} container mx-auto py-8`}>
        <div className="pb-8">
          <h1 className="text-2xl font-bold">Shots Generator</h1>
          <p className="text-gray-500">Create beautiful shots for your images</p>
        </div>

        <div className="grid grid-cols-[300px_1fr] gap-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-medium">Frame Style</p>
              <Select
                value={config.frameStyle}
                onValueChange={(value) =>
                  dispatch({
                    type: "SET_FRAME_STYLE",
                    payload: value as FrameStyle,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(frameStyles).map(([key, { name }]) => (
                    <SelectItem key={key} value={key}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <p className="font-medium">Font Family</p>
              <Select
                value={config.fontFamily}
                onValueChange={(value) =>
                  dispatch({
                    type: "SET_FONT_FAMILY",
                    payload: value as keyof typeof fonts,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="oswald">Oswald</SelectItem>
                  <SelectItem value="playfair">Playfair Display</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="poppins">Poppins</SelectItem>
                  <SelectItem value="plusJakarta">Plus Jakarta Sans</SelectItem>
                  <SelectItem value="firaMono">Fira Mono</SelectItem>
                  <SelectItem value="firaCode">Fira Code</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <p className="font-medium">Background</p>
              <GradientPicker
                background={config.gradient}
                setBackground={(value) =>
                  dispatch({ type: "SET_GRADIENT", payload: value })
                }
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
                    reader.onload = (event) => {
                      const imgElement = document.createElement("img");
                      imgElement.src = event.target?.result as string;
                      imgElement.onload = () => {
                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        if (context) {
                          canvas.width = imgElement.width;
                          canvas.height = imgElement.height;
                          context.drawImage(imgElement, 0, 0);
                          const dataUrl = canvas.toDataURL();
                          setBackground(dataUrl);
                        }
                      };
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Padding</p>
                <p className="text-sm text-gray-500">{config.padding}px</p>
              </div>
              <Slider
                value={[config.padding]}
                min={0}
                max={64}
                step={1}
                onValueChange={([value]) =>
                  dispatch({ type: "SET_PADDING", payload: value })
                }
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Border Radius</p>
                <p className="text-sm text-gray-500">{config.radius}px</p>
              </div>
              <Slider
                value={[config.radius]}
                min={0}
                max={32}
                step={1}
                onValueChange={([value]) =>
                  dispatch({ type: "SET_RADIUS", payload: value })
                }
              />
            </div>

            <Button onClick={handleDownload} className="w-full">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          <div
            ref={content}
            className={`${config.gradient} rounded-3xl flex items-center justify-center min-h-[400px]`}
            style={{
              padding: config.padding,
              borderRadius: config.radius,
            }}
          >
            <div className={frameStyle.className}>
              {frameStyle.header && frameStyle.header}
              {config.background ? (
                <img src={config.background} alt="Uploaded" className="w-full" />
              ) : (
                <div className="w-full aspect-video bg-white"></div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
