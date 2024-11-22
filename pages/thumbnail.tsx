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
import { Button, buttonVariants } from "@/components/ui/button";
import { GradientPicker } from "@/components/gradient-picker";
import { Slider } from "@/components/ui/slider";
import { DownloadIcon } from "lucide-react";

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

const initialState = {
  options: {
    tracking: [
      ["tracking-tighter", "-0.05em"],
      ["tracking-tight", "-0.025em"],
      ["tracking-normal", "0em"],
      ["tracking-wide", "0.025em"],
      ["tracking-wider", "0.05em"],
      ["tracking-widest", "0.1em"],
    ],
  },
  background: {
    color: "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
    width: 1616,
    height: 848,
    aspectRatio: ratios[0].value,
  },
  frame: {
    backgroundColor: "url(/images/noise-light.png)",
    inset: "0px",
  },
  content: {
    title: {
      text: "Thumbnails Made Quicker Than Ever",
      fontSize: 100,
      color: "white",
      tracking: "-0.025em",
      lineHeight: "0.9",
      maxWidth: 90,
    },
    description: {
      text: "",
      fontSize: "",
      color: "",
    },
  },
};

const configReducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_BACKGROUND_COLOR":
      return {
        ...state,
        background: {
          ...state.background,
          color: action.payload,
        },
      };
    case "UPDATE_FRAME":
      return {
        ...state,
        frame: {
          ...state.frame,
          backgroundColor: action.payload.backgroundColor,
          inset: action.payload.inset,
        },
      };
    case "UPDATE_TITLE":
      return {
        ...state,
        content: {
          ...state.content,
          title: {
            ...state.content.title,
            text: action.payload.text,
            fontSize: action.payload.fontSize,
            color: action.payload.color,
            tracking: action.payload.tracking,
            lineHeight: action.payload.lineHeight,
            maxWidth: action.payload.maxWidth,
          },
        },
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        content: {
          ...state.content,
          description: {
            ...state.content.description,
            text: action.payload.text,
            fontSize: action.payload.fontSize,
            color: action.payload.color,
          },
        },
      };
    case "UPDATE_FRAME_SIZE":
      return {
        ...state,
        background: {
          ...state.background,
          aspectRatio: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default function ThumbnailPage() {
  const [config, dispatch] = useReducer(configReducer, initialState);
  const [filename, setFilename] = useState(uuid().split("-").join(""));

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
                  className="mx-auto transition-all"
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
        </div>
      </div>
    </>
  );
}
