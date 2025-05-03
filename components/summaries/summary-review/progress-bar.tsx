import { cn } from "@/lib/utils";
import React from "react";

const ProgressBar = ({
  section,
  currentSection,
}: {
  section: Array<{ title: string; point: string[] }>;
  currentSection: number;
}) => {
  return (
    <div className="absoulte top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 bporder-b border-rose-500/10 ">
      <div className="px-4 flex gap-1.5">
        {section.map((_, index) => (
          <div
            key={index}
            className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden"
          >
            <div
              className={cn(
                "h-full rounded-full bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-500 ease-in-out",
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-50"
                  : "w-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
