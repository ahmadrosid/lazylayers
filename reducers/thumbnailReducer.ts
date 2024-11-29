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

export const initialState = {
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
      fontFamily: "inter",
    },
    description: {
      text: "",
      fontSize: "",
      color: "",
    },
  },
};

export type ThumbnailState = typeof initialState;

interface ThumbnailAction {
  type: string;
  payload: any;
}

type Action =
  | { type: "UPDATE_BACKGROUND_COLOR"; payload: string }
  | { type: "UPDATE_FRAME"; payload: { backgroundColor: string; inset: string } }
  | { type: "UPDATE_TITLE"; payload: { text: string; fontSize: number; color: string; tracking: string; lineHeight: string; maxWidth: number; fontFamily: string } }
  | { type: "SET_CONFIG"; payload: { frame: any; content: any } }
  | { type: "UPDATE_FRAME_SIZE"; payload: { value: string } };

export const thumbnailReducer = (state: ThumbnailState, action: Action) => {
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
            fontFamily: action.payload.fontFamily,
          },
        },
      };
    case "SET_CONFIG":
      return {
        ...state,
        frame: {
          ...state.frame,
          ...action.payload.frame,
        },
        content: {
          ...state.content,
          ...action.payload.content,
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
