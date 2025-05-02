import BgGradient from "@/components/common/bg-gradient";
import SummaryHeader from "@/components/summaries/summary-review/summary-header";
import SummaryInfo from "@/components/summaries/summary-review/summary-info";
import SummaryViewer from "@/components/summaries/summary-review/summary-viewer";
import { getSummaryById } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const UnderGarment = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const id = params?.slug;

  const result = await getSummaryById(id);
  if (!result) {
    notFound();
  }

  const { file_name, summary_text, title, created_at } = result || {};
  let word_count = summary_text?.split(" ").length;

  const reading_time = Math.ceil((word_count || 0) / 200);
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:py-12 sm:px-6 lg:px-8 py-8  lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={file_name}
              created_at={created_at}
              reading_time={reading_time}
            />
          </div>
          {title && (
            <SummaryInfo
              file_name={title}
              original_file_url={result?.original_file_url}
              summary_text={summary_text}
              created_at={created_at}
              title={file_name}
            />
          )}
          <div className="reative mt-4 sm:mt-8 lg:mt-16 ">
            <div className="relative mt-4 sm:mt-8 lg:mt-16">
              <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {word_count?.toLocaleString()} words
                </div>
                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary_text={summary_text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnderGarment;
