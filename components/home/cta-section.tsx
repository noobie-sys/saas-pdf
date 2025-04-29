import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-5 lg:px-8 lg:pt-12 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2>Ready to saave hours of Reading Time</h2>
          <p>
            Transform lengthy documents into clear, actionable Insights with our
            AI-Powered Summaries
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <Button className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full">
            <Link href="/sign-in" className="flex gap-2 items-center">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
