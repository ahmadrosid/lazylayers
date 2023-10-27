import Head from "next/head";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useReducer, useRef, useState, useId } from "react";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { gradients, textColors } from "@/lib/colors";
import uuid from "@/lib/uuid";
import { DownloadIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

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
    color: gradients[0],
    width: 1616,
    height: 848,
  },
  frame: {
    backgroundColor: "#334155",
  },
  content: {
    title: {
      text: "Deploying laravel project to fly.io",
      fontSize: 100,
      color: "white",
      tracking: "-0.05em",
      lineHeight: "1.5",
      maxWidth: "100%",
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
  const [openPopOver, setOpenPopover] = useState(false);
  const [filename, setFilename] = useState(uuid().split("-").join(""));
  const [openPopOverTextColor, setOpenPopoverTextColor] = useState(false);
  const [openPopOverFrameColor, setOpenPopoverFrameColor] = useState(false);

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
                Download
              </Button>
            </div>
          </div>
          <div className="overflow-hidden flex justify-center items-start p-8">
            <div
              ref={content}
              className="w-full h-full p-6 grid place-content-center text-center relative rounded-[4px]"
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
                  className="mx-auto"
                  style={{
                    fontSize: config.content.title.fontSize,
                    fontWeight: "bold",
                    color: config.content.title.color,
                    letterSpacing: config.content.title.tracking,
                    lineHeight: config.content.title.lineHeight,
                    maxWidth: config.content.title.maxWidth,
                  }}
                >
                  {config.content.title.text}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[20rem] h-[92vh] overflow-auto border-l bg-white">
          <div className="px-4 py-1.5 flex items-center">
            <p
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
                className: "font-bold hover:bg-transparent",
              })}
            >
              Text attributes
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
            <div className="h-8 flex justify-between items-center w-full">
              <div className="text-sm flex-1">Line height</div>
              <input
                className="p-2 bg-white rounded border text-sm"
                placeholder="1.6"
                type="number"
                name="content_text_line_height"
                value={config.content.title.lineHeight}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      lineHeight: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="h-8 flex justify-between items-center w-full">
              <div className="text-sm flex-1">Max width</div>
              <input
                className="p-2 bg-white rounded border text-sm"
                placeholder="100%"
                type="text"
                name="content_text_max_width"
                value={config.content.title.maxWidth}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      maxWidth: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="px-4 py-3 border-b">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm flex-1">Font color</div>
              <Popover
                open={openPopOverTextColor}
                onOpenChange={setOpenPopoverTextColor}
              >
                <PopoverTrigger>
                  <div
                    className="w-8 h-8 rounded-md ring ring-blue-700/30"
                    style={{ background: config.content.title.color }}
                  ></div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2">
                    <div className="grid grid-cols-5 rounded overflow-hidden border border-blue-700">
                      {textColors.map((item, idx) => (
                        <button
                          key={idx}
                          className="w-full h-8 cursor-pointer hover:opacity-50"
                          style={{ background: item }}
                          onClick={() => {
                            dispatch({
                              type: "UPDATE_TITLE",
                              payload: {
                                ...config.content.title,
                                color: item,
                              },
                            });
                            setOpenPopoverTextColor(false);
                          }}
                        ></button>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <input
                        type="color"
                        className="w-12 h-10 rounded"
                        value={config.content.title.color}
                        onChange={(e) => {
                          dispatch({
                            type: "UPDATE_TITLE",
                            payload: {
                              ...config.content.title,
                              color: e.currentTarget.value,
                            },
                          });
                        }}
                      />
                      <input
                        type="text"
                        className="w-full h-10 px-2 text-sm rounded border"
                        value={config.content.title.color}
                        onChange={(e) => {
                          dispatch({
                            type: "UPDATE_TITLE",
                            payload: {
                              ...config.content.title,
                              color: e.currentTarget.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="py-3 px-4 border-b">
            <div className="h-8 flex justify-between items-center w-full">
              <div className="text-sm">Letter spacing</div>
              <select
                onChange={(e) => {
                  dispatch({
                    type: "UPDATE_TITLE",
                    payload: {
                      ...config.content.title,
                      tracking: e.currentTarget.value,
                    },
                  });
                }}
                id="tracking"
                name="tracking"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                {config.options.tracking.map(([key, val]) => (
                  <option key={key} value={val}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="p-4 font-bold border-b">Background style</p>
          <div className="py-4 px-4 border-b">
            <Popover open={openPopOver} onOpenChange={setOpenPopover}>
              <PopoverTrigger className="flex justify-between items-center w-full">
                <p className="text-sm">Background color</p>
                <div
                  className="w-8 h-8 rounded-md ring ring-blue-700/30"
                  style={{ background: config.background.color }}
                ></div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid grid-cols-5 rounded-lg overflow-hidden">
                  {gradients.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full h-8 cursor-pointer hover:opacity-50"
                      style={{ background: item }}
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_BACKGROUND_COLOR",
                          payload: gradients[idx],
                        });
                        setOpenPopover(false);
                      }}
                    ></button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="py-4 px-4 border-b">
            <Popover
              open={openPopOverFrameColor}
              onOpenChange={setOpenPopoverFrameColor}
            >
              <PopoverTrigger className="flex justify-between items-center w-full">
                <p className="text-sm">Frame background color</p>
                <div
                  className="w-8 h-8 rounded-md ring ring-blue-700/30"
                  style={{ background: config.frame.backgroundColor }}
                ></div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid grid-cols-5 rounded-lg overflow-hidden">
                  {textColors.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full h-8 cursor-pointer hover:opacity-50"
                      style={{ background: item }}
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_FRAME",
                          payload: {
                            backgroundColor: item,
                          },
                        });
                        setOpenPopoverFrameColor(false);
                      }}
                    ></button>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    type="color"
                    className="w-12 h-10 rounded"
                    value={config.frame.backgroundColor}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_FRAME",
                        payload: {
                          backgroundColor: e.currentTarget.value,
                        },
                      });
                    }}
                  />
                  <input
                    type="text"
                    className="w-full h-10 px-2 text-sm rounded border"
                    value={config.frame.backgroundColor}
                    onChange={(e) => {
                      dispatch({
                        type: "UPDATE_FRAME",
                        payload: {
                          backgroundColor: e.currentTarget.value,
                        },
                      });
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
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
          <div className="border-b p-4 pb-2 grid">
            <button
              type="button"
              onClick={handleDownload}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
