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
    color:
      "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&fit=crop&w=2532&q=90)",
    width: 1616,
    height: 848,
  },
  frame: {
    backgroundColor: "#0052525b",
  },
  content: {
    title: {
      text: "Thumbnails Made Quicker Than Ever",
      fontSize: 100,
      color: "white",
      tracking: "-0.05em",
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
      </Head>
      <div className="flex">
        <div className="flex-1 max-h-screen">
          <div className="p-1.5 flex border-b items-center">
            <div className="flex-1 px-6">
              <div>Frame size</div>
            </div>
            <div>
              <Button size="sm" variant="ghost" className="font-bold">
                Export as png
              </Button>
            </div>
          </div>
          <div className="overflow-hidden flex justify-center items-start p-8">
            <div
              ref={content}
              className="w-full h-full p-6 grid place-content-center text-center relative rounded-[4px] transition-all"
              style={{
                background: config.background.color,
                height: "auto",
                aspectRatio: "1.90476 / 1",
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
                className="absolute inset-8 rounded-lg z-20 shadow-lg"
                style={{
                  background: config.frame.backgroundColor,
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
        <div className="w-[20rem] h-[92vh] overflow-auto border-l bg-white">
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
            <div className="h-8 flex justify-between items-center w-full">
              <div className="text-sm flex-1">Font size</div>
              <input
                className="p-2 bg-white rounded border text-sm"
                placeholder="Font size"
                type="number"
                name="content_text_font_size"
                value={config.content.title.fontSize}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      fontSize: Number(e.currentTarget.value),
                    },
                  })
                }
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
                <SelectValue placeholder="Line height" />
              </SelectTrigger>
              <SelectContent>
                {config.options.tracking.map(([key, val]) => (
                  <SelectItem key={key} value={val}>
                    {key}
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
