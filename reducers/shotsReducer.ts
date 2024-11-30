export const initialState = {
  gradient: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  padding: 32,
  radius: 16,
  background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  frameStyle: "macos" as "macos" | "windows" | "none",
  image: null as string | null,
  imageSize: "contain" as "contain" | "cover",
  aspectRatio: "16 / 9",
};

export type ShotsState = typeof initialState;
export type ShotsAction = 
  | { type: "SET_GRADIENT"; payload: string }
  | { type: "SET_PADDING"; payload: number }
  | { type: "SET_RADIUS"; payload: number }
  | { type: "SET_BACKGROUND"; payload: string }
  | { type: "SET_FRAME_STYLE"; payload: "macos" | "windows" | "none" }
  | { type: "SET_IMAGE"; payload: string | null }
  | { type: "SET_IMAGE_SIZE"; payload: "contain" | "cover" }
  | { type: "SET_ASPECT_RATIO"; payload: string };

export function shotsReducer(state: ShotsState, action: ShotsAction): ShotsState {
  switch (action.type) {
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
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_IMAGE_SIZE":
      return { ...state, imageSize: action.payload };
    case "SET_ASPECT_RATIO":
      return { ...state, aspectRatio: action.payload };
    default:
      return state;
  }
}
