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
  {
    id: "tech-vibrant",
    name: "Tech Vibrant",
    preview: "/templates/tech-vibrant.png",
    config: {
      frame: {
        backgroundColor: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
        inset: "28px",
      },
      content: {
        title: {
          text: "Tech Vibrant Template",
          fontSize: 68,
          fontFamily: "inter",
          color: "#ffffff",
          tracking: "-0.03em",
          lineHeight: "1.15",
          maxWidth: 82,
        },
        description: {
          text: "Perfect for tech and startup content",
          fontSize: 24,
          fontFamily: "inter",
          color: "rgba(255, 255, 255, 0.9)",
          tracking: "0",
          lineHeight: "1.5",
          maxWidth: 60,
        },
      },
    },
  },
  {
    id: "nature-serenity",
    name: "Nature Serenity",
    preview: "/templates/nature-serenity.png",
    config: {
      frame: {
        backgroundColor: "#e0f2f1",
        inset: "36px",
      },
      content: {
        title: {
          text: "Nature Serenity Template",
          fontSize: 60,
          fontFamily: "lato",
          color: "#2e7d32",
          tracking: "-0.01em",
          lineHeight: "1.2",
          maxWidth: 78,
        },
        description: {
          text: "Embrace the tranquility of nature",
          fontSize: 22,
          fontFamily: "lato",
          color: "#4caf50",
          tracking: "0.01em",
          lineHeight: "1.4",
          maxWidth: 65,
        },
      },
    },
  },
  {
    id: "cosmic-adventure",
    name: "Cosmic Adventure",
    preview: "/templates/cosmic-adventure.png",
    config: {
      frame: {
        backgroundColor: "linear-gradient(220deg, #1a237e 0%, #4a148c 50%, #880e4f 100%)",
        inset: "30px",
      },
      content: {
        title: {
          text: "Cosmic Adventure Template",
          fontSize: 70,
          fontFamily: "exo",
          color: "#ffffff",
          tracking: "-0.02em",
          lineHeight: "1.1",
          maxWidth: 85,
        },
        description: {
          text: "Explore the wonders of the universe",
          fontSize: 26,
          fontFamily: "exo",
          color: "rgba(255, 255, 255, 0.85)",
          tracking: "0.02em",
          lineHeight: "1.3",
          maxWidth: 70,
        },
      },
    },
  },
];
