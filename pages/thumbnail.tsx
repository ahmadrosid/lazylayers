import Head from "next/head";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useEffect, useReducer, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import uuid from "@/lib/uuid";
import { Button, buttonVariants } from "@/components/ui/button";
import { GradientPicker } from "@/components/gradient-picker";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, ChevronDownIcon, DownloadIcon, SearchIcon } from "lucide-react";
import { initialState, thumbnailReducer } from "@/reducers/thumbnailReducer";
import { cn } from "@/lib/utils";
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
import { templates } from "@/config/templates";
import { TemplateModal } from "@/components/template-modal";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const firaMono = Fira_Mono({ weight: ["400", "500"], subsets: ["latin"] });
const firaCode = Fira_Code({ subsets: ["latin"] });

const fontOptions = [
  {
    value: "inter",
    label: "Inter",
    category: "Sans",
    className: inter.className,
    keywords: ["ui", "clean", "modern"],
  },
  {
    value: "roboto",
    label: "Roboto",
    category: "Sans",
    className: roboto.className,
    keywords: ["google", "neutral", "readable"],
  },
  {
    value: "oswald",
    label: "Oswald",
    category: "Display",
    className: oswald.className,
    keywords: ["condensed", "headline", "bold"],
  },
  {
    value: "playfair",
    label: "Playfair Display",
    category: "Serif",
    className: playfair.className,
    keywords: ["editorial", "luxury", "classic"],
  },
  {
    value: "montserrat",
    label: "Montserrat",
    category: "Sans",
    className: montserrat.className,
    keywords: ["geometric", "brand", "clean"],
  },
  {
    value: "poppins",
    label: "Poppins",
    category: "Sans",
    className: poppins.className,
    keywords: ["rounded", "friendly", "modern"],
  },
  {
    value: "plusJakarta",
    label: "Plus Jakarta Sans",
    category: "Sans",
    className: plusJakarta.className,
    keywords: ["jakarta", "tech", "sharp"],
  },
  {
    value: "firaMono",
    label: "Fira Mono",
    category: "Mono",
    className: firaMono.className,
    keywords: ["code", "developer", "monospace"],
  },
  {
    value: "firaCode",
    label: "Fira Code",
    category: "Mono",
    className: firaCode.className,
    keywords: ["code", "developer", "ligatures"],
  },
] as const;

type FontFamily = (typeof fontOptions)[number]["value"];

const fontClassNames: Record<FontFamily, string> = {
  inter: inter.className,
  roboto: roboto.className,
  oswald: oswald.className,
  playfair: playfair.className,
  montserrat: montserrat.className,
  poppins: poppins.className,
  plusJakarta: plusJakarta.className,
  firaMono: firaMono.className,
  firaCode: firaCode.className,
};

const getFilteredFonts = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return fontOptions;

  return fontOptions.filter((option) =>
    [option.label, option.category, ...option.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
};

const getHighlightedFontIndex = (
  query: string,
  activeFontFamily: string
) => {
  const nextFilteredFonts = getFilteredFonts(query);
  const activeIndex = nextFilteredFonts.findIndex(
    (option) => option.value === activeFontFamily
  );

  return activeIndex >= 0 ? activeIndex : 0;
};

const ratios = [
  {
    label: "Open Graph",
    value: "1.90476 / 1",
  },
  {
    label: "YouTube",
    value: "16 / 9",
  },
];

export default function ThumbnailPage() {
  const [config, dispatch] = useReducer(thumbnailReducer, initialState);
  const [filename, setFilename] = useState(uuid().split("-").join(""));
  const [fontPickerOpen, setFontPickerOpen] = useState(false);
  const [fontSearch, setFontSearch] = useState("");
  const [highlightedFontIndex, setHighlightedFontIndex] = useState(0);

  const content = useRef<HTMLDivElement>(null);
  const fontOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentFont =
    fontOptions.find(
      (option) => option.value === config.content.title.fontFamily
    ) ?? fontOptions[0];
  const filteredFonts = getFilteredFonts(fontSearch);

  useEffect(() => {
    if (!fontPickerOpen) return;

    fontOptionRefs.current[highlightedFontIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [fontPickerOpen, highlightedFontIndex]);

  const setFontFamily = (fontFamily: FontFamily) => {
    dispatch({
      type: "UPDATE_TITLE",
      payload: {
        ...config.content.title,
        fontFamily,
      },
    });
    setFontPickerOpen(false);
    setFontSearch("");
  };

  const handleDownload = () => {
    if (!content.current) return;
    htmlToImage.toPng(content.current).then(function (dataUrl) {
      saveAs(dataUrl, `${filename}.png`);
    });
  };

  return (
    <>
      <Head>
        <title>Thumbnail generator</title>
        <link
          rel="canonical"
          href={"https://lazylayers.ahmadrosid.com/thumbnail"}
        />
        <meta
          property="og:url"
          content="https://lazylayers.ahmadrosid.com/thumbnail"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LazyLayers - Thumbnail" />
        <meta property="og:image:alt" content="LazyLayers - Thumbnail" />
        <meta
          property="og:description"
          content="LazyLayers - Thumbnails Made Quicker Than Ever"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dr15yjl8w/image/upload/v1698396814/7195172a903f4d9fa3eaf26f25c3ca37_z1mofb.png"
        />
      </Head>
      <div className="flex">
        <div className="flex-1 max-h-screen relative">
          <div className="p-1.5 flex border-b items-center bg-white z-10 relative">
            <div className="flex-1 px-6">
              <div className="flex items-center gap-2">
                Frame size
                <Select
                  onValueChange={(val) =>
                    dispatch({
                      type: "UPDATE_FRAME_SIZE",
                      payload: {
                        value: val,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-[180px] h-8 px-2">
                    <SelectValue placeholder="Frame size" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratios.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <div className="absolute z-0 inset-0 h-full w-full bg-gray-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="overflow-hidden bg-white flex justify-center items-start p-8">
            <div
              ref={content}
              className="w-full h-full p-6 grid place-content-center text-center relative rounded-[4px] transition-all"
              style={{
                background: config.background.color,
                backgroundSize: "contain",
                height: "auto",
                aspectRatio: config.background.aspectRatio,
              }}
            >
              {/* <div
                className="absolute inset-0 z-10 blur-sm bg-repeat opacity-[0.15]"
                style={{
                  backgroundImage: 'url("/patterns/noise.png")',
                  backgroundSize: "20%",
                }}
              ></div> */}
              <div
                className="absolute rounded-lg z-20 shadow-lg"
                style={{
                  background: config.frame.backgroundColor,
                  inset: config.frame.inset,
                }}
              ></div>
              <div className="p-8 z-50">
                <p
                  className={`mx-auto transition-all ${
                    fontClassNames[
                      config.content.title.fontFamily as FontFamily
                    ] ?? inter.className
                  }`}
                  style={{
                    fontSize: config.content.title.fontSize,
                    fontWeight: "bold",
                    color: config.content.title.color,
                    letterSpacing: config.content.title.tracking,
                    lineHeight: config.content.title.lineHeight,
                    maxWidth: `${config.content.title.maxWidth}%`,
                  }}
                >
                  {config.content.title.text}
                </p>
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
            <input
              className="p-2 bg-white rounded w-full border text-sm"
              placeholder="Text"
              name="content_text"
              value={config.content.title.text}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_TITLE",
                  payload: {
                    ...config.content.title,
                    text: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
          <div className="p-4 border-b">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
              <div className="text-sm flex-1">Font size</div>
              <div className="text-sm opacity-50">{config.content.title.fontSize}</div>
              </div>
              <Slider
                onValueChange={(val) =>
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      fontSize: val[0],
                    },
                  })
                }
                defaultValue={[config.content.title.fontSize]}
                min={12}
                max={200}
                step={1}
              />
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="space-y-4">
              <div className="text-sm flex-1">Line height</div>
              <Slider
                onValueChange={(val) =>
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      lineHeight: val,
                    },
                  })
                }
                defaultValue={[config.content.title.lineHeight]}
                max={2}
                step={0.01}
              />
            </div>
          </div>
          <div className="space-y-3 border-b w-full p-4">
            <p className="text-sm">Max width</p>
            <Slider
              onValueChange={(val) =>
                dispatch({
                  type: "UPDATE_TITLE",
                  payload: {
                    ...config.content.title,
                    maxWidth: val,
                  },
                })
              }
              defaultValue={[config.content.title.maxWidth]}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-3 border-b w-full p-4">
            <p className="text-sm">Frame size</p>
            <Slider
              onValueChange={(val) =>
                dispatch({
                  type: "UPDATE_FRAME",
                  payload: {
                    ...config.frame,
                    inset: `${val}px`,
                  },
                })
              }
              defaultValue={[+config.frame.inset.replace("px", "")]}
              max={100}
              step={1}
            />
          </div>
          <div className="py-4 px-4 border-b grid grid-cols-2 gap-2">
            <GradientPicker
              background={config.content.title.color}
              label="Font color"
              setBackground={(val) =>
                dispatch({
                  type: "UPDATE_TITLE",
                  payload: {
                    ...config.content.title,
                    color: val,
                  },
                })
              }
            />
            <Select
              onValueChange={(val) =>
                dispatch({
                  type: "UPDATE_TITLE",
                  payload: {
                    ...config.content.title,
                    tracking: val,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Spacing" />
              </SelectTrigger>
              <SelectContent>
                {config.options.tracking.map(([key, val]) => (
                  <SelectItem key={key} value={val}>
                    {key.split("-")[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-4 px-4 border-b">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Font family</p>
              <Popover
                open={fontPickerOpen}
                onOpenChange={(open) => {
                  setFontPickerOpen(open);
                  if (open) {
                    setHighlightedFontIndex(
                      getHighlightedFontIndex(
                        fontSearch,
                        config.content.title.fontFamily
                      )
                    );
                  } else {
                    setFontSearch("");
                  }
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-auto w-full justify-between rounded-md border bg-white px-3 py-2 font-normal shadow-none hover:bg-white"
                  >
                    <span className="flex min-w-0 flex-col items-start text-left">
                      <span
                        className={cn(
                          "truncate text-sm font-medium text-stone-900",
                          currentFont.className
                        )}
                      >
                        {currentFont.label}
                      </span>
                      <span className="text-xs text-stone-500">
                        {currentFont.category}
                      </span>
                    </span>
                    <ChevronDownIcon className="ml-3 h-4 w-4 shrink-0 text-stone-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[320px] p-0">
                  <div className="border-b p-3">
                    <div className="relative">
                      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      <Input
                        autoFocus
                        value={fontSearch}
                        onChange={(e) => {
                          const nextQuery = e.currentTarget.value;

                          setFontSearch(nextQuery);
                          setHighlightedFontIndex(
                            getHighlightedFontIndex(
                              nextQuery,
                              config.content.title.fontFamily
                            )
                          );
                        }}
                        onKeyDown={(event) => {
                          if (filteredFonts.length === 0) return;

                          if (event.key === "ArrowDown") {
                            event.preventDefault();
                            setHighlightedFontIndex((current) =>
                              current >= filteredFonts.length - 1 ? 0 : current + 1
                            );
                          }

                          if (event.key === "ArrowUp") {
                            event.preventDefault();
                            setHighlightedFontIndex((current) =>
                              current <= 0 ? filteredFonts.length - 1 : current - 1
                            );
                          }

                          if (event.key === "Enter") {
                            event.preventDefault();
                            const selectedFont =
                              filteredFonts[highlightedFontIndex] ?? filteredFonts[0];

                            if (selectedFont) {
                              setFontFamily(selectedFont.value);
                            }
                          }
                        }}
                        placeholder="Search fonts..."
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto p-2">
                    {filteredFonts.length > 0 ? (
                      filteredFonts.map((option, index) => {
                        const isActive =
                          option.value === config.content.title.fontFamily;
                        const isHighlighted = index === highlightedFontIndex;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            ref={(element) => {
                              fontOptionRefs.current[index] = element;
                            }}
                            onClick={() => setFontFamily(option.value)}
                            onMouseEnter={() => setHighlightedFontIndex(index)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-stone-100",
                              isHighlighted && "bg-stone-100",
                              isActive && "text-stone-900"
                            )}
                          >
                            <span className="min-w-0">
                              <span
                                className={cn(
                                  "block truncate text-sm font-medium text-stone-900",
                                  option.className
                                )}
                              >
                                {option.label}
                              </span>
                              <span className="block text-xs text-stone-500">
                                {option.category}
                              </span>
                            </span>
                            {isActive ? (
                              <CheckIcon className="ml-3 h-4 w-4 shrink-0 text-stone-900" />
                            ) : null}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3 py-8 text-center text-sm text-stone-500">
                        No fonts matched your search.
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="px-2 py-2 border-b">
            <p
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "font-bold hover:bg-transparent",
              })}
            >
              Background style
            </p>
          </div>
          <div className="py-4 px-4 border-b gap-2 flex">
            <GradientPicker
              background={config.background.color}
              label="Background"
              setBackground={(val) =>
                dispatch({
                  type: "UPDATE_BACKGROUND_COLOR",
                  payload: val,
                })
              }
            />
            <GradientPicker
              background={config.frame.backgroundColor}
              label="Frame color"
              setBackground={(val) =>
                dispatch({
                  type: "UPDATE_FRAME",
                  payload: {
                    ...config.frame,
                    backgroundColor: val,
                  },
                })
              }
            />
          </div>
          <div className="p-4 gap-2 border-b">
            <p className="text-sm text-gray-600 pb-2">File name</p>
            <input
              value={filename}
              onChange={(e) => setFilename(e.currentTarget.value)}
              placeholder="filename"
              className="border rounded text-sm p-2 w-full"
            />
          </div>
          <div className="border-b p-4">
            <Button className="w-full" onClick={handleDownload}>
              Save image
            </Button>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm">Settings</h3>
              <TemplateModal
                templates={templates}
                onSelectTemplate={(template) => {
                  dispatch({
                    type: "SET_CONFIG",
                    payload: template.config,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
