"use client";
import React from "react";
import { SummaryInfoProps } from "./summary-info";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const DownloadSummaryButton = ({
  file_name,
  original_file_url,
  created_at,
  summary_text,
  title,
}: SummaryInfoProps) => {
  const handleDownloadSummary = () => {
    const summaryContent = `# ${title}
        Generated Summary
        Generated on: ${new Date(String(created_at)).toLocaleDateString()}

        ${summary_text}

        Original File: ${file_name}
        Generated by Sommaire
    `;
    const blob = new Blob([summaryContent || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.txt`;
    link.click();

    // document.body.removeChild(link); // Clean up the link element after use
    // Revoke the object URL to free up memory and avoid memory leaks in some browsers
    // Note: This is not required in modern browsers, but it's good practi
    URL.revokeObjectURL(url);
  };
  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      onClick={handleDownloadSummary}
      className="bg-rose-200 text-rose-600 hover:bg-rose-300 hover:text-rose-700"
    >
      <DownloadIcon className="h-4 w-4 mr-1" />
      Download Summary
    </Button>
  );
};

export default DownloadSummaryButton;
