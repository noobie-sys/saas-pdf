import React from "react";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

const UploadHeader = () => {
  return (
    <div className=" flex justify-center items-center  flex-col gap-6 text-center">
      <Badge
        variant={"secondary"}
        className="relative px-6 py-2 text-base font-medium"
      >
        <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
        <p className="text-base">AI-Powered Content Creation</p>
      </Badge>
      <h1 className="font-bold py-6 text-center">
        Start Uploading
        <span className="relative inline-block mx-2">
          <span className="relative z-10 px-2">Your PDF's</span>
          <span
            className="absolute inset-0 bg-yellow-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </h1>
      <p>Upload the PDF and let our AI do the magic for you</p>
    </div>
  );
};

export default UploadHeader;
