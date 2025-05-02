import React from "react";
import { Card } from "../ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface SummaryHeader {
  title: string;
  description: string;
  date: string;
  status: string;
}

const SummaryCard = async ({ summary }: { summary: any }) => {
  //   console.log("Here is the summary list: ", summary);
  const sumamry_created_at = formatDistanceToNow(
    new Date(summary?.created_at),
    { addSuffix: true }
  );
  return (
    <Card>
      <div className="flex flex-col gap-2 relative  ">
        <div className="absolute -top-2 right-2">
          <DeleteButton summaryId={summary?.id} file_key={summary?.file_key} />
        </div>
        <div>
          <Link href={`/summaries/${summary?.id}`} className="block p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:gap-4">
              <SummaryHeader
                title={summary?.file_name}
                description={summary?.description}
                date={sumamry_created_at}
                status={summary?.status}
              />
              <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
                {summary?.summary_text}
              </p>
              <div className="flex justify-between items-center mt-3 sm:mt-4">
                <StatusBadge status={"completed"} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
};

const SummaryHeader = ({ title, date }: SummaryHeader) => {
  //   console.log(title, date);
  return (
    <div className="flex gap-3 items-start sm:gap-4">
      <FileTextIcon className="w-6 h-6 sm:h-8 sm:w-8 text-rose-500 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base lg:text-xl font-semibold text-gray-900 truncate w-4/5 ">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        `rounded-full px-3 py-1 text-xs font-semibold`,
        status === "completed"
          ? "bg-green-300 text-green-800"
          : "bg-rose-300 text-rose-800"
      )}
    >
      {status}
    </span>
  );
};

export default SummaryCard;
