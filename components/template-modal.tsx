import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Template } from "@/config/templates";

interface TemplateModalProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export function TemplateModal({ templates, onSelectTemplate }: TemplateModalProps) {
  const [open, setOpen] = useState(false);

  const handleTemplateSelect = (template: Template) => {
    onSelectTemplate(template);
    setOpen(false); // Close the modal after selection
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choose Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="aspect-[1200/630] relative">
                <Image
                  src={template.preview}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-medium">{template.name}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
