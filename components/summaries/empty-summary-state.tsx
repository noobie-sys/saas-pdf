import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptySummaryState = () => {
  return (
    <div className="mt-8 flex flex-col gap-4 justify-center items-center ">
      <FileText className="w-16 h-16 text-gray-400" />
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-gray-600 text-5xl font-bold">
          No summaries Yet!
        </div>
        <div className="text-gray-600">Upload a PDF to get started</div>
      </div>

      <Button
        variant={"outline"}
        className="text-rose-500 font-bold py-2 px-4 rounded"
      >
        <Link href={"/upload"}>Create Your First Summary</Link>
      </Button>
    </div>
  );
};

export default EmptySummaryState;
