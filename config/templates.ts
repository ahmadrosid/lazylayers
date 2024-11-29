export type Template = {
  id: string;
  name: string;
  preview: string;
  config: {
    frame: {
      backgroundColor: string;
      inset: string;
    };
    content: {
      title: {
        text: string;
        fontSize: number;
        fontFamily: string;
        color: string;
        tracking: string;
        lineHeight: string;
        maxWidth: number;
      };
      description?: {
        text: string;
        fontSize: number;
        fontFamily: string;
        color: string;
        tracking: string;
        lineHeight: string;
        maxWidth: number;
      };
    };
  };
};

export const templates: Template[] = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    preview: "/templates/modern-dark.png",
    config: {
      frame: {
        backgroundColor: "#000000",
        inset: "32px",
      },
      content: {
        title: {
          text: "Modern Dark Template",
          fontSize: 64,
          fontFamily: "plusJakarta",
          color: "#ffffff",
          tracking: "-0.02em",
          lineHeight: "1.1",
          maxWidth: 80,
        },
      },
    },
  },
  {
    id: "gradient-pop",
    name: "Gradient Pop",
    preview: "/templates/gradient-pop.png",
    config: {
      frame: {
        backgroundColor: "#0f172a",
        inset: "24px",
      },
      content: {
        title: {
          text: "Gradient Pop Template",
          fontSize: 72,
          fontFamily: "poppins",
          color: "#ffffff",
          tracking: "-0.01em",
          lineHeight: "1.2",
          maxWidth: 85,
        },
      },
    },
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    preview: "/templates/minimal-light.png",
    config: {
      frame: {
        backgroundColor: "#ffffff",
        inset: "40px",
      },
      content: {
        title: {
          text: "Minimal Light Template",
          fontSize: 56,
          fontFamily: "montserrat",
          color: "#1a1a1a",
          tracking: "0",
          lineHeight: "1.3",
          maxWidth: 75,
        },
      },
    },
  },
];
