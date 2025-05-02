import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, ChevronLeft, Clock, Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";

const SummaryHeader = ({
  title,
  created_at,
  reading_time,
}: {
  title: string;
  created_at: string;
  reading_time?: number;
}) => {
  return (
    <div className="flex justify-between gap-4 mb-4 ">
      <div className="space-y-4">
        <div className="space-x-1">
          <Badge variant={"secondary"}>
            <Sparkle className="w-2 h-2" />
            <span className="text-xs">AI Summary</span>
          </Badge>
          <Badge variant={"outline"}>
            <Calendar className="w-2 h-2 text-rose-400" />
            <span className="text-xs">
              {new Date(created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </Badge>
          <Badge variant={"outline"}>
            <Clock className="w-2 h-2 text-rose-400" />
            <span className="text-xs">{reading_time} min read</span>
          </Badge>
        </div>
        <h1 className="text-2xl lg:text-4xl tracking-tight font-bold">
          <span className="bg-linear-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <div className="self-start">
        <Link href={"/dashboard"}>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-rose-600 bg-rose-200 hover:bg-rose-300 rounded-2xl text-[12px] group"
          >
            <ChevronLeft className="w-2 h-2 group-hover:-translate-x-0.5 transition-transform" />
            <span>
              Back <span className="hidden sm:inline-block">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryHeader;
