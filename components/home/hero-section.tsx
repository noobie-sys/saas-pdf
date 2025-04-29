import React from "react";
import { Button } from "../ui/button";
import { Sparkle, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="">
      <div className="relative mx-auto flex flex-col z-0  items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl ">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </div>
      <h1 className="font-bold py-6 text-center">
        Transform PDFs into
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        summaries
      </h1>
      <h2 className="text-lg sm:text-xl-2xl text-center px-4 lg:px-0 lg:max-w-4xl">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <div className="flex justify-center items-center">
        <Button className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full">
          <Link href="/sign-in" className="flex gap-2 items-center">
            Try Sommarie
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
