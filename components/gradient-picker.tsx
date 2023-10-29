import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gradients, textColors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { useMemo, useState } from "react";

export function PickerExample() {
  const [background, setBackground] = useState("");

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  label,
  background,
  setBackground,
  className,
}: {
  background: string;
  label?: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = textColors;

  // const images = [
  //   "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&fit=crop&w=2532&q=90)",
  //   "url(https://plus.unsplash.com/premium_photo-1664443577542-06294d3354ff?auto=format&fit=crop&q=80&w=1616&ixlib=rb-4.0.3&q=90)",
  //   "url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&q=90)",
  //   "url(https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&q=90)",
  //   "url(https://images.unsplash.com/photo-1636990649778-fd699d27c875?ixlib=rb-4.0.3&fit=crop&w=1616&q=90)",
  //   "url(https://images.unsplash.com/photo-1619963258837-b83f3406cfcd?ixlib=rb-4.0.3&fit=crop&w=1616&q=90)",
  //   "url(https://images.unsplash.com/photo-1542736488-1967b42fcf54?auto=format&fit=crop&q=80&w=1616&ixlib=rb-4.0.3&q=90)",
  //   "url(https://images.unsplash.com/photo-1542188422-1d5db412ecc3?auto=format&fit=crop&q=80&w=1616&ixlib=rb-4.0.3&q=90)",
  // ];

  const images = [
    "url(/images/background/vibrant-vista-001.jpg)",
    "url(/images/background/vibrant-vista-002.jpg)",
    "url(/images/background/vibrant-vista-003.jpg)",
    "url(/images/background/vibrant-vista-004.jpg)",
    "url(/images/background/vibrant-vista-005.jpg)",
    "url(/images/background/vibrant-vista-006.jpg)",
    "url(/images/background/deep-dusk-001.jpg)",
    "url(/images/background/deep-dusk-002.jpg)",
    "url(/images/background/deep-dusk-003.jpg)",
    "url(/images/background/deep-dusk-004.jpg)",
    "url(/images/background/deep-dusk-005.jpg)",
    "url(/images/background/deep-dusk-006.jpg)",
    "url(/images/background/green-glory-001.jpg)",
    "url(/images/background/green-glory-002.jpg)",
    "url(/images/background/green-glory-003.jpg)",
    "url(/images/background/green-glory-004.jpg)",
    "url(/images/background/green-glory-005.jpg)",
    "url(/images/background/green-glory-006.jpg)",
    "url(/images/background/beautiful-blue-001.jpg)",
    "url(/images/background/beautiful-blue-002.jpg)",
    "url(/images/background/beautiful-blue-003.jpg)",
    "url(/images/background/beautiful-blue-004.jpg)",
    "url(/images/background/beautiful-blue-005.jpg)",
    "url(/images/background/beautiful-blue-006.jpg)",
    "url(/images/background/pretty-in-pink-001.jpg)",
    "url(/images/background/pretty-in-pink-002.jpg)",
    "url(/images/background/pretty-in-pink-003.jpg)",
    "url(/images/background/pretty-in-pink-004.jpg)",
    "url(/images/background/pretty-in-pink-005.jpg)",
    "url(/images/background/pretty-in-pink-006.jpg)",
  ];

  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {label ? label : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[332px]">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2 max-h-[10rem] overflow-y-auto">
              {solids.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
            <GradientButton background={background}>
              ⬆️ Custom color
            </GradientButton>
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2 max-h-[10rem] overflow-y-auto">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
            <GradientButton background={background}>
              ⬆️ Custom color
            </GradientButton>
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="grid grid-cols-2 gap-1 mb-2 max-h-[10rem] pr-1 overflow-y-auto">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>

            <div
              className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all cursor-pointer"
              style={{ background }}
            >
              {/* <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
                ⬆️ Upload image
              </div> */}
              <Input
                type="file"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
  onClick,
}: {
  background: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all cursor-pointer"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  );
};
